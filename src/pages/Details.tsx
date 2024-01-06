import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonFooter, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonModal, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { DetailsResult, useApi } from '../hooks/useApi';
import { bodyOutline, clipboardOutline, starHalfOutline, trophyOutline } from 'ionicons/icons';

interface DetailsPageProps
    extends RouteComponentProps<{
        id: string
    }> {}
const Details: React.FC<DetailsPageProps> = ({ match }) => {
    const { getDetails } = useApi();
    const [information, setInformation] = useState<DetailsResult | null>({
        Genre: '',
        Title: '',
        Year: '',
        Poster: '',
        Plot: '',
        imdbRating: '',
        Director: '',
        Actors: '',
        Website: '',
        Awards: '',
    });


    useIonViewWillEnter(async () => {
        try {
            const id = match.params.id;
            const data = await getDetails(id);
            if (data) {
                setInformation(data);
            } else {
                // Handle the case where no data is returned
            }
        } catch (error) {
            console.error('Error fetching details:', error);
        }
    });

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref='/movies'></IonBackButton>
                    </IonButtons>
                    <IonTitle>{information?.Genre}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            {information && (
                            <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>{information.Title}</IonCardTitle>
                                <IonCardSubtitle>{information.Year}</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent text-center>
                                <IonImg src={information.Poster}/>
        
                                <IonItem lines="none">
                                    <IonIcon icon={starHalfOutline} slot="start" color="warning"/>
                                    <IonLabel>{information.imdbRating}</IonLabel>
                                </IonItem>
                            </IonCardContent>
                    </IonCard>
            )}
            <IonModal trigger='open-modal' 
            initialBreakpoint={0.25}
            breakpoints={[0, .25, .5, .75]}>
                <IonContent className='ion-padding'>
                    <IonItem lines='none'>
                        <IonIcon icon={clipboardOutline} slot="start"/>
                        <IonLabel className='ion-text-wrap'>{information?.Director}</IonLabel>
                    </IonItem>

                    <IonItem lines='none'>
                        <IonIcon icon={bodyOutline} slot="start"/>
                        <IonLabel className='ion-text-wrap'>{information?.Actors}</IonLabel>
                    </IonItem>

                    <IonItem lines='none'>
                        <IonIcon icon={trophyOutline} slot="start"/>
                        <IonLabel className='ion-text-wrap'>{information?.Awards}</IonLabel>
                    </IonItem>
                    <p className="ion-padding">
                        {information?.Plot}
                    </p>
                </IonContent>
        
            </IonModal>
            </IonContent>
            <IonFooter>
                <IonButton expand="full" id="open-modal">
                    Show More
                </IonButton>
            </IonFooter>
        </IonPage>
    )
}

export default Details;