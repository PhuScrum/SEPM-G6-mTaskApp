import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import BottomNavBar from './BottomNavBar'
export default class MTaskApp extends Component {
    render() {
        return (
            
            <BottomNavBar/>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });