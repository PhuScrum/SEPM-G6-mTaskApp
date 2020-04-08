import React, { Component, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Layout, Text } from '@ui-kitten/components';
import TopNavigationBar from './TopNavigationBar'
import { FlatList } from 'react-native-gesture-handler';

const FiveDayScreen = (props) => {

    const [todos, setTodos] = useState([
        { text: 'buy coffee', key: '1' },
        { text: 'create an app', key: '2' },
        { text: 'play game', key: '3' }
    ])

    console.log(props)
    return (
        <Layout style={styles.container}>
            <TopNavigationBar {...props} />
            <Text>Five Days List</Text>
            <View style={styles.list}>
                <FlatList
                    data={todos}
                    renderItem={({ item }) => (
                        <Text>{item.text}</Text>
                    )

                    }
                />
            </View>
        </Layout>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 16,
        paddingBottom: 0
    },
    list: {
        padding: 16
    }
})

export default FiveDayScreen