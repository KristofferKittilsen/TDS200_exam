import { IonButton, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonPage, IonRow, IonTextarea, IonTitle, IonToolbar, IonButtons, IonBackButton, IonItem, IonRange, IonLabel, IonIcon } from "@ionic/react";
import React, { useState } from "react";
import {useCamera} from "@capacitor-community/react-hooks/camera";
import { CameraResultType } from "@capacitor/core";
import { auth, storage } from "../utils/nhost";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router";
import styled from 'styled-components';
import { walkOutline, addCircleOutline, personOutline, addOutline, homeOutline, cameraOutline, cloudUploadOutline, sendOutline } from "ionicons/icons";

const INSERT_TRIP = gql`
mutation InsertTrip($post: posts_insert_input!) {
    insert_posts_one(object: $post) {
      user_id
      image_filename
      how_long
      rating
      trip_area
      trip_difficulty
      trip_type 
      trip_description
    }
  }
`

const useImageUpload = () => {
    const [uploadProgress, setUploadProgress] = useState<number>(0);

    const startUploading = async ({base64string, filenameWithExtension}: {base64string: string, filenameWithExtension: string}) => {
        try {
            await storage.putString(`/public/${filenameWithExtension}`, base64string, "data_url", null, (pe: ProgressEvent) => {
                setUploadProgress((pe.loaded / pe.total) * 100);
            });
        } catch (e) {
            console.warn(e);
        }
    };

    return {
        uploadProgress,
        startUploading
    }

};

const NewTrip = () => {

    const {photo, getPhoto} = useCamera();
    const [filename, setFilename] = useState<string>("");
    const { startUploading, uploadProgress } = useImageUpload();
    const [insertPostMutation] = useMutation(INSERT_TRIP);
    let history = useHistory();

    const [tripArea, setTripArea] = useState<string>("");
    const [tripType, setTripType] = useState<string>("");
    const [howLong, setHowLong] = useState<number>();
    const [tripDifficulty, setTripDifficulty] = useState<string>("");
    const [rating, setRating] = useState<any>("");
    const [tripDescription, settripDescription] = useState<string>("");

    const openCamera = async () => {
        await getPhoto ({
            resultType: CameraResultType.DataUrl,
            quality: 20,
            allowEditing: false
        });
        setFilename(`${Date.now().toString()}.jpeg`)
    }

    const uploadImage = async () => {
        if (photo?.dataUrl) {
            await startUploading ({
                base64string: photo.dataUrl,
                filenameWithExtension: filename
            })
        } else {
            alert("Take photo")
        }
    }

    const insertTrip = async () => {
        try {
            await insertPostMutation({
                variables: {
                    post: {
                        user_id: auth.getClaim('x-hasura-user-id'),
                        image_filename: filename,
                        how_long: howLong,
                        rating,
                        trip_area: tripArea,
                        trip_difficulty: tripDifficulty,
                        trip_type: tripType,
                        trip_description: tripDescription
                    }
                }
            });
            history.replace("/home");
        } catch (e) {
            console.error(e);
        }
    }
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons>
                        <IonBackButton defaultHref="/home"/>
                    </IonButtons>
                    <IonTitle>New Trip Page</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard>
                    <img src={photo?.dataUrl}/>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonItemStyled>
                                    <IonLabel>Area</IonLabel>
                                    <IonInput onIonInput={(e: any) => setTripArea(e.target.value)} />
                                </IonItemStyled>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItemStyled>
                                    <IonLabel>Type</IonLabel>
                                    <IonInput placeholder="Type" onIonInput={(e: any) => setTripType(e.target.value)} />
                                </IonItemStyled>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItemStyled>
                                    <IonLabel>Length in KM</IonLabel>
                                    <IonInput type="number" placeholder="Length in KM" onIonInput={(e: any) => setHowLong(e.target.value)} />
                                </IonItemStyled>  
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItemStyled>
                                    <IonLabel>Difficulty</IonLabel>
                                    <IonInput placeholder="Difficulty" onIonInput={(e: any) => setTripDifficulty(e.target.value)} />
                                </IonItemStyled>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItemStyled>
                                    <IonLabel>Rating</IonLabel>
                                    <IonLabel>{rating}</IonLabel>
                                    <IonRange onIonChange={e => setRating(e.detail.value)} min={0} max={5} snaps={true} ticks={false}/>
                                </IonItemStyled>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItemStyled>
                                    <IonLabel>Description</IonLabel>
                                    <IonInput placeholder="Description" onIonInput={(e: any) => settripDescription(e.target.value)} />
                                </IonItemStyled>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonColStyled size="2">
                                <IonButton onClick={openCamera}>
                                    <IonIcon icon={cameraOutline} />
                                </IonButton>
                            </IonColStyled>
                            <IonColStyled size="5">
                                <IonButton onClick={uploadImage}>
                                    <IonIcon icon={cloudUploadOutline} />
                                </IonButton>
                            </IonColStyled>
                            <IonColStyled size="2">
                                <IonButton onClick={insertTrip}>
                                    <IonIcon icon={sendOutline} />
                                </IonButton>
                            </IonColStyled>
                        </IonRow>
                    </IonGrid>
                </IonCard>
            </IonContent>
        </IonPage>
    )   
}

const IonItemStyled = styled(IonItem)`
    font-size: 0.8em;
`;

const IonColStyled = styled(IonCol)`
    margin-left: 5%;
`;

export default NewTrip;