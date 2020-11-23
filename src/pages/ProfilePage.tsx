import { useMutation, useSubscription } from "@apollo/client";
import { useCamera } from "@capacitor-community/react-hooks/camera";
import { CameraResultType } from "@capacitor/core";
import { IonBackButton, IonButton, IonButtons, IonCard, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonModal, IonPage, IonRow, IonSpinner, IonTitle, IonToast, IonToolbar } from "@ionic/react";
import gql from "graphql-tag";
import { cameraOutline, cloudUploadOutline, sendOutline } from "ionicons/icons";
import React, { useState } from "react";
import styled from 'styled-components';
import ProfileCard from "../components/ProfileCard";
import ProfileDetailCard from "../components/ProfileDetailCard";
import IUserList from "../models/IUserList";
import { auth, storage } from "../utils/nhost";


const GET_USER_BY_ID = gql`
subscription ($userId: uuid = "") {
    users(where: {id: {_eq: $userId}}) {
      id
      display_name
      avatar_url
      trips {
          id
          image_filename
          trip_area
          how_long
          trip_type
          trip_difficulty
          trip_description
      }
      followers {
        id
        user_following {
            id
          display_name
        }
        user_followers {
            id
          display_name
        }
      }
      following {
          user_followers {
              id
              display_name
          }
          user_following {
              id
              display_name
          }
      }
    }
  }
`;

const INSERT_FOLLOWER = gql`
mutation InsertFollower($follower: followers_insert_input!){
    insert_followers_one(object: $follower) {
      user_following_id
      user_followers_id
    }
  }
`;

const UPDATE_AVATAR_URL = gql`
mutation ($userId: uuid, $avatarUrl: String) {
    update_users(_set: {avatar_url: $avatarUrl}, where: {id: {_eq: $userId}}) {
      affected_rows
    }
  }  
`;

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

const ProfilePage = (props?: any) => {

    //useImageUpload(), openCamera() and uploadImage() inspired from lectures.
    //updateAvatarUrl inspired from insertTrip() from lectures.

    const userProfileId: any = props?.location?.state?.userProfileId;

    const {loading, data} = useSubscription<IUserList>(
        GET_USER_BY_ID, 
        {variables: {userId: userProfileId}}
    );

    const [showToast, setShowToast] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);

    const [insertFollowerMutation] = useMutation(INSERT_FOLLOWER);
    const [updateAvatarUrlMutaton] = useMutation(UPDATE_AVATAR_URL);

    const {photo, getPhoto} = useCamera();
    const [filename, setFilename] = useState<string>("");
    const { startUploading, uploadProgress } = useImageUpload();
    const [uploadPicture, setUploadPicture] = useState<string>("");
    const [isUploadingPic, setIsUploadingPic] = useState<boolean>(false);
    

    if (loading) {
        return <IonSpinner name="crescent" />
    }

    const insertFollower = async () => {
        setShowToast(true);
        try {
            await insertFollowerMutation ({
                variables: {
                    follower: {
                        user_followers_id: userProfileId,
                        user_following_id: auth.getClaim('x-hasura-user-id')
                    }
                }
            })
        } catch (e) {
            console.error(e)
        }
    }

    const openCamera = async () => {
        await getPhoto ({
            resultType: CameraResultType.DataUrl,
            quality: 20,
            allowEditing: false
        });
        setFilename(`profile${Date.now().toString()}.jpeg`)
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

    const updateAvatarUrl = async () => {
        try {
            await updateAvatarUrlMutaton ({
                variables: {
                    userId: auth.getClaim('x-hasura-user-id'),
                    avatarUrl: filename
                }
            });
            console.log("Ran updateUrl");
            setShowModal(false);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <IonPage>

            <IonModal
                isOpen={showModal}
            >
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Endre profilbilde</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => setShowModal(false)}>Lukk</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonGrid>
                        <IonRow>
                            <IonColStyled>
                                <img src={photo?.dataUrl} />
                            </IonColStyled>
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
                                <IonButton onClick={updateAvatarUrl}>
                                    <IonIcon icon={sendOutline} />
                                </IonButton>
                            </IonColStyled>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonModal>

            <IonHeader>
                <IonToolbar>
                    <IonButtons>
                        <IonBackButton defaultHref="/home"/>
                        <IonTitle>Min profil</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonToast 
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message= {`You are now following`}
                    duration={1000}
                />
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonCardWithoutMarginTop>
                                {
                                    data?.users.map((user, i) => (
                                        <ProfileDetailCard key={`u-${i}`} {...user} />
                                    ))
                                }
                                
                                <IonRow>
                                    <IonCol size="8">
                                        {
                                            data?.users.map((user, i) => (
                                                user?.id !== auth.getClaim("x-hasura-user-id") ?
                                                <FollowButton key={`cb-${i}`} onClick={(insertFollower)}>Følg</FollowButton> :
                                                <FollowButton key={`nothing-${i}`} disabled>Følg</FollowButton>
                                            ))
                                        }
                                    </IonCol>
                                    <IonCol>
                                        {
                                            data?.users.map((user, i) => (
                                                user?.id === auth.getClaim("x-hasura-user-id") ?
                                                <FollowButton key={`cb-${i}`} onClick={() => setShowModal(true)}>Endre profilbilde</FollowButton> :
                                                <div></div>
                                            ))
                                        }
                                    </IonCol>
                                </IonRow>
                            </IonCardWithoutMarginTop>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonCardWithoutMarginTop>
                            <IonCardTitleSentered>Tur galleri</IonCardTitleSentered>         
                                <IonRow>
                                    {
                                        data?.users.map((user, i) => (
                                            <ProfileCard key={`pc-${i}`} {...user} />   
                                        ))
                                    }
                                </IonRow>                  
                            </IonCardWithoutMarginTop>
                        </IonCol>
                    </IonRow>
                </IonGrid>    
            </IonContent>
        </IonPage>
    )
}

const IonCardWithoutMarginTop = styled(IonCard)`
    margin-top: 0;
    margin-bottom: 0;
`;

const IonCardTitleSentered = styled(IonCardTitle)`
    align-self: center;
    padding-top: 5%;
    margin-left: 5%;
    margin-bottom: 0;
`;

const IonCardTitleStyled = styled(IonCardTitle)`
    font-size: 0.8em;
`;

const FollowButton = styled(IonButton)`
    font-size: 0.7em;
`;

const IonColStyled = styled(IonCol)`
    margin-left: 5%;
`;


export default ProfilePage; 