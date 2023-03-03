import React, { useCallback } from 'react';
import { 
  IonButton, 
  IonContent, 
  IonHeader, 
  IonList, 
  IonItem, 
  IonText, 
  IonPage,
  IonToolbar, 
  IonIcon, 
  IonFab, 
  IonFabButton 
} from '@ionic/react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { 
  arrowBack, 
  addCircleOutline,
  cart, 
  removeCircleOutline 
} from 'ionicons/icons';
import { WidgetInStoreDto } from '@boilerplate/shared';
import { 
  decrementWidget, 
  incrementWidget, 
  RootState 
} from '@boilerplate/store';
import './store.styles.css';


const Store: React.FC = () => {
  const widgetsInStore = useSelector(
	(state: RootState) => state.widgetsStoreReducer.widgetsInStore
  );
	
  const dispatch = useDispatch();

  const history = useHistory();

  const backToWidgets = useCallback(() => { history.replace('/widgets'); }, []);

  return (
	<IonPage>
	  <IonHeader>
	    <IonToolbar color="primary">
		  <div className="icon-header-style">
			<IonIcon size="large" icon={cart}></IonIcon>		
			<h3 className="store-header-style">Store</h3>
		  </div>
		</IonToolbar>
	  </IonHeader>
	  <IonContent color='light' fullscreen>
	    {!widgetsInStore?.length && 			    
		  <IonText color="danger">
            <h1 style={{ marginTop: 50, textAlign: 'center' }}>The Store is empty</h1>
          </IonText>
		}
		<IonList>
		  {widgetsInStore?.map((widget: WidgetInStoreDto) => (
			widget.quantity > 0 
			  ? (
				  <IonItem key={widget.id}>
					<IonText color="dark">
					  <h5>{widget.title}</h5>
					</IonText>
					<IonButton 
					  color="danger"
					  size="default" 
					  slot="end" 
					  onClick={() => dispatch(decrementWidget(widget))}
					>
					  <IonIcon size="large" icon={removeCircleOutline}></IonIcon>
					</IonButton>
					<IonText slot='end'>
					  <div className="widgets-quantity">{widget.quantity}</div>
					</IonText>
					<IonButton 
					  size="default" 
					  color="success" 
					  slot="end" 
					  onClick={() => dispatch(incrementWidget(widget))}
					>
					  <IonIcon size='large' icon={addCircleOutline}></IonIcon>
					</IonButton>
				  </IonItem>
			    ) 
			  : null
		  ))}
		  <div className="content-background"></div>
		</IonList>
		<IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton onClick={backToWidgets}>
		    <div className="button-content">
		  	  <IonText color="light">
              	<span style={{ fontWeight: 'bold' }}>Back</span>
              </IonText>
              <IonIcon icon={arrowBack}></IonIcon>
		  	</div>
          </IonFabButton>
        </IonFab>
	  </IonContent>
	</IonPage>	   
  )
};

export default Store;
