import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonLabel, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { GoogleMap, Marker, Polyline, Rectangle, useLoadScript } from "@react-google-maps/api";
import React, { useState } from "react";
import configData from "../config.json";
import mapStyles from "../components/mapStyles"

const MapPage = (props: any) => {

    //Inspiration from https://www.youtube.com/watch?v=WZcxJGmLbSo where I used most of the early code, with some alterations.
    //Inspiration from https://stackoverflow.com/questions/6098947/styling-a-google-maps-v3-polyline-with-dashes-or-dots to make the line between markers dashed.
    //Map style(../components/mapStyles) taken from https://snazzymaps.com/style/14889/flat-pale.

    const lat: number = props.location?.state?.latitude;
    const lng: number = props.location?.state?.longitude;
    const endlat: number = props.location?.state?.endlat;
    const endlng: number = props.location?.state?.endlng;

    const {isLoaded, loadError} = useLoadScript ({
        googleMapsApiKey: configData.GOOGLE_MAPS_API_KEY,
    });

    const startcoords = {
        lat: lat,
        lng: lng
    };

    const endcoords = {
        lat: endlat,
        lng: endlng
    };

    const options = {
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true,
    }

    if (loadError) {
        console.log(loadError)
        return  <IonLabel>Problemer med innlastningen av kart</IonLabel>
    }

    if (!isLoaded) {
        return <IonLabel>Laster inn kart</IonLabel>
    }


    const path = [
        {lat, lng},
        {lat: endlat, lng: endlng}
    ]

    const lineSymbol = {
        path: "m 0, -1, 0,1",
        strokeOpacity: 1,
        scale: 4
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                  <IonTitle>Kart</IonTitle>
                  <IonButtons>
                        <IonBackButton defaultHref="/home"/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {
                    console.log(endcoords)
                }
                <GoogleMap 
                    mapContainerStyle={{width: "100%", height: "100%"}} 
                    zoom={12} 
                    center={startcoords}
                    options={options}
                    >
                        <Marker label="Start" position={startcoords}/>
                        <Marker label="Slutt" position={endcoords}/>
                        <Polyline 
                            path={path} 
                            options={{
                                strokeOpacity: 0,
                                strokeColor: "gray",
                                icons: [{
                                    icon: lineSymbol,
                                    repeat: "20px"
                                }]
                            }} />
                </GoogleMap>
                
            </IonContent>
        </IonPage>
    )
}


export default MapPage;