import { useSubscription } from "@apollo/client";
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonSpinner, IonTitle, IonToolbar } from "@ionic/react";
import gql from "graphql-tag";
import React from "react";
import { Link } from "react-router-dom";
import FollowingCard from "../components/FollowingCard";
import IFollowingList from "../models/IFollowingList";
import { auth } from "../utils/nhost";

const GET_FOLLOWING_TRIPS = gql`
subscription ($userId: uuid = "") {
    followers(where: {user_following_id: {_eq: $userId}}) {
      user_followers {
        display_name
        trips {
          how_long
          id
          image_filename
          latitude
          longitude
          rating
          trip_area
          trip_description
          trip_difficulty
          trip_type
        }
      }
    }
  }
`;

const FollowingPage = () => {

    const {loading, data} = useSubscription<IFollowingList>(
        GET_FOLLOWING_TRIPS,
        {variables: {userId: auth.getClaim('x-hasura-user-id')}}
    )

    if (loading) {
        return <IonSpinner name="crescent" />
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Følger</IonTitle>
                    <IonButtons>
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {
                    data?.followers.map((follow, i) => (
                        <Link style={{textDecoration: "none"}} key={`fc-${i}`} to={{
                            pathname: "/home"
                        }}>
                            <FollowingCard {...follow} />
                        </Link>
                    ))
                }

            </IonContent>
        </IonPage>

        
    )
}

export default FollowingPage;