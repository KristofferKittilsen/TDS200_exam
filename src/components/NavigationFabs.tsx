import { IonFab, IonFabButton, IonFabList, IonIcon } from "@ionic/react";
import { addOutline, logOutOutline, addCircleOutline } from "ionicons/icons";
import React from "react";
import { useHistory } from "react-router";
import styled from 'styled-components';
import { auth } from "../utils/nhost";

const NavigationFabs = () => {

  //Used ionic component docs

  let history = useHistory();

  const logout = async () => {
    try {
      await auth.logout();
      history.replace("/");
    } catch (e) {
      console.error(e);
    }
  }

    return (
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIconStyled icon={addCircleOutline} />
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButtonStyled onClick={logout}>
              <IonIconStyled icon={logOutOutline} />
            </IonFabButtonStyled>
            <IonFabButtonStyled routerLink="/newTrip">
              <IonIconStyled icon={addOutline} />
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