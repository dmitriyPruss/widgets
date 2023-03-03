import React, { useEffect } from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonIcon, 
  IonPage, 
  IonText, 
  IonToolbar 
} from '@ionic/react';
import { phonePortraitOutline } from 'ionicons/icons';
import { useDispatch, useSelector } from 'react-redux';
import { IonicRequisitesEnum } from '@boilerplate/shared';
import { RootState, setWidgets } from '@boilerplate/store';
import WidgetsList from '../../components/widgets-list/widgets-list.component';
import StoreButton from '../../components/store-button/store-button.component';
import { socketClient } from '../../socket';
import './widgets.styles.css';


const Widgets: React.FC = () => {
  const widgets = useSelector((state: RootState) => state.widgetsStoreReducer.widgets);

  const dispatch = useDispatch();

  useEffect(() => {
	socketClient.joinWidgets(IonicRequisitesEnum.Id);

	socketClient.subscribeOnNewWidgets(IonicRequisitesEnum.Id, (data) => {
	  dispatch(setWidgets(data));
	});

	return () => {
	  socketClient.leftWidgets(IonicRequisitesEnum.Id);
	  socketClient.unsubscribeOnNewWidgets(IonicRequisitesEnum.Id);
	};
  }, []);

  return ((
	<IonPage>
	  <IonHeader className="ion-no-border">
	    <IonToolbar color="primary">
		  <div className="header-content-style">
		    <IonIcon size="large" icon={phonePortraitOutline}></IonIcon>
		    <h3 className="widgets-header-style">Widgets</h3>		
		  </div>
	    </IonToolbar>
	  </IonHeader>
	  <IonContent color="light" fullscreen>
	    {!widgets?.length && 			    
		  <IonText color="danger">
            <h1 style={{ marginTop: 50, textAlign: 'center' }}>No widgets to display</h1>
          </IonText>
		}
	    <WidgetsList widgets={widgets} />	 
	    <StoreButton />
	  </IonContent>
	</IonPage>
  ))
}

export default Widgets;
