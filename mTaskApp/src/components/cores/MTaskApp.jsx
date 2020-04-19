import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import BottomNavBar from './BottomNavBar'
import Login from '../../screens/loginPage/Login'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default class MTaskApp extends Component {
    render() {
        const isLogged = true
        const mainApp = 'MainApp'
        const login = 'Login'
        return (
            <Stack.Navigator headerMode='none' initialRouteName='MainApp' >
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="MainApp" component={BottomNavBar} />
             </Stack.Navigator>
            // <BottomNavBar/>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });