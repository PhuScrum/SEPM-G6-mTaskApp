import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Layout, Text } from '@ui-kitten/components';
import TopNavigationBar from './TopNavigationBar'
import { FlatList } from 'react-native-gesture-handler';
import TaskItem from '../../components/tasks/TaskItem';


const FiveDayScreen = (props) => {

    const [todos, setTodos] = useState([
        { text: 'buy coffee', key: '1' },
        { text: 'create an app', key: '2' },
        { text: 'play game', key: '3' }
    ])

    const pressHandler = (key) => {
        setTodos((prevTodo)=> {
            return prevTodo.filter(todo => todo.key != key)
        })
    }

    console.log(props)
    return (
        <Layout style={styles.container}>
            <TopNavigationBar {...props} />
            <Text>Five Days List</Text>
            <View style={styles.list}>
                <FlatList
                    data={todos}
                    renderItem={({ item }) => (
                        <TaskItem item={item} pressHandler={pressHandler}/>
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