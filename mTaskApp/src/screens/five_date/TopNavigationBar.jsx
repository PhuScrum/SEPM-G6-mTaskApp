import React, { Component } from 'react'
import {
    Icon,
    TopNavigation,
    TopNavigationAction,
  } from '@ui-kitten/components';
import CalendarOverviewScreen from '../calendar_overview/CalendarOverviewScreen'
  
  const BackIcon = (style) => (
    <Icon {...style} name='arrow-back'/>
  );
  
  const CalendarIcon = (style) => (
    <Icon {...style} name='calendar-outline'/>
  );
  
  const CheckMarkIcon = (style) => (
    <Icon {...style} name='checkmark-circle-outline'/>
  );
  
  const BackAction = (props) => (
    <TopNavigationAction {...props} icon={BackIcon}/>
  );
  
  const CalendarAction = (props) => (
    <TopNavigationAction {...props} icon={CalendarIcon}/>
  );
  
  const CheckMarkAction = (props) => (
    <TopNavigationAction {...props} icon={CheckMarkIcon}/>
  );
  
  


export default class TopNavigationBar extends Component {
    constructor(props){
      super(props)
      this.state={
        openCalendar: false,
        openCheckMark: false,
      }
    }


    render() {
      const renderRightControls = () => [
        <CalendarAction onPress={this.props.navigation.navigate('CalendarOverview')}/>,
        <CheckMarkAction/>,
      ];  
        return (
            <TopNavigation
                title='mTask'
                // leftControl={renderLeftControl()}
                rightControls={renderRightControls()}
            />
        )
    }
}
