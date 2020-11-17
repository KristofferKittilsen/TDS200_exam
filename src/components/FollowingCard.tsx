import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonIcon, IonLabel, IonRow } from "@ionic/react";
import React, { useState } from "react";
import IUser from "../models/IUser";
import configData from "../config.json";
import styled from 'styled-components';
import ITrip from "../models/ITrip";
import IFollowing from "../models/IFollowing";
import { fitnessOutline, mapOutline, walkOutline } from "ionicons/icons";

const FollowingCard = ({user_followers}: IFollowing) => {

    const [userFollowers, setUserFollowers] = useState<any>(user_followers);

    return (
        <>
            {
                userFollowers.trips.map((trip: any, i: number) => (
                    <IonCard key={`c-${i}`}>
                        <IonCardHeader>
                            <img src={`${configData.IMAGE_ENDPOINT}${trip.image_filename}`}/>
                            <IonCardTitleStyled>{userFollowers.display_name}</IonCardTitleStyled>
                            <IonCardSubtitle>
                                {trip.trip_area}
                            </IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContentStyled>
                            <IonGrid>
                                <IonRow>
                                    <IonCol>
                                    
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonColWithoutPaddingLeft>
                                        <p><IonIcon icon={walkOutline}/>{trip.trip_type}</p>
                                    </IonColWithoutPaddingLeft>
                                    <IonColWithoutPaddingLeft>
                                        <p><IonIcon icon={mapOutline}/>{trip.how_long} km</p>
                                    </IonColWithoutPaddingLeft>
                                </IonRow>
                                <IonRow>
                                    <IonColWithoutPaddingLeft>
                                        <p><IonIcon icon={fitnessOutline}/>{trip.trip_difficulty}</p>
                                    </IonColWithoutPaddingLeft>
                                </IonRow>
                            </IonGrid>
                        </IonCardContentStyled>
                    </IonCard>
                ))
            }
            
        </>
    )
}

const IonCardTitleStyled = styled(IonCardTitle)`
    font-size: 1em;
`;

const IonCardContentStyled = styled(IonCardContent)`
    padding: 0;
`;

const IonColWithoutPaddingLeft = styled(IonCol)`
    padding-left: 0;
    font-size: 0.7em;
`;


export default FollowingCard;