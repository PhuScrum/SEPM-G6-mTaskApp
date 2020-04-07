import React, { Component } from 'react'
import {Layout, Text } from '@ui-kitten/components';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import {
    StyleSheet,
    View,
  } from 'react-native';
import TopNavigationBarBackButton from '../../components/cores/TopNavigationBarBackButton'
import CalendarOverview from '../../components/calendar/Calendar'
export default class CalendarOverviewScreen extends Component {
    render() {
        return (
            <Layout  style={styles.screen}>
                <TopNavigationBarBackButton {...this.props} title='Calendar Overview'/>
                <Layout style={styles.calendar}>
                <CalendarOverview style={{height: 100}}/>
                <Text>{}</Text>
                </Layout>

              
            </Layout>
        )
    }
}
const styles = StyleSheet.create({
    screen: {
      paddingTop: 16, 
      flex: 1

    },
    calendar: {
    //   flexDirection: 'column',
    //   alignItems: 'stretch',
    //   justifyContent: 'center',
    //   flex: 1,
    

    },
  });