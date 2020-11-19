import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { Plugins } from "@capacitor/core";
import { IonAlert, IonBackButton, IonButton, IonButtons, IonCard, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonRange, IonSpinner, IonTextarea, IonTitle, IonToolbar } from "@ionic/react";
import gql from "graphql-tag";
import { trashBinOutline } from "ionicons/icons";
import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import CommentsCard from "../components/CommentsCard";
import TripDetailCard from "../components/TripDetailCard";
import ICommentList from "../models/ICommentList";
import ITrip from "../models/ITrip";
import { auth } from "../utils/nhost";

const GET_COMMENTS = gql`
subscription getCommentsById($trip_id: Int!) {
    trips_by_pk(id: $trip_id) {
      comments {
        text
        rating
        user {
          display_name
          avatar_url
        }
      }
    }
  }
`;

const INSERT_COMMENT = gql`
mutation InsertComment($comment: comments_insert_input!) {
    insert_comments_one(object: $comment) {
      user_id
      trip_id
      text
      rating
    }
  }
`;

const DELETE_TRIP = gql`
mutation DeleteTrip($trip_id: Int!) {
    delete_comments (
      where: {
        trip_id: {
          _eq: $trip_id
        }
      }
    ) {
      affected_rows
    }
    delete_trips_by_pk (
      id: $trip_id
    ) {id}
    }
  
`;

const TripDetailPage = (props: any) => {

    //The comments functions aswell as the GQL is inspired by lectures
    //Delete trips inspired by DELETE_POSTS from lectures
    //The delete button funtion in return is inspired by lectures

    const trip: ITrip = props.location?.state?.trip;

    const [deleteTripMutation] = useMutation(DELETE_TRIP);
    const [insertCommentMutation] = useMutation(INSERT_COMMENT);
    const [show, setShow] = useState<boolean>(false);
    let history = useHistory();
    const [comment, setComment] = useState<string>("")
    const [rating, setRating] = useState<number>(3)

    const {loading, data} = useSubscription<ICommentList>(GET_COMMENTS, {
        variables: {
            trip_id: trip?.id
        },
        fetchPolicy: "no-cache"
    });

    if (loading) {
        return <IonSpinner name="crescent" />
    }

    const insertComment = async () => {
        try {
            await insertCommentMutation ({
                variables: {
                    comment: {
                        trip_id: trip?.id,
                        user_id: auth.getClaim('x-hasura-user-id'),
                        text: comment,
                        rating: rating
                    }
                }
            })
        } catch (e) {
            console.error(e)
        }
    }

    const deleteTrip = async () => {
        try {
            await deleteTripMutation ({
                variables: {
                    trip_id: trip.id
                }
            });
        } catch (e) {
            console.error(e);
        }
    }

    if (!trip) {
        return <div></div>
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons>
                        <IonBackButton defaultHref="/home"/>
                    </IonButtons>
                    <IonTitle>Detaljer om turen</IonTitle>
                    {
                       trip.user.id === auth.getClaim("x-hasura-user-id") &&
                         <IonButtons slot="end">
                           <IonButton onClick={() => setShow(true)}>
                             <IonIcon color="danger" icon={trashBinOutline} />
                           </IonButton>
                         </IonButtons>
                    }
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonAlert 
                    isOpen={show}
                    onDidDismiss={() => setShow(false)}
                    header={"Confirm deletion"}
                    message={"Are you sure you want to permanently remove this item?"}
                    buttons={[
                        {
                            text: "No",
                            role: "cancel"
                        },
                        {
                            text: "Yes",
                            handler: () => {
                                deleteTrip()
                                setShow(false)
                                history.replace("/home")
                            }
                        }
                    ]}
                />
                <TripDetailCard {...trip} />
                <IonCard>
                    <IonList>
                        <IonLabel> Omtaler:</IonLabel>
                        <IonItem>
                            <IonLabel>{rating}</IonLabel>
                            <IonRange min={0} max={5} snaps={true} ticks={false} placeholder="Rating" onIonChange={(e: any) => setRating(e.target.value)} />   
                        </IonItem>
                        <IonItem lines="none">
                            <IonTextarea placeholder="Kommentar" onIonChange={(e: any) => setComment(e.target.value)} />
                        </IonItem>
                        <PostCommentBtn onClick={insertComment}>Send kommentar</PostCommentBtn>
                    </IonList>
                </IonCard>
                {
                    data?.trips_by_pk.comments?.map((comment, i) => (
                        <CommentsCard key={`comment-${i}`} {...comment}/>
                    ))
                }
                
            </IonContent>
        </IonPage>
    )
}

const PostCommentBtn = styled(IonButton)`
    font-size: 0.8em;
    margin-left: 5%;
`;

export default TripDetailPage;