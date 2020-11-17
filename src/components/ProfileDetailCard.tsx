import { IonAvatar, IonCardTitle, IonCol, IonGrid, IonItem, IonLabel, IonRow } from "@ionic/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import configData from "../config.json";
import IUser from "../models/IUser";

const ProfileDetailCard = ({avatar_url, display_name, followers, following}: IUser) => {

    const [follower, setFollower] = useState<any>(followers);
    const [userFollowing, setUserFollowing] = useState<any>(following);

    return(
        <>    
            <IonRow>
                <IonItem className="ion-no-padding">
                    <IonCol size="3">
                        <IonAvatar>
                            <img src={`${configData.IMAGE_ENDPOINT}${avatar_url}`}/>
                        </IonAvatar>
                    </IonCol>
                    <IonCol>
                        <IonGrid>
                            <IonRow>
                                <IonCardTitleStyled>Epost: {display_name}</IonCardTitleStyled>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <Link style={{textDecoration: "none", color: "black"}} to={{
                                        pathname: "/userfollowers",
                                        state: {
                                            follower
                                        }
                                    }}>
                                        <IonLabel>Følgere: {follower.length}</IonLabel>
                                    </Link>
                                </IonCol>
                                <IonCol>
                                    <Link style={{textDecoration: "none", color: "black"}} to={{
                                        pathname: "/userfollowing",
                                        state: {
                                            following: userFollowing
                                        }
                                    }}>
                                        <IonLabel>Følger: {userFollowing.length}</IonLabel>
                                    </Link>
                                    
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonCol>
                </IonItem>
            </IonRow>
        </>
    )
}

const IonCardTitleStyled = styled(IonCardTitle)`
    font-size: 0.8em;
`;

export default ProfileDetailCard;