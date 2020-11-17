import { IonBackButton, IonButton, IonButtons, IonCard, IonCardTitle, IonCol, IonContent, IonFabButton, IonGrid, IonHeader, IonIcon, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import styled from 'styled-components';
import { closeOutline } from "ionicons/icons";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { auth } from "../utils/nhost";

const UserFollowers = (props: any) => {

    const follower = props.location?.state?.follower;

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons>
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>Følgere</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            {
                follower.map((f: any) => (
                    <IonCard>
                        <IonGrid>
                            <IonRow>
                                <IonCol size="11">
                                    <IonCardTitleStyled>{f.user_following.display_name}</IonCardTitleStyled>
                                </IonCol>
                                <IonCol>
                                    <UnfollowIcon icon={closeOutline} />
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

export default UserFollowers;