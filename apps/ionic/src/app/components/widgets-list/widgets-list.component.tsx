import React, { useCallback } from 'react';
import { 
  IonList, 
  IonItem, 
  IonText, 
  IonButton,
  IonRouterLink
} from '@ionic/react';
import { useDispatch } from 'react-redux';
import { incrementWidget } from '@boilerplate/store';
import { WidgetDto } from '@boilerplate/shared';
import { IWidgetsListProps } from './widgets-list.types';
import './widgets-list.styles.css';


const WidgetsList: React.FC<IWidgetsListProps> = ({ widgets }: IWidgetsListProps) => {
  const dispatch = useDispatch();

  const buyWidget = useCallback((widget: WidgetDto) => {
	  dispatch(incrementWidget(widget));
  }, [dispatch]);

  return (
    <IonList>
      {widgets?.map((widget: WidgetDto) => (
        <IonItem key={widget.id}>
          <IonText color="dark">
            <h5>{widget.title}</h5>
          </IonText>
          <IonButton 
            color="success"
            size="default" 
            slot="end" 
            onClick={() => { buyWidget(widget); }}
          >
            Buy
          </IonButton>
          <IonButton size="default" color="primary" slot="end">
            <IonRouterLink 
              target="blank" 
              href={widget?.url} 
              color="light"
            >
              Shop
            </IonRouterLink>
          </IonButton>
        </IonItem>
      ))}
      <div className='widgets-list-background'></div>
    </IonList>
  );
}

export default WidgetsList;
