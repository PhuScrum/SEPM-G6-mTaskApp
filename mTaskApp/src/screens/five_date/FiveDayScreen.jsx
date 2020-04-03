import React, { Component } from 'react'
import {View} from 'react-native'
import {Layout, Text } from '@ui-kitten/components';
import TopNavigationBar from './TopNavigationBar'
export default class FiveDayScreen extends Component {
    constructor(props){
        super(props)
     

    }
    render() {
        return (   
            <Layout  style={{paddingTop: 16, paddingBottom: 0 }}>
                <TopNavigationBar {...this.props} />
              
            </Layout>
        )
    }
}
