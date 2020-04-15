import React, { useState, useEffect, useReducer } from 'react';
import { View, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import axios from 'axios';
import { Layout, Text } from '@ui-kitten/components';
import TopNavigationBar from './TopNavigationBar'
import { FlatList } from 'react-native-gesture-handler';
import TaskItem from '../../components/tasks/TaskItem';
import AddTask from '../../components/tasks/AddTask';
// import axiosConfig from '../../api/axiosConfig';


const FiveDayScreen = (props) => {

    const [todos, setTodos] = useState([
        // { text: 'buy coffee', key: '1' },
        // { text: 'create an app', key: '2' },
        // { text: 'play game', key: '3' }
    ])

    const deleteHandler = (key) => {
        console.log(key)
    }

    async function getTasks () {
        axios.get('https://bigquery-project-medium.df.r.appspot.com/task')
        .then(res=>setTodos(res.data))
        .catch(err=>console.log(err))
        // fetch('localhost:5000/api/employee/')
    }

    useEffect(()=>{
        getTasks()
    },[])

    const submitHandler = (text) => {

        if (text.length > 3) {
            setTodos((prevTodos) => {
                return [
                    { text: text, key: Math.random().toString() },
                    ...prevTodos
                ]
            })
        } else {
            Alert.alert('oops!!', 'Todos must be over 3 characters long', [
                { text: 'Understood', onPress: () => console.log('alert closed') }
            ])
        }
    }

    console.log(todos)
    return (
        <TouchableWithoutFeedback 
            onPress={()=>{
                Keyboard.dismiss()
                console.log('dismiss keyboard')
            }}
        >
            <Layout style={styles.container}>
                <TopNavigationBar {...props} />
                <Text>Five Days List</Text>
                <AddTask submitHandler={submitHandler} />
                <View style={styles.list} >
                    <FlatList
                        data={todos}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => (
                            <TaskItem item={item} deleteHandler={deleteHandler} />
                        )
                        }
                    />
                </View>
            </Layout>
        </TouchableWithoutFeedback>
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
        flex:1,
        padding: 16
    }
})

export default FiveDayScreen