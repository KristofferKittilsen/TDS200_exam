import { useQuery } from '@apollo/client';
import { IonAvatar, IonButton, IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonFabList, IonGrid, IonHeader, IonIcon, IonLabel, IonPage, IonPopover, IonRow, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import IPostList from "../models/IPostList"
import PostInfoCard from "../components/PostInfoCard";
import { walkOutline, addCircleOutline, personOutline, addOutline, homeOutline } from "ionicons/icons";
import styled from 'styled-components';
import NavigationFabs from '../components/NavigationFabs';

const GET_POSTS = gql`
query {
  posts {
    id
    trip_type
    how_long
    rating
    trip_area
    trip_difficulty
    user_id
    image_filename
    trip_description
    user {
      display_name
    }
  }
}

`;

const Home = () => {
  
  const {loading, data} = useQuery<IPostList>(GET_POSTS);
  let history = useHistory();
  const [show, setShow] = useState<any>();

  if (loading) {
    return <IonLabel>Loading...</IonLabel>
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ut på tur</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {
          data?.posts.map(post => (
            <Link style={{textDecoration: "none"}} key={post.id} to={{
              pathname: `/tripDetails/${post.id}`,
              state: {
                post
              }
            }}>
              <PostInfoCard {...post}/>
            </Link>
          ))
        }
        <NavigationFabs />
      </IonContent>
    </IonPage>
  );
};

export default Home;
