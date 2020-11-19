import { IonAvatar, IonCardTitle, IonCol, IonGrid, IonItem, IonLabel, IonRow } from "@ionic/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import configData from "../config.json";
import IUser from "../models/IUser";

const ProfileDetailCard = ({avatar_url, display_name, followers, following}: IUser) => {

    const [follower, setFollower] = useState<any>(followers);
    const [userFollowing, setUserFollowing] = useState<any>(following);
    const [displayName, setDisplayName] = useState<string>(display_name.charAt(0).toUpperCase() + display_name.slice(1))
   
    return(
        <>    
            <IonRow>
                <IonItemWidth className="ion-no-padding">
                    <IonCol size="3">
                        <IonAvatar>
                            <img src={`${configData.IMAGE_ENDPOINT}${avatar_url}`}/>
                        </IonAvatar>
                    </IonCol>
                    <IonCol>
                        <IonGrid>
                            <IonRow>
                                <IonCardTitleStyled>{displayName}</IonCardTitleStyled>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <Link style={{textDecoration: "none", color: "black", fontSize: "0.8em"}} to={{
                                        pathname: "/userfollowers",
                                        state: {
                                            follower
                                        }
                                    }}>
                                        <IonLabel>Følgere: {follower.length}</IonLabel>
                                    </Link>
                                </IonCol>
                                <IonCol>
                                    <Link style={{textDecoration: "none", color: "black", fontSize: "0.8em"}} to={{
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
                </IonItemWidth>
            </IonRow>
        </>
    )
}

const IonCardTitleStyled = styled(IonCardTitle)`
    font-size: 0.8em;
    margin-left: 2%;
`;

const IonItemWidth = styled(IonItem)`
    width: 100%;
`;

export default ProfileDetailCard;