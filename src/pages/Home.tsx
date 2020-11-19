import { useSubscription } from '@apollo/client';
import { IonButtons, IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import gql from 'graphql-tag';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NavigationFabs from '../components/NavigationFabs';
import TripsInfoCard from '../components/TripsInfoCard';
import ITripList from "../models/ITripList";
import { auth } from '../utils/nhost';

const GET_TRIPS = gql`
subscription {
  trips {
    id
    trip_type
    how_long
    rating
    trip_area
    trip_difficulty
    image_filename
    trip_description
    latitude
    longitude  
    endlat
    endlng
    user {
      id
      display_name
      avatar_url
      followers {
        id
        user_following {
            display_name
        }
        user_followers {
          display_name
        }
      }
    }
  }
}
`;

const Home = () => {

  //Used lectures to make GET_TRIPS and useSubscription with ITrip (IPost in lectures).
  //Used lectures to learn how to fetch the userId via auth.getClaim
  //Used lectures to learn how to user maps to render all trips
  
  const {loading, data} = useSubscription<ITripList>(GET_TRIPS);

  if (loading) {
    return <IonSpinnerStyled name="crescent" />
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <Link style={{textDecoration: "none"}} to="/following">Følger</Link>
          </IonButtons>
          <IonButtons slot="end">
            <Link style={{textDecoration: "none"}} to={{
              pathname: `/profile/${auth.getClaim("x-hasura-user-id")}`,
              state: {
                userProfileId: auth.getClaim("x-hasura-user-id")
              }
            }}>
            <IonLabel>Profil</IonLabel>
            </Link>
          </IonButtons>
          
          
          <IonTitle>Ut på tur</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      
        {
          data?.trips.map(trip => (
            <Link style={{textDecoration: "none"}} key={trip.id} to={{
              pathname: `/tripdetails/${trip.id}`,
              state: {
                trip
              }
            }}>
              <TripsInfoCard {...trip}/>
            </Link>
          ))
        }
        <NavigationFabs />
      </IonContent>
    </IonPage>
  );
};

const IonIconTurned = styled(IonIcon)`
  transform: rotate(180deg);
`;

const IonSpinnerStyled = styled(IonSpinner)`
  align-self: center;
`;

export default Home;
