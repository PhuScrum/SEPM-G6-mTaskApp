import React, { Component } from 'react'
import {View, StyleSheet } from 'react-native'
import { Layout, Text, Icon } from '@ui-kitten/components';
import TopNavigationBar from '../five_date/TopNavigationBar'
import { useSelector, useDispatch } from 'react-redux'

const TaskDetail =(props)=> {
    const task = useSelector(state => state.taskReducer.taskItem,[]);
    console.log(task)

    return (
        <>
        <TopNavigationBar {...props} />
        <Layout style={styles.container} >
            <Text> Task Detail </Text>
        </Layout>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        // alignItems: "center",
        // justifyContent: 'center',
        backgroundColor: '#EDF1F7',
        marginTop: 20,
        paddingBottom: 0
    },
})


export default TaskDetail
