import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonItemDivider, IonList, IonPage, IonRow } from "@ionic/react";
import React from "react";
import WaveBackground from "../components/WaveBackground";
import { renderToStaticMarkup } from "react-dom/server";
import styled from 'styled-components';
import { mailOutline, lockClosedOutline } from "ionicons/icons";

const waveBackgroundString = encodeURIComponent(renderToStaticMarkup(<WaveBackground />));

const ProfilePage = () => {
    return (
        <IonPage>
            <IonContentStyled>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <PageTitle>Log in</PageTitle>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol> 
                            <IonItem>
                                <IonInput placeholder="Log in">
                                    <IonIcon icon={mailOutline}/>
                                </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonInput placeholder="Sign up">
                                    <IonIcon icon={lockClosedOutline}/>
                                </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButtonStyled routerLink="/home">Log in</IonButtonStyled>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButtonStyled>Sign up</IonButtonStyled>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContentStyled>
        </IonPage>
    )
}

const IonContentStyled = styled(IonContent)`
    --background: none;
    background: url("data:image/svg+xml,${waveBackgroundString}") no-repeat fixed;
    background-size: cover;
`;

const PageTitle = styled.h1`
    font-size: 2.5em;
    font-family: 'Quicksand', sans-serif;
    align-self: center;
    color: #ffff;
`;

const IonButtonStyled = styled(IonButton)`
    width: 50%;
`;

export default ProfilePage; 