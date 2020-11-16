import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import React from "react";
import styled from 'styled-components';

const NavigationFabs = () => {

    return (
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/newTrip">
            <IonIcon icon={addOutline} />
          </IonFabButton>
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