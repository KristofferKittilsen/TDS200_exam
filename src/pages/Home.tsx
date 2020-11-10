import { useQuery } from '@apollo/client';
import { IonContent, IonHeader, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import gql from 'graphql-tag';
import React from 'react';
import { Link } from 'react-router-dom';
import IPostList from "../models/IPostList"
import PostInfoCard from "../components/PostInfoCard";

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
    user {
      display_name
    }
  }
}

`;

const Home = () => {
  
  const {loading, data} = useQuery<IPostList>(GET_POSTS);

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
              state: {
                post
              }
            }}>
              <PostInfoCard {...post}/>
            </Link>
          ))
        }
      </IonContent>
    </IonPage>
  );
};

export default Home;
