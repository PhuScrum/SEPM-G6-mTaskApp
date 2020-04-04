import React, { Component } from 'react'
import {Layout, Text } from '@ui-kitten/components';
import TopNavigationBarBackButton from '../../components/cores/TopNavigationBarBackButton'
export default class DoneListScreen extends Component {
    render() {
        return (
            <Layout  style={{paddingTop: 16, paddingBottom: 0 }}>
                <TopNavigationBarBackButton {...this.props} title='Done List'/>
                <Text category='h1'>Done</Text>

              
            </Layout>
        )
    }
}