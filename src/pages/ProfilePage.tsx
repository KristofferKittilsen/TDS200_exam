import { useMutation, useSubscription } from "@apollo/client";
import { Toast } from "@capacitor/core";
import { IonBackButton, IonButton, IonButtons, IonCard, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonSpinner, IonTitle, IonToast, IonToolbar } from "@ionic/react";
import gql from "graphql-tag";
import React, { useState } from "react";
import styled from 'styled-components';
import ProfileCard from "../components/ProfileCard";
import ProfileDetailCard from "../components/ProfileDetailCard";
import IUserList from "../models/IUserList";
import { auth } from "../utils/nhost";


const GET_USER_BY_ID = gql`
subscription ($userId: uuid = "") {
    users(where: {id: {_eq: $userId}}) {
      id
      display_name
      avatar_url
      posts {
          id
          image_filename
          trip_area
          how_long
          trip_type
          trip_difficulty
          trip_description
      }
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
`;

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



const ProfilePage = (props?: any) => {

    const userProfileId: any = props?.location?.state?.userProfileId;

    const {loading, data} = useSubscription<IUserList>(
        GET_USER_BY_ID, 
        {variables: {userId: userProfileId}}
    );

    const [alreadyFollowing, setAlreadyFollowing] = useState<boolean>(true);
    const [follower, setFollower] = useState<any>();

    const [showToast, setShowToast] = useState<boolean>(false)

    const [insertFollowerMutation] = useMutation(INSERT_FOLLOWER);

    if (loading) {
        return <IonSpinner name="crescent" />
    }

    const insertFollower = async () => {
        checkIfFollow();
        if (alreadyFollowing === false) {
            try {
                await insertFollowerMutation ({
                    variables: {
                        follower: {
                            user_followers_id: userProfileId,
                            user_following_id: auth.getClaim('x-hasura-user-id')
                        }
                    }
                })
            } catch (e) {
                console.error(e)
            }
        }
        
    }

    const checkIfFollow = () => {

        data?.users.map(user => {
            if (userProfileId === user.id) {
                console.log(`${userProfileId} = ${user.id}`)
                setAlreadyFollowing(true);
                setShowToast(true);
            } else {
                console.log("Not following")
                setAlreadyFollowing(false);
            }
        })
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
                <IonToast 
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message= {`You are already following`}
                    duration={1000}
                />
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonCardWithoutMarginTop>
                                {
                                    data?.users.map((user, i) => (
                                        <ProfileDetailCard key={`u-${i}`} {...user} />
                                    ))
                                }
                                
                                <IonRow>
                                    <IonCol>
                                        {
                                            data?.users.map((user, i) => (
                                                user?.id !== auth.getClaim("x-hasura-user-id") ?
                                                <ChatButton key={`cb-${i}`} onClick={(insertFollower)}>Follow</ChatButton> :
                                                <ChatButton key={`nothing-${i}`} disabled>Follow</ChatButton>
                                            ))
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
                                        data?.users.map((user, i) => (
                                            <ProfileCard key={`pc-${i}`} {...user} />   
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