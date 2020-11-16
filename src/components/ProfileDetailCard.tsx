import { IonRow, IonItem, IonCol, IonAvatar, IonLabel, IonCardTitle } from "@ionic/react";
import React, { useState } from "react";
import IUser from "../models/IUser";
import configData from "../config.json";
import styled from 'styled-components';

const ProfileDetailCard = ({avatar_url, display_name, followers}: IUser) => {

    const [follower, setFollower] = useState<any>(followers);

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
                        <IonCardTitleStyled>Email: {display_name}</IonCardTitleStyled>
                        <IonLabel>Followers: {follower.length}</IonLabel>
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