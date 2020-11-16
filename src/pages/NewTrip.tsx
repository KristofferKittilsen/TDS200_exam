import { useMutation } from "@apollo/client";
import { useCamera } from "@capacitor-community/react-hooks/camera";
import { CameraResultType, Plugins } from "@capacitor/core";
import { IonBackButton, IonButton, IonButtons, IonCard, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRange, IonRow, IonSelect, IonSelectOption, IonSpinner, IonTitle, IonToolbar } from "@ionic/react";
import gql from "graphql-tag";
import { cameraOutline, cloudUploadOutline, sendOutline } from "ionicons/icons";
import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from 'styled-components';
import { auth, storage } from "../utils/nhost";

const INSERT_TRIP = gql`
mutation InsertTrip($trip: trips_insert_input!) {
    insert_trips_one(object: $trip) {
      user_id
      image_filename
      how_long
      rating
      trip_area
      trip_difficulty
      trip_type 
      trip_description
      longitude
      latitude
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
    const [uploadPicture, setUploadPicture] = useState<string>("");
    const [isUploadingPic, setIsUploadingPic] = useState<boolean>(false);

    const [tripArea, setTripArea] = useState<string>("");
    const [tripType, setTripType] = useState<string>("");
    const [howLong, setHowLong] = useState<number>();
    const [tripDifficulty, setTripDifficulty] = useState<string>("");
    const [rating, setRating] = useState<any>("");
    const [tripDescription, settripDescription] = useState<string>("");

    const [latitude, setLatitude] = useState<number>();
    const [longitude, setLongitude] = useState<number>();
    const {Geolocation} = Plugins;

    const [checked, setChecked] = useState<boolean>(false);

    const openCamera = async () => {
        await getPhoto ({
            resultType: CameraResultType.DataUrl,
            quality: 20,
            allowEditing: false
        });
        setFilename(`${Date.now().toString()}.jpeg`)
    }

    const uploadImage = async () => {
        setIsUploadingPic(true)
        if (photo?.dataUrl) {
            await startUploading ({
                base64string: photo.dataUrl,
                filenameWithExtension: filename
            })
            setIsUploadingPic(false)
            setUploadPicture("Picture uploaded")
        } else {
            setIsUploadingPic(false)
            alert("You have to take a photo")
        }
    }

    const getGeoLocation = async () => {
        if (checked == true) {
            const coordinates = await Geolocation.getCurrentPosition();
            if (coordinates.coords.latitude || coordinates.coords.longitude == undefined || null) {
                console.log("Current", coordinates)
                setLatitude(coordinates.coords.latitude)
                setLongitude(coordinates.coords.longitude)
                console.log(latitude, longitude)
            }
        }

        if (checked == false) {
            setLatitude(undefined);
            setLongitude(undefined);
        }
    }

    const insertTrip = async () => {
        getGeoLocation()
        try {
            await insertPostMutation({
                variables: {
                    trip: {
                        user_id: auth.getClaim('x-hasura-user-id'),
                        image_filename: filename,
                        how_long: howLong,
                        rating,
                        trip_area: tripArea,
                        trip_difficulty: tripDifficulty,
                        trip_type: tripType,
                        trip_description: tripDescription,
                        latitude: latitude,
                        longitude: longitude
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
                    <IonTitle>Ny tur</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard>
                    <img src={photo?.dataUrl}/>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonItemStyled className="ion-no-padding">
                                    <IonLabel>Område</IonLabel>
                                    <IonInput onIonInput={(e: any) => setTripArea(e.target.value)} />
                                </IonItemStyled>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItemStyled className="ion-no-padding">
                                    <IonLabel>Type tur</IonLabel>
                                    <IonSelect onIonChange={(e: any) => setTripType(e.target.value)}>
                                        <IonSelectOption value="Gåtur">Gåtur</IonSelectOption>
                                        <IonSelectOption value="Joggetur">Joggetur</IonSelectOption>
                                        <IonSelectOption value="Løpetur">Løpetur</IonSelectOption>
                                    </IonSelect>
                                </IonItemStyled>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItemStyled className="ion-no-padding">
                                    <IonLabel>Lengde i KM</IonLabel>
                                    <IonInput type="number" placeholder="Lengde i KM" onIonInput={(e: any) => setHowLong(e.target.value)} />
                                </IonItemStyled>  
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItemStyled className="ion-no-padding">
                                    <IonLabel>Vanskelighetsgrad</IonLabel>
                                    <IonSelect onIonChange={(e: any) => setTripDifficulty(e.target.value)}>
                                        <IonSelectOption value="very_easy">Veldig lett</IonSelectOption>
                                        <IonSelectOption value="easy">Lett</IonSelectOption>
                                        <IonSelectOption value="demanding">Krevende</IonSelectOption>
                                        <IonSelectOption value="hard">Vanskelig</IonSelectOption>
                                        <IonSelectOption value="very_hard">Veldig vanskelig</IonSelectOption>
                                    </IonSelect>
                                </IonItemStyled>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItemStyled className="ion-no-padding">
                                    <IonLabel>Omtale</IonLabel>
                                    <IonLabel>{rating}</IonLabel>
                                    <IonRange onIonChange={e => setRating(e.detail.value)} min={0} max={5} snaps={true} ticks={false}/>
                                </IonItemStyled>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItemStyled className="ion-no-padding">
                                    <IonLabel>Beskrivelse</IonLabel>
                                    <IonInput placeholder="Description" onIonInput={(e: any) => settripDescription(e.target.value)} />
                                </IonItemStyled>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItemStyled className="ion-no-padding">
                                    <IonLabel>Bruke din nåværende posisjon?</IonLabel>
                                    <IonCheckbox checked={checked} onClick={getGeoLocation} onIonChange={e => setChecked(e.detail.checked)} />
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
                                    {
                                        isUploadingPic ?
                                            <IonSpinner name="crescent" /> :
                                            <IonIcon icon={cloudUploadOutline} />
                                    }
                                </IonButton>
                            </IonColStyled>
                            <IonColStyled size="2">
                                <IonButton onClick={insertTrip}>
                                    <IonIcon icon={sendOutline} />
                                </IonButton>
                            </IonColStyled>
                        </IonRow>
                        <IonRow>
                            <IonColStyled>
                                <IonLabel>{uploadPicture}</IonLabel>
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

const UseLocationBtn = styled(IonButton)`
    font-size: 0.8em;
`;

export default NewTrip;