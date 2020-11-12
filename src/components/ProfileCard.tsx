import { IonCard, IonCol, IonGrid, IonRow } from "@ionic/react";
import React from "react";
import configData from "../config.json";
import ITrip from "../models/ITrip";

const ProfileCard = ({image_filename, trip_area, id, user}: ITrip) => {
    
    return (
        <IonCard>
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <img src={`${configData.IMAGE_ENDPOINT}${image_filename}`}/>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <p>{trip_area}</p>
                    </IonCol>
                </IonRow>
            </IonGrid> 
        </IonCard> 
    )
}

export default ProfileCard;