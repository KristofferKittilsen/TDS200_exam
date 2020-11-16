import { IonAvatar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonImg, IonItem, IonRow, IonThumbnail } from "@ionic/react";
import React from "react";
import IComment from "../models/IComment";
import styled from 'styled-components';
import configData from "../config.json";

const CommentsCard = ({id, text, rating, user}: IComment) => {
    return (
        <IonCard>
            <IonCardHeader>
                <IonItem>
                    <IonThumbnail slot="start">
                        <img src={`${configData.IMAGE_ENDPOINT}${user.avatar_url}`}/>
                    </IonThumbnail>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonCardTitleStyled>{user.display_name}</IonCardTitleStyled>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonCardSubtitle>Omtale: {rating}</IonCardSubtitle>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>
            </IonCardHeader>
            <IonCardContent>
                <p>{text}</p>
            </IonCardContent>
        </IonCard>
    )
}

const IonCardTitleStyled = styled(IonCardTitle)`
    font-size: 0.7em;
`;

export default CommentsCard;