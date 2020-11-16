import { useQuery, useSubscription } from '@apollo/client';
import { IonAvatar, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import gql from 'graphql-tag';
import { exitOutline } from "ionicons/icons";
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import NavigationFabs from '../components/NavigationFabs';
import PostInfoCard from "../components/PostInfoCard";
import configData from "../config.json";
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
  
  const {loading, data} = useSubscription<ITripList>(GET_TRIPS);
  let history = useHistory();

  if (loading) {
    return <IonSpinnerStyled name="crescent" />
  }

  const logout = async () => {
    try {
      await auth.logout();
      history.replace("/");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={logout}>
              <IonIconTurned icon={exitOutline}/>
            </IonButton>
          </IonButtons>
          
          <Link slot="end" style={{textDecoration: "none"}} to={{
            pathname: `/profile/${auth.getClaim("x-hasura-user-id")}`,
            state: {
              userProfileId: auth.getClaim("x-hasura-user-id")
            }
          }}>
            <IonLabel>Profile</IonLabel>
          </Link>
          
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
              <PostInfoCard {...trip}/>
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
