import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { IonButton, IonRouterLink } from '@ionic/react';
import { useDispatch } from 'react-redux';
import { incrementWidget } from '@boilerplate/store';
import { IWidgetProps } from './product-card.types';
import { socketClient } from '../../socket';
import { maxCardHeight, maxCardWidth } from '../../constants/product-card.constants';
import { IonicRequisitesEnum } from '@boilerplate/shared';
import './product-card.styles.css';


const ProductCard: FC<IWidgetProps> = ({ widget }: IWidgetProps) => {
  const dispatch = useDispatch();

  const [isClicked, setIsClicked] = useState<boolean>(false);

  const onCardClickHandler = useCallback(() => {
    setIsClicked(!isClicked);
  }, [isClicked, setIsClicked]);

  const buyProduct = useCallback((e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) => {
    e.stopPropagation();

	  dispatch(incrementWidget(widget));

    socketClient.emitPurchasedWidget(
      IonicRequisitesEnum.Id, 
      widget
    );
  }, [dispatch, widget]);

  useEffect(() => {
    socketClient.joinBuyingWidgets(IonicRequisitesEnum.Id);
  
    return () => {
      socketClient.leftBuyingWidgets(IonicRequisitesEnum.Id);
    };
  }, []);

  const videoContainerNode = document.querySelector('.video-container');

  const videoContainerCoords = useMemo(
    () => videoContainerNode ? videoContainerNode.getBoundingClientRect() : null, 
    [videoContainerNode]
  );

  if (!videoContainerCoords) {
    return null;
  }

  const topCoords = widget?.startY || 0;

  const leftCoords = widget?.startX || 0;

  const top = topCoords > videoContainerCoords?.height - maxCardHeight 
    ? videoContainerCoords?.height - maxCardHeight : topCoords;
    
  const left = leftCoords >= videoContainerCoords?.width - maxCardWidth 
    ? videoContainerCoords?.width - maxCardWidth : topCoords;

  return (
    <div
      style={{ top, left }}
      className={`product-card ${isClicked && `product-card-clicked`}`}
      onClick={onCardClickHandler}
    >
      <h6 style={{ margin: '3px 0' }}>{widget?.title}</h6>
      <p style={{ margin: '2px 0', fontSize: '12px' }}>Price: {widget?.price} $</p>
      {isClicked && (
        <div className="buttons-container">
          <IonButton 
            color="success"
            size="small" 
            slot="end"
            onClick={e => { buyProduct(e); }}
            className="product-card-button" 
          >
            Buy
          </IonButton>
          <IonButton 
            size="small" 
            color="primary" 
            slot="end"
            className="product-card-button" 
          >
            <IonRouterLink 
              target="blank" 
              href={widget?.url}
              color="light"
            >
              Shop
            </IonRouterLink>
          </IonButton>
        </div> 
      )}
    </div>  
  )
};

export default ProductCard;