import React, { useEffect, useState } from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonIcon, 
  IonPage, 
  IonToolbar,
  IonText 
} from '@ionic/react';
import { logoYoutube } from 'ionicons/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setVisibleWidgets } from '@boilerplate/store';
import StoreButton from '../../components/store-button/store-button.component';
import AmazonIVSPlayer from '../../components/amazon-ivs-player/amazon-ivs-player.component';
import ProductCard from '../../components/product-card/product-card.component';
import { socketClient } from '../../socket';
import { IonicRequisitesEnum } from '@boilerplate/shared';
import './stream.styles.css';


const Stream: React.FC = () => {	
  const [socketPlaybackUrl, setSocketPlaybackUrl] = useState<string | null>(null);

  const dispatch = useDispatch();

  const visibleWidgets = useSelector((state: RootState) => state.widgetsStoreReducer.visibleWidgets);

  useEffect(() => {
	socketClient.joinPlayer(IonicRequisitesEnum.Id);

	socketClient.subscribeOnNewPlaybackUrl(IonicRequisitesEnum.Id, (data) => {
	  setSocketPlaybackUrl(data);
	});

	return () => {
	  socketClient.leftPlayer(IonicRequisitesEnum.Id);
	  socketClient.unsubscribeOnNewPlaybackUrl(IonicRequisitesEnum.Id);
	};
  }, []);


  useEffect(() => {
	socketClient.joinVisibleWidgets(IonicRequisitesEnum.Id);

	socketClient.subscribeOnNewVisibleWidgets(
	  IonicRequisitesEnum.Id, 
	  (data) => {
		dispatch(setVisibleWidgets(data));
	   }
	);

	return () => {
	  socketClient.leftVisibleWidgets(IonicRequisitesEnum.Id);
	  socketClient.unsubscribeOnNewVisibleWidgets(IonicRequisitesEnum.Id);
	};
  }, []);

  return (
	<IonPage>
	  <IonHeader >
		<IonToolbar color="primary">
		  <div className="header-container-style">
		    <IonIcon size="large" icon={logoYoutube}></IonIcon>
		    <h3 className="stream-header-style">Stream</h3>
		  </div>
		</IonToolbar>
	  </IonHeader>
	  <IonContent color="light" fullscreen>
		{socketPlaybackUrl 
		  ? 
		    <div className="video-container">
			  <AmazonIVSPlayer playbackURL={socketPlaybackUrl || ''} />
			  <div className="cards-container">
			    {visibleWidgets?.map(widget => (
				  <ProductCard key={widget?.id}  widget={widget} />
			    ))}
			  </div>
		    </div>
		  :       
		    <IonText color="danger">
              <h1 style={{ marginTop: 50, textAlign: 'center' }}>Stream is not started</h1>
            </IonText>
	    }
		<StoreButton />
	  </IonContent>
	</IonPage>
  )
};

export default Stream;
