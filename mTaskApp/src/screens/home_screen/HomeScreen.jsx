import React, { Component } from 'react'
import FiveDayScreen from '../five_date/FiveDayScreen'
import CalendarOverviewScreen from '../calendar_overview/CalendarOverviewScreen'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default class HomeScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            openCalendar: false
        }
        this.openCalendar = this.openCalendar.bind(this)
    }
    openCalendar(){
        const {openCalendar} = this.state
        this.setState({openCalendar: !openCalendar})
    }

    render() {
        const {openCalendar} = this.state
        
       
            return (
                
                <Stack.Navigator headerMode='none' initialRouteName="Home">
                    <Stack.Screen name="Home" component={FiveDayScreen} />
                    <Stack.Screen name="CalendarOverview" component={CalendarOverviewScreen} />
                </Stack.Navigator>
            )
       
        
    }
}
