import React, { useCallback } from 'react';
import {
  IonFab, 
  IonFabButton, 
  IonIcon, 
  IonBadge
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { cart } from 'ionicons/icons';
import { RootState } from '@boilerplate/store';
import './store-button.styles.css';


const StoreButton: React.FC = () => {
  const history = useHistory();

  const totalWidgetsQuantity = useSelector(
    (state: RootState) => state.widgetsStoreReducer.totalWidgetsQuantity
  );

  const goToStore = useCallback(() => {
	  history.replace('/store'); 
  }, []);

  return ((
	  <IonFab slot="fixed" vertical="bottom" horizontal="end">
      <div className="badge-container">
		    <IonBadge color="danger" slot="end">
		      {totalWidgetsQuantity}
		    </IonBadge>
	    </div>
      <IonFabButton onClick={goToStore}>
        <IonIcon icon={cart}></IonIcon>
      </IonFabButton>
    </IonFab>
  ));
}

export default StoreButton;
