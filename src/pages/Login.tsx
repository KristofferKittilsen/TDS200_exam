import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonPage, IonRow, useIonViewWillEnter } from "@ionic/react";
import React, { useState } from "react";
import WaveBackground from "../components/WaveBackground";
import { renderToStaticMarkup } from "react-dom/server";
import styled from 'styled-components';
import { mailOutline, lockClosedOutline } from "ionicons/icons";
import { auth } from "../utils/nhost";
import { useHistory } from "react-router";

const waveBackgroundString = encodeURIComponent(renderToStaticMarkup(<WaveBackground />));

const Login = () => {

    let history = useHistory();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [emailOrPasswordError, setEmailOrPasswordError] = useState<string>("");

    useIonViewWillEnter(() => {
        if (auth.isAuthenticated()) {
            console.log("YES")
            history.replace("/home");
        }
    });

    const authUser = async () => {
        try {
            await auth.login(email, password);
            history.replace("/home");
        } catch (e) {
            setEmailOrPasswordError("Wrong email or password")
            console.error(e);
        }
    }

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
                            <p>{emailOrPasswordError}</p>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol> 
                            <IonItem>
                                <IonInput placeholder="Email" onIonInput={(e: any) => setEmail(e.target.value)}>
                                    <IonIcon icon={mailOutline}/>
                                </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonInput placeholder="Password" type="password" onIonInput={(e: any) => setPassword(e.target.value)}>
                                    <IonIcon icon={lockClosedOutline}/>
                                </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButtonStyled onClick={authUser}>Log in</IonButtonStyled>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButtonStyled routerLink="/Signup">Sign up</IonButtonStyled>
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

export default Login; 