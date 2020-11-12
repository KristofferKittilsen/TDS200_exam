import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";
import { fitnessOutline, mapOutline, walkOutline } from "ionicons/icons";
import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import configData from "../config.json";
import ITrip from "../models/ITrip";

const TripDetailCard = ({how_long, trip_description, id, image_filename, rating, trip_area, trip_difficulty, trip_type, user, latitude, longitude}: ITrip) => {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>
                    <img src={`${configData.IMAGE_ENDPOINT}${image_filename}`}/>
                </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonCardSubtitle>
                    Posted by: 
                    <br></br>
                    <Link style={{textDecoration: "none"}}
                     to={{
                         pathname: `/home`,
                         state: {
                             displayName: user.display_name,
                             userId: user.id
                         }
                     }}>{user.display_name}</Link>
                </IonCardSubtitle>
                <IonGrid>
                    <IonRow>
                        <IonColWithoutPaddingLeft>
                            <p><IonIcon icon={mapOutline}/> Area: {trip_area}</p>
                        </IonColWithoutPaddingLeft>
                    </IonRow>
                    <IonRow>
                        <IonColWithoutPaddingLeft>
                            <p><IonIcon icon={walkOutline}/> Type: {trip_type}</p>
                        </IonColWithoutPaddingLeft>
                    </IonRow>
                    <IonRow>
                        <IonColWithoutPaddingLeft>
                            <p><IonIcon icon={fitnessOutline}/> Difficulty: {trip_difficulty}</p>
                        </IonColWithoutPaddingLeft>
                    </IonRow>
                    <IonRow>
                        <IonColWithoutPaddingLeft>
                            <p><IonIcon icon={fitnessOutline}/> Length: {how_long} km</p>
                        </IonColWithoutPaddingLeft>
                    </IonRow>
                    <IonRow>
                        <IonColWithoutPaddingLeft>
                            <p><IonIcon icon={fitnessOutline}/> Rating: {rating}</p>
                        </IonColWithoutPaddingLeft>
                    </IonRow>
                    <IonRow>
                        <IonColWithoutPaddingLeft>
                            <IonCardSubtitle>Trip description:</IonCardSubtitle>
                            <p>{trip_description}</p>
                        </IonColWithoutPaddingLeft>
                    </IonRow>
                    <IonRow>
                        <IonColWithoutPaddingLeft>
                            <p><IonIcon icon={mapOutline}/>Starting Lat and Lon: {latitude}, {longitude}</p>
                        </IonColWithoutPaddingLeft>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
    )
}

const IonColWithoutPaddingLeft = styled(IonCol)`
    padding-left: 0;
`;

export default TripDetailCard;