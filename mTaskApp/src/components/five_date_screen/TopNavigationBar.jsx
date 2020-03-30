import React, { Component } from 'react'
import {
    Icon,
    TopNavigation,
    TopNavigationAction,
  } from '@ui-kitten/components';
  
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
  
  const EditAction = (props) => (
    <TopNavigationAction {...props} icon={CalendarIcon}/>
  );
  
  const MenuAction = (props) => (
    <TopNavigationAction {...props} icon={CheckMarkIcon}/>
  );
  
  const renderRightControls = () => [
    <EditAction/>,
    <MenuAction/>,
  ];  
export default class TopNavigationBar extends Component {
    render() {
        return (
            <TopNavigation
                title='mTask'
                // leftControl={renderLeftControl()}
                rightControls={renderRightControls()}
            />
        )
    }
}
