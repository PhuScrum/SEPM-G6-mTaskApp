import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from './ListScreen';
import ListDetail from './ListDetail';

const Stack = createStackNavigator();

export default class ListScreenStack extends Component {
    render() {
        return (
            <Stack.Navigator headerMode='none' initialRouteName='Home'>
                <Stack.Screen name="Home" component={ListScreen}/>
                <Stack.Screen name="ListDetail" component={ListDetail}/>
            </Stack.Navigator>
        )
    }
}
