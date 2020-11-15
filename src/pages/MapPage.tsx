import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonLabel, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import React, { useState } from "react";
import configData from "../config.json";

const MapPage = (props: any) => {

    const lat: any = props.location?.state?.latitude;
    const lng: any = props.location?.state?.longitude;

    const {isLoaded, loadError} = useLoadScript ({
        googleMapsApiKey: configData.GOOGLE_MAPS_API_KEY,
    });

    const coords = {
        lat: lat,
        lng: lng
    };

    const options = {
        disableDefaultUI: true,
        zoomControl: true
    }

    if (loadError) {
        console.log(loadError)
        return  <IonLabel>Error loading maps</IonLabel>
    }

    if (!isLoaded) {
        return <IonLabel>Loading maps</IonLabel>
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                  <IonTitle>Map page</IonTitle>
                  <IonButtons>
                        <IonBackButton defaultHref="/home"/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <GoogleMap 
                    mapContainerStyle={{width: "100%", height: "100%"}} 
                    zoom={10} 
                    center={coords}
                    options={options}
                    >
                        <Marker position={coords}/>
                </GoogleMap>
                
            </IonContent>
        </IonPage>
    )
}


export default MapPage;