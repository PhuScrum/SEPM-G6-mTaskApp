import React, { Component } from 'react'
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { withNavigation } from 'react-navigation';

const BackIcon = (style) => (
  <Icon {...style} name='arrow-back' />
);

const CalendarIcon = (style) => (
  <Icon {...style} name='calendar-outline' />
);

const CheckMarkIcon = (style) => (
  <Icon {...style} name='checkmark-circle-outline' />
);

const BackAction = (props) => (
  <TopNavigationAction {...props} icon={BackIcon} />
);

const CalendarAction = (props) => (
  <TopNavigationAction {...props} icon={CalendarIcon} />
);

const CheckMarkAction = (props) => (
  <TopNavigationAction {...props} icon={CheckMarkIcon} />
);

const TopNavigationBar = ({ navigation, route, withBackControl }) => {
  // console.log(props)
  const renderRightControls = () => [
    <CalendarAction onPress={() => { navigation.navigate('CalendarOverview') }} />,
    <CheckMarkAction onPress={() => { navigation.navigate('DoneListOverview') }} />,
  ];
  const renderBackControls = () => [
    <BackAction
      onPress={() => {
        navigation.goBack()
      }}
    />
  ]
  return withBackControl ? (<TopNavigation
    title='mTask'
    rightControls={renderRightControls()}
    leftControl={renderBackControls()}
  />) : (
      <TopNavigation
        title='mTask'
        rightControls={renderRightControls()}
      />
    )
}

export default withNavigation(TopNavigationBar)