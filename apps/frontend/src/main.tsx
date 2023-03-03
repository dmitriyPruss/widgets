import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import ModalProvider from 'mui-modal-provider';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { RootThemeProvider } from './RootThemeProvider';
import Root from './root';
import { store } from '@boilerplate/store';


ReactDOM.render(
	<StrictMode>
    <Provider store={store} >
      <RootThemeProvider>
        <BrowserRouter>
          <ModalProvider>
            <SnackbarProvider
              maxSnack={1}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
            >
              <DndProvider backend={HTML5Backend}>
                <CssBaseline />
                <Root />
              </DndProvider>
            </SnackbarProvider>
          </ModalProvider>
        </BrowserRouter>
      </RootThemeProvider>
    </Provider>
	</StrictMode>,
	document.getElementById('root')
);
