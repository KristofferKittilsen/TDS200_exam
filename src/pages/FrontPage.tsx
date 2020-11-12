import { IonButton, IonContent, IonPage } from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const FrontPage = () => {

    let history = useHistory();
    const replaceFrontPageWithLogin = () => {
        history.replace("/login")
    }

    const replaceFrontPageWithSignUp = () => {
        history.replace("/signup")
    }

    return (
        <IonPage>
            <IonContentBackground>
                <CenteredContainer>
                    <PageTitle>Ut på tur</PageTitle>
                    <PageSubtitle>Vi hjelper deg å komme deg ut av døra</PageSubtitle>
                    <FrontPageLoginBtn onClick={replaceFrontPageWithLogin}>Log in</FrontPageLoginBtn>
                    <FrontPageSignUpBtn onClick={replaceFrontPageWithSignUp}>Sign up</FrontPageSignUpBtn>
                </CenteredContainer>
            </IonContentBackground>
        </IonPage>
    )
}

const CenteredContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100%;
`;

const PageTitle = styled.h1`
    font-size: 3em;
    align-self: center;
    font-family: 'Quicksand', sans-serif;
`;
const PageSubtitle = styled.h2`
    font-size: 1em;
    align-self: center;
    font-family: 'Quicksand', sans-serif;
`;

const IonContentBackground = styled(IonContent)`
    --background: #0099FF;
    background-size: cover;
`;

const FrontPageLoginBtn = styled(IonButton)`
    --background: #ffff;
    color: #0099FF;
    align-self: center;
    width: 50%;
`;

const FrontPageSignUpBtn = styled(IonButton)`
    --background: #0099FF;
    color: #ffff;
    align-self: center;
    width: 50%;
    border: 1px #ffff solid;
    border-radius: 10px;
`;

export default FrontPage;