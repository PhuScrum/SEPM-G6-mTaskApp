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

const CheckMarkIcon = (style) => (
  <Icon {...style} name='checkmark-circle-outline' />
);

const BackAction = (props) => (
  <TopNavigationAction {...props} icon={BackIcon} />
);

const CheckMarkAction = (props) => (
  <TopNavigationAction {...props} icon={CheckMarkIcon} />
);

const TopNavigationBarList = ({ navigation, route, withBackControl, isDisplayDoneButton, onNavigateDoneDetail }) => {
  const renderRightControls = () => {
    return isDisplayDoneButton ? [
      <CheckMarkAction onPress={() => { 
        onNavigateDoneDetail()
      }} />
    ] : []
  }
  const renderBackControls = () => [
    <BackAction
      onPress={() => {
        navigation.goBack()
      }}
    />
  ]
  return withBackControl ? (<TopNavigation
    title='Back'
    rightControls={renderRightControls()}
    leftControl={renderBackControls()}
  />) : (
      <TopNavigation
        title='mTask'
        rightControls={renderRightControls()}
      />
    )
}

export default withNavigation(TopNavigationBarList)