import { IonCard, IonCardContent, IonCardTitle, IonLabel } from "@ionic/react";
import React, { useState } from "react";
import styled from 'styled-components';
import configData from "../config.json";
import IUser from "../models/IUser";

const ProfileCard = ({trips}: IUser) => {

    const [trip, setPost] = useState<any>(trips);
    
    return (
        <>
            {
                trip.map((t: any, i: any) => (
                    <IonCard key={`up-${i}`}>
                        <IonCardTitle>
                            <img src={`${configData.IMAGE_ENDPOINT}${t.image_filename}`} />
                        </IonCardTitle>
                        <IonCardContentStyled>
                            <IonLabelStyled>Area: {t.trip_area}</IonLabelStyled>
                        </IonCardContentStyled>
                    </IonCard>
                ))
            }
            
        </>
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