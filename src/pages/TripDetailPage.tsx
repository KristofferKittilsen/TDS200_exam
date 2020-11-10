import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import PostInfoCard from "../components/PostInfoCard";
import TripDetailCard from "../components/TripDetailCard";
import IPost from "../models/IPost";

const TripDetailPage = (props: any) => {

    const post: IPost = props.location?.state?.post;

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons>
                        <IonBackButton defaultHref="/home"/>
                    </IonButtons>
                    <IonTitle>Detail about trip</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <TripDetailCard {...post} />
            </IonContent>
        </IonPage>
    )
}

export default TripDetailPage;