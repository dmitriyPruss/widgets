import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WidgetDto, WidgetInStoreDto } from '@boilerplate/shared';

export interface WidgetsStoreState {
  totalWidgetsQuantity: number,
  widgets: WidgetDto[],
  visibleWidgets: WidgetDto[],
  widgetsInStore: WidgetInStoreDto[]
}

const initialState: WidgetsStoreState = {
  totalWidgetsQuantity: 0,
  widgets: [],
  visibleWidgets: [],
  widgetsInStore: []
}

export const widgetsStoreSlice = createSlice({
  name: 'widgets-store',
  initialState,
  reducers: {
    increment: (state) => {
      state.totalWidgetsQuantity += 1
    },
    decrement: (state) => {
      state.totalWidgetsQuantity -= 1
    },
    setWidgets: (state, action: PayloadAction<WidgetDto[]>) => {
      state.widgets = action.payload;
    },
    setVisibleWidgets: (state, action: PayloadAction<WidgetDto[]>) => {
      state.visibleWidgets = action.payload;
    },
    incrementWidget: (state, action: PayloadAction<WidgetDto>) => {
      state.totalWidgetsQuantity = state.totalWidgetsQuantity > 100 
        ? 100 : state.totalWidgetsQuantity + 1;

      const foundWidget = state.widgetsInStore.find(widget => widget.id === action.payload?.id);

      if (!foundWidget) {
        const newWidget: WidgetInStoreDto = { ...action.payload, quantity: 1 };

        state.widgetsInStore = [...state.widgetsInStore, newWidget];

        return;
      }

      const newQuantity = foundWidget?.quantity + 1;

      const updatedWidget = { ...foundWidget, quantity: newQuantity};

      const newWidgets = state.widgetsInStore;

      const updatedWidgets = newWidgets?.map(widget => {
        if(widget.id === updatedWidget.id) {
          widget.quantity = updatedWidget.quantity;
        }

        return widget;
      });

      state.widgetsInStore = [...updatedWidgets];
    },
    decrementWidget: (state, action: PayloadAction<WidgetDto>) => {
      state.totalWidgetsQuantity = state.totalWidgetsQuantity <= 0 
        ? 0 : state.totalWidgetsQuantity - 1;

      const foundWidget = state.widgetsInStore.find(widget => widget.id === action.payload.id);
      
      if (!foundWidget) {
        return;
      }

      const newQuantity = foundWidget?.quantity <= 0 ? 0 : foundWidget?.quantity - 1;

      const updatedWidget = { ...foundWidget, quantity: newQuantity };

      const newWidgets = state.widgetsInStore;

      if (updatedWidget?.quantity <= 0) {
        const filteredWidgets = newWidgets?.filter(
          widget => widget.id !== foundWidget.id
        );

        state.widgetsInStore = [...filteredWidgets];

        return;
      }

      const updatedWidgets = newWidgets?.map(widget => {
        if(widget.id === updatedWidget.id) {
          widget.quantity = updatedWidget.quantity
        }

        return widget;
      });

      state.widgetsInStore = [...updatedWidgets];
    }
  }
});

export const { 
  increment, 
  decrement, 
  incrementWidget, 
  decrementWidget,
  setWidgets,
  setVisibleWidgets 
} = widgetsStoreSlice.actions;

export default widgetsStoreSlice.reducer;