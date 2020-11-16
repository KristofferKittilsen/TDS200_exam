import { IonCard, IonCardContent, IonCardTitle, IonLabel } from "@ionic/react";
import React, { useState } from "react";
import styled from 'styled-components';
import configData from "../config.json";
import IUser from "../models/IUser";

const ProfileCard = ({posts}: IUser) => {

    const [post, setPost] = useState<any>(posts);
    
    return (
        <>
            {
                post.map((p: any, i: any) => (
                    <IonCard key={`up-${i}`}>
                        <IonCardTitle>
                            <img src={`${configData.IMAGE_ENDPOINT}${p.image_filename}`} />
                        </IonCardTitle>
                        <IonCardContentStyled>
                            <IonLabelStyled>Area: {p.trip_area}</IonLabelStyled>
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