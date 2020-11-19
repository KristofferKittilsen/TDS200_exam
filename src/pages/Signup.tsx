import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonPage, IonRow } from "@ionic/react";
import { lockClosedOutline, mailOutline, personAddOutline } from "ionicons/icons";
import React, { useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { useHistory } from "react-router";
import styled from 'styled-components';
import WaveBackground from "../components/WaveBackground";
import { auth } from "../utils/nhost";

const waveBackgroundString = encodeURIComponent(renderToStaticMarkup(<WaveBackground />));

const Signup = () => {

    //Signup page inspired from lectures.

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [firstname, setFirstname] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");
    let history = useHistory();

    const userSignUp = async () => {
        try {
            await auth.register(email, password, {display_name: `${firstname.charAt(0).toUpperCase() + firstname.slice(1)} ${lastname.charAt(0).toUpperCase() + lastname.slice(1)}`});
            history.replace("/login");
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <IonPage>
            <IonContentStyled>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <PageTitle>Create Account</PageTitle>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol> 
                            <IonItem>
                                <IonInput placeholder="Epost" onIonInput={(e: any) => setEmail(e.target.value)} >
                                    <IonIcon icon={mailOutline}/>
                                </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonInput placeholder="Fornavn" onIonInput={(e: any) => setFirstname(e.target.value)} >
                                    <IonIcon icon={personAddOutline}/>
                                </IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem>
                                <IonInput placeholder="Etternavn" onIonInput={(e: any) => setLastname(e.target.value)} >
                                    <IonIcon icon={personAddOutline}/>
                                </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonInput type="password" placeholder="Passord" onIonInput={(e: any) => setPassword(e.target.value)} >
                                    <IonIcon icon={lockClosedOutline}/>
                                </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButtonStyled onClick={userSignUp}>Sign up</IonButtonStyled>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButtonStyled routerLink="/login">Log in</IonButtonStyled>
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

export default Signup; 