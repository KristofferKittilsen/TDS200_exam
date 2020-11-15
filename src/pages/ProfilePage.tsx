import { useSubscription } from "@apollo/client";
import { IonAvatar, IonBackButton, IonButton, IonButtons, IonCard, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonPage, IonRow, IonSpinner, IonTitle, IonToolbar } from "@ionic/react";
import gql from "graphql-tag";
import React from "react";
import styled from 'styled-components';
import ProfileCard from "../components/ProfileCard";
import ITripList from "../models/ITripList";
import configData from "../config.json";

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

const ProfilePage = (props: any) => {

    const user: any = props.location?.state?.user;

    const {loading, data} = useSubscription<ITripList>(
        GET_TRIPS_BY_ID, 
        {variables: {userId: user.id}}
    );

    if (loading) {
        return <IonSpinner name="crescent" />
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
                                        </IonCol>
                                    </IonItem>
                                </IonRow>
                                <IonRow>
                                    <IonCol size="2">
                                        <ChatButton>Chat</ChatButton>
                                    </IonCol>
                                    <IonCol>
                                        <ChatButton>Follow</ChatButton>
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