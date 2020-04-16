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

class TopNavigationBar extends Component {
  constructor(props, navigation) {
    super(props, navigation)
  }
  navigateCalendar() {
    // this.props.navigation.navigate('CalendarOverview')
  }
  render() {
    const renderRightControls = () => [
      <CalendarAction onPress={() => { this.props.navigation.navigate('CalendarOverview') }} />,
      <CheckMarkAction />,
    ];
    return (
      <TopNavigation
        title='mTask'
        rightControls={renderRightControls()}
      />
    )
  }
}
export default withNavigation(TopNavigationBar)