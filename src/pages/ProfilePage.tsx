import { useMutation, useSubscription } from "@apollo/client";
import { IonAvatar, IonBackButton, IonButton, IonButtons, IonCard, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonPage, IonRow, IonSpinner, IonTitle, IonToolbar } from "@ionic/react";
import gql from "graphql-tag";
import React from "react";
import styled from 'styled-components';
import ProfileCard from "../components/ProfileCard";
import configData from "../config.json";
import ITripList from "../models/ITripList";
import { auth } from "../utils/nhost";


const GET_TRIPS_BY_ID = gql`
subscription ($userId: uuid = "") {
    trips(where: {user: {id: {_eq: $userId}}}) {
      id
      image_filename
      trip_area
      user {
        display_name
        avatar_url
      }
    }
  }
`

const INSERT_FOLLOWER = gql`
mutation InsertFollower($follower: followers_insert_input!){
    insert_followers_one(object: $follower) {
      user_following_id
      user_followers_id
    }
  }
`;

const ProfilePage = (props: any) => {

    const user: any = props.location?.state?.user;

    const {loading, data} = useSubscription<ITripList>(
        GET_TRIPS_BY_ID, 
        {variables: {userId: user.id}}
    );

    const [insertFollowerMutation] = useMutation(INSERT_FOLLOWER);

    if (loading) {
        return <IonSpinner name="crescent" />
    }

    const insertFollower = async () => {
        try {
            await insertFollowerMutation ({
                variables: {
                    follower: {
                        user_followers_id: user.id,
                        user_following_id: auth.getClaim('x-hasura-user-id')
                    }
                }
            })
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Profile</IonTitle>
                    <IonButtons>
                        <IonBackButton defaultHref="/home"/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonCardWithoutMarginTop>
                                <IonRow>
                                    <IonItem className="ion-no-padding">
                                        <IonCol size="3">
                                            <IonAvatar>
                                                <img src={`${configData.IMAGE_ENDPOINT}${user.avatar_url}`}/>
                                            </IonAvatar>
                                        </IonCol>
                                        <IonCol>
                                            <IonCardTitleStyled>Email: {user.display_name}</IonCardTitleStyled>
                                            <IonLabel>Followers: {user.followers.length}</IonLabel>
                                        </IonCol>
                                    </IonItem>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        {
                                            user.id !== auth.getClaim("x-hasura-user-id") ?
                                            <ChatButton onClick={insertFollower}>Follow</ChatButton> :
                                            <ChatButton disabled>Follow</ChatButton>
                                        }
                                    </IonCol>
                                </IonRow>
                            </IonCardWithoutMarginTop>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonCardWithoutMarginTop>
                            <IonCardTitleSentered>Trip Gallery</IonCardTitleSentered>         
                                <IonRow>
                                    {
                                        data?.trips.map(trip => ( 
                                            <IonCol size="6" key={`ti-${trip.id}`}>
                                                <ProfileCard {...trip} />
                                            </IonCol>                
                                        ))
                                    }
                                </IonRow>                  
                            </IonCardWithoutMarginTop>
                        </IonCol>
                    </IonRow>
                </IonGrid>    
            </IonContent>
        </IonPage>
    )
}

const IonCardWithoutMarginTop = styled(IonCard)`
    margin-top: 0;
    margin-bottom: 0;
`;

const IonCardTitleSentered = styled(IonCardTitle)`
    align-self: center;
    padding-top: 5%;
    margin-left: 5%;
    margin-bottom: 0;
`;

const IonCardTitleStyled = styled(IonCardTitle)`
    font-size: 0.8em;
`;

const ChatButton = styled(IonButton)`
    font-size: 0.7em;
`;


export default ProfilePage; 