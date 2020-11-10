import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonRow } from "@ionic/react";
import React from "react";
import IPost from "../models/IPost";

const PostInfoCard = ({id, how_long, rating, trip_area, trip_difficulty, trip_type, user}: IPost) => {

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>
                    {user.display_name}
                </IonCardTitle>
                <IonCardSubtitle>
                    {trip_area}
                </IonCardSubtitle>
                <IonCardContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                Trip type: {trip_type}
                            </IonCol>
                            <IonCol>
                                How long: {how_long}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                Trip difficulty: {trip_difficulty}
                            </IonCol>
                            <IonCol>
                                Rated: {rating} stars
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCardContent>
            </IonCardHeader>
        </IonCard>
    )
}

export default PostInfoCard;