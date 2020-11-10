import { IonContent, IonLabel, IonPage } from "@ionic/react";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import NavigationFabs from "../components/NavigationFabs";
import WaveBackground from "../components/WaveBackground";

const ProfilePage = () => {
    return (
        <IonPage>
            
            <IonContent>
                <IonLabel>PROFILE</IonLabel>
                <NavigationFabs />
            </IonContent>
        </IonPage>
    )
}

export default ProfilePage; 