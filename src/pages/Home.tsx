import { useSubscription } from '@apollo/client';
import { RefresherEventDetail } from '@ionic/core';
import { IonAvatar, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonRefresher, IonRefresherContent, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import gql from 'graphql-tag';
import { exitOutline } from "ionicons/icons";
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import NavigationFabs from '../components/NavigationFabs';
import PostInfoCard from "../components/PostInfoCard";
import IPostList from "../models/ITripList";
import { auth } from '../utils/nhost';
import configData from "../config.json";

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
      }
    }
  }
}

`;

const Home = () => {
  
  const {loading, data} = useSubscription<IPostList>(GET_TRIPS);
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

  const doRefresh = (e: CustomEvent<RefresherEventDetail>) => {
    setTimeout(() => {
      e.detail.complete();
    }, 2000);
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
          {
            data?.trips.map((user, i) => (
              i === 0 ?
              <Link key={`link-${i}`} slot="end" to={{
                pathname: `/profile/${auth.getClaim("x-hasura-user-id")}`,
                state: {
                  user: user.user
                }
              }}>
                <IonAvatar>
                  <img src={`${configData.IMAGE_ENDPOINT}${user.image_filename}`}/>
                </IonAvatar>
              </Link> :
              <div key={`nothing-${i}`}></div>
              ))
          }
          <IonTitle>Ut på tur</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent pullingText="Pull to refresh"></IonRefresherContent>
        </IonRefresher>
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
