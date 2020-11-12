import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";
import { fitnessOutline, mapOutline, walkOutline } from "ionicons/icons";
import React from "react";
import styled from 'styled-components';
import configData from "../config.json";
import ITrip from "../models/ITrip";

const PostInfoCard = ({id, how_long, rating, trip_area, trip_difficulty, trip_type, user, image_filename, trip_description}: ITrip) => {

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitleStyled>
                    <img src={`${configData.IMAGE_ENDPOINT}${image_filename}`}/>
                    {user.display_name}
                </IonCardTitleStyled>
                <IonCardSubtitle>
                    {trip_area}
                </IonCardSubtitle>
                <IonCardContentStyled>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonColWithoutPaddingLeft>
                                <p><IonIcon icon={walkOutline}/> Trip type: {trip_type}</p>
                            </IonColWithoutPaddingLeft>
                            <IonColWithoutPaddingLeft>
                                <p><IonIcon icon={mapOutline}/> How long: {how_long} km</p>
                            </IonColWithoutPaddingLeft>
                        </IonRow>
                        <IonRow>
                            <IonColWithoutPaddingLeft>
                                <p><IonIcon icon={fitnessOutline}/> Trip difficulty: {trip_difficulty}</p>
                            </IonColWithoutPaddingLeft>
                        </IonRow>
                    </IonGrid>
                </IonCardContentStyled>
            </IonCardHeader>
        </IonCard>
    )
}

const IonCardContentStyled = styled(IonCardContent)`
    padding: 0;
`;

const IonColWithoutPaddingLeft = styled(IonCol)`
    padding-left: 0;
    font-size: 0.7em;
`;

const IonCardTitleStyled = styled(IonCardTitle)`
    font-size: 1em;
`;

export default PostInfoCard;