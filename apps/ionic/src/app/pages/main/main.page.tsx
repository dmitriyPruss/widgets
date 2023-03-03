import React from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { 
  IonLabel, 
  IonRouterOutlet, 
  IonTabBar, 
  IonTabButton, 
  IonTabs 
} from '@ionic/react';
import Stream from '../stream/stream.page';
import Widgets from '../widgets/widgets.page';
import Store from '../store/store.page';


const Main: React.FC = () => {
  const location = useLocation();

  const isStorePage = location.pathname === '/store';

  const tabBarBackground = isStorePage ? 'light' : '';

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/stream" component={Stream} exact={true} />
        <Route path="/widgets" component={Widgets} exact={true} />
        <Route path="/store" component={Store} exact={true} />
        <Route path="/" render={() => <Redirect to="/stream" />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom" color={tabBarBackground}>
        {!isStorePage && 
          <IonTabButton 
            style={{fontSize: '18px', fontWeight: 'bold' }} 
            tab="stream" 
            href="/stream"
          >
            <IonLabel>Stream</IonLabel>
          </IonTabButton>
        }
        {!isStorePage && 
          <IonTabButton 
            style={{fontSize: '18px', fontWeight: 'bold' }} 
            tab="widgets" 
            href="/widgets"
          >
            <IonLabel>Widgets</IonLabel>
          </IonTabButton>
        }
      </IonTabBar>
    </IonTabs>
  )
};

export default Main;