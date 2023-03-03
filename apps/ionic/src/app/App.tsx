import React, { useEffect } from 'react';
import { setupIonicReact, IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { socketClient } from './socket';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './App.css';
import Main from './pages/main/main.page';


setupIonicReact({
  mode: 'md'
});

const App: React.FC = () => {
  useEffect(() => {
		socketClient.connect();

		return () => {
			socketClient.disconnect();
		};
  }, []);

  return (  
    <IonApp>
      <IonReactRouter>
        <Main />
      </IonReactRouter>
    </IonApp>
  );
} 


export default App;