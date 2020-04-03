import React from 'react';
import MTaskApp from './src/components/cores/MTaskApp'
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <React.Fragment>
    
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <NavigationContainer>
    <MTaskApp/>
    </NavigationContainer>
    </ApplicationProvider>
    </React.Fragment>

  );
}