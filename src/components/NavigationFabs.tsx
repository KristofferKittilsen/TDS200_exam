import { IonFab, IonFabButton, IonFabList, IonIcon } from "@ionic/react";
import { addCircleOutline, addOutline, homeOutline, personOutline } from "ionicons/icons";
import React from "react";
import styled from 'styled-components';

const NavigationFabs = () => {

    return (
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={addCircleOutline} />
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButtonStyled routerLink="/newTrip">
                <IonIconStyled icon={addOutline} />
            </IonFabButtonStyled>
            <IonFabButtonStyled routerLink="/home">
                <IonIconStyled icon={homeOutline} />
            </IonFabButtonStyled>
          </IonFabList>
        </IonFab>
    )
}

const IonFabButtonStyled = styled(IonFabButton)`
  --background: #3880ff;
`;

const IonIconStyled = styled(IonIcon)`
  color: #ffff;
`;

export default NavigationFabs;