import React, { Component } from 'react'
import {Layout, Text } from '@ui-kitten/components';
import TopNavigationBarBackButton from '../../components/cores/TopNavigationBarBackButton'
export default class CalendarOverviewScreen extends Component {
    render() {
        return (
            <Layout  style={{paddingTop: 16, paddingBottom: 0 }}>
                <TopNavigationBarBackButton {...this.props} title='Calendar Overview'/>
                <Text category='h1'>Calendar Overview</Text>

              
            </Layout>
        )
    }
}
