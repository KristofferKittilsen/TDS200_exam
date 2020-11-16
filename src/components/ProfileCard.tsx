import { IonButton, IonCard, IonCardContent, IonCardTitle, IonLabel } from "@ionic/react";
import React, { useState } from "react";
import configData from "../config.json";
import ITrip from "../models/ITrip";
import styled from 'styled-components';

const ProfileCard = ({image_filename, trip_area, id, user}: ITrip) => {
    
    return (
        <IonCard>
            <IonCardTitle>
                <img src={`${configData.IMAGE_ENDPOINT}${image_filename}`} />
            </IonCardTitle>
            <IonCardContentStyled>
                <IonLabelStyled>Area: {trip_area}</IonLabelStyled>
            </IonCardContentStyled>
        </IonCard>
    )
}

const IonLabelStyled = styled(IonLabel)`
    font-size: 0.8em;
`;

const IonCardContentStyled = styled(IonCardContent)`
    padding: 0;
    padding-bottom: 2%;
`;

export default ProfileCard;