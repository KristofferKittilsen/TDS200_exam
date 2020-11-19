import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonIcon, IonLabel, IonRow } from "@ionic/react";
import { fitnessOutline, mapOutline, walkOutline } from "ionicons/icons";
import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import configData from "../config.json";
import ITrip from "../models/ITrip";

const TripDetailCard = ({how_long, trip_description, id, image_filename, rating, trip_area, trip_difficulty, trip_type, user, latitude, longitude, endlat, endlng}: ITrip) => {

    //Inpired by lectures, not checkCoords(that i figured out myself).

    const checkCoords = () => {
        if (longitude || latitude != null) {
            return (
                <Link to={{
                    pathname: "/map",
                    state: {
                        latitude,
                        longitude,
                        endlat,
                        endlng
                    }
                }}>
                    <p><IonIcon icon={mapOutline}/>Se startpunkt</p>
                </Link>
            )
        }
    }

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>
                    <img src={`${configData.IMAGE_ENDPOINT}${image_filename}`}/>
                </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonCardSubtitle>
                    Lagt ut av: 
                    <br></br>
                    <Link style={{textDecoration: "none"}}
                     to={{
                         pathname: `/profile/${user.id}`,
                         state: {
                             userProfileId: user.id
                         }
                        }}>{user.display_name}</Link>
                </IonCardSubtitle>
                <IonGrid>
                    <IonRow>
                        <IonColWithoutPaddingLeft>
                            <p><IonIcon icon={mapOutline}/> Område: {trip_area}</p>
                        </IonColWithoutPaddingLeft>
                    </IonRow>
                    <IonRow>
                        <IonColWithoutPaddingLeft>
                            <p><IonIcon icon={walkOutline}/> Type tur: {trip_type}</p>
                        </IonColWithoutPaddingLeft>
                    </IonRow>
                    <IonRow>
                        <IonColWithoutPaddingLeft>
                            <p><IonIcon icon={fitnessOutline}/> Vanskelighetsgrad: {trip_difficulty}</p>
                        </IonColWithoutPaddingLeft>
                    </IonRow>
                    <IonRow>
                        <IonColWithoutPaddingLeft>
                            <p><IonIcon icon={fitnessOutline}/> Langde: {how_long} km</p>
                        </IonColWithoutPaddingLeft>
                    </IonRow>
                    <IonRow>
                        <IonColWithoutPaddingLeft>
                            <p><IonIcon icon={fitnessOutline}/> Omtale: {rating}</p>
                        </IonColWithoutPaddingLeft>
                    </IonRow>
                    <IonRow>
                        <IonColWithoutPaddingLeft>
                            <IonCardSubtitle>Tur beskrivelse:</IonCardSubtitle>
                            <p>{trip_description}</p>
                        </IonColWithoutPaddingLeft>
                    </IonRow>
                    <IonRow>
                        <IonColWithoutPaddingLeft>
                            {checkCoords()}
                            {console.log(endlat, endlng)}
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