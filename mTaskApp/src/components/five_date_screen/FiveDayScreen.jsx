import React, { Component } from 'react'
import {View} from 'react-native'
import {Layout, Text } from '@ui-kitten/components';
import TopNavigationBar from './TopNavigationBar'
export default class FiveDayScreen extends Component {
    render() {
        return (   
            
            <Layout  style={{paddingTop: 16 }}>
                <TopNavigationBar/>
                
                <Text category='h1'>Today</Text>

              
            </Layout>
                
            
        )
    }
}
