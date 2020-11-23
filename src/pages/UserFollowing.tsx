import { useMutation } from "@apollo/client";
import { IonBackButton, IonButtons, IonCard, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToast, IonToolbar } from "@ionic/react";
import gql from "graphql-tag";
import { closeOutline } from "ionicons/icons";
import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from 'styled-components';
import { auth } from "../utils/nhost";

const UNFOLLOW_USER = gql`
mutation ($userId: uuid = "", $followingId: uuid = "") {
    delete_followers(where: {_and: {user_following_id: {_eq: $userId}}, user_followers_id: {_eq: $followingId}}) {
      affected_rows
    }
  }  
`

const UserFollowing = (props: any) => {

    const following = props.location?.state?.following;

    const [unfollowMutation] = useMutation(UNFOLLOW_USER);
    const [showToast, setShowToast] = useState<boolean>(false);

    const [fId, setFId] = useState<any>(following.map((f: any) => {return f.user_followers.id}))

    const unfollowUser = async () => {
        try {
            await unfollowMutation ({
                variables: {
                    userId: auth.getClaim('x-hasura-user-id'),
                    followingId: fId[0]
                }
            })
            setShowToast(true);
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons>
                        <IonBackButton defaultHref="/home" />
                        <IonTitle>Følger</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            <IonToast 
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message= {`You stoped following`}
                    duration={1000}
                />
            {
                following.map((f: any) => (
                    <IonCard>
                        <IonGrid>
                            <IonRow>
                                <IonCol size="11">
                                    <IonCardTitleStyled>{f.user_followers.display_name}</IonCardTitleStyled>
                                </IonCol>
                                <IonCol>
                                    <UnfollowIcon onClick={unfollowUser} icon={closeOutline} />
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonCard>
                ))
            }
            </IonContent>
        </IonPage>
            
    )
}

const IonCardTitleStyled = styled(IonCardTitle)`
    font-size: 1em;
`;

const UnfollowIcon = styled(IonIcon)`
    font-size: 1em;
`;

export default UserFollowing;