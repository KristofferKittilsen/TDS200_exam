import { IonFab, IonFabButton, IonIcon, IonFabList } from "@ionic/react";
import { addCircleOutline, addOutline, walkOutline, personOutline, homeOutline } from "ionicons/icons";
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
                <IonIcon icon={addOutline} />
            </IonFabButtonStyled>
            <IonFabButtonStyled routerLink="/profile">
                <IonIcon icon={personOutline} />
            </IonFabButtonStyled>
            <IonFabButtonStyled routerLink="/home">
                <IonIcon icon={homeOutline} />
            </IonFabButtonStyled>
          </IonFabList>
        </IonFab>
    )
}

const IonFabButtonStyled = styled(IonFabButton)`
  --background: #3880ff;
`;

export default NavigationFabs;