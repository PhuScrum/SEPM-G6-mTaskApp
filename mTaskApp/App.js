import React from 'react';
import MTaskApp from './src/components/cores/MTaskApp'
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import rootReducer from './src/reducers/root-reducer';

// initialState
const initialState = {}

//define middleware
const middleware = [thunk]

        // Create store
const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware)));
export default function App() {
  return (
    <React.Fragment>
    
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <NavigationContainer>
    <Provider store={store}>
    <MTaskApp/>
    </Provider>
    </NavigationContainer>
    </ApplicationProvider>
    </React.Fragment>

  );
}