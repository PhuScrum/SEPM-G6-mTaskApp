import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {GET_TASKS} from '../../actions/types'
import {
    View,
    StyleSheet,
    Alert,
    TouchableWithoutFeedback,
    Keyboard,
    SafeAreaView,
    RefreshControl,
    Modal,
    TouchableHighlight
} from 'react-native';

import axios from 'axios';
import { Layout, Text } from '@ui-kitten/components';
import TopNavigationBar from './TopNavigationBar'
import { FlatList, ScrollView, } from 'react-native-gesture-handler';
import TaskItem from '../../components/tasks/TaskItem';
import AddTask from '../../components/tasks/AddTask';
// import axiosConfig from '../../api/axiosConfig';

const initialState = {
    todos:[]
}

const reducer = (state, action) => {
    switch(action.type){
        case GET_TASKS:
            return {...state, todos: action.payload}
        default:
            return state
    }
}


function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}


const FiveDayScreen = (props) => {
    // const [todos, setTodos] = useState([])
    
    const [state, dispatch] = useReducer(reducer, initialState)
    const {todos} = state

    const [modalVisible, setModalVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        wait(1500).then(() => setRefreshing(false));
    }, [refreshing]);

    const getTasks = async ()  =>{
        const res = await axios.get('https://bigquery-project-medium.df.r.appspot.com/task/') 
        dispatch({
            type: GET_TASKS,
            payload: res.data
        })
    }


    const deleteHandler = (id) => {
        async function deleteTask(key) {
            axios.delete(`https://bigquery-project-medium.df.r.appspot.com/task/${key}`)
                .then(res => {
                    console.log(`Deleted id: ${key}`)
                    getTasks()
                })
                .catch(err => console.log(err))
        }
        deleteTask(id)

    }

    // async function getTasks() {
    //     axios.get('https://bigquery-project-medium.df.r.appspot.com/task')
    //         .then(res => setTodos(res.data))
    //         .catch(err => console.log(err))
    //     // fetch('localhost:5000/api/employee/')
    // }

    useEffect(() => {
        getTasks()
    }, [])

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

    return (

        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss()
                console.log('dismiss keyboard')
            }}
        >
            <Layout style={styles.container} >
                <TopNavigationBar {...props} />
                <Text style={{ alignSelf: "center" }}>Five Days List</Text>

                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Add Task</Text>

                                <AddTask submitHandler={submitHandler} />

                                <TouchableHighlight
                                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                    onPress={() => {
                                        setModalVisible(!modalVisible);
                                    }}
                                >
                                    <Text style={styles.textStyle}>Hide Modal</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>

                    <TouchableHighlight
                        style={styles.openButton}
                        onPress={() => {
                            setModalVisible(true);
                        }}
                    >
                        <Text style={styles.textStyle}>Show Modal</Text>
                    </TouchableHighlight>
                </View>
                {/* <AddTask submitHandler={submitHandler} /> */}
                <SafeAreaView style={styles.list} >
                    <FlatList
                        data={todos}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => (
                            <TaskItem item={item} deleteHandler={deleteHandler} />
                        )
                        }
                        refreshControl={
                            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
                        }
                    />
                </SafeAreaView>
            </Layout>

        </TouchableWithoutFeedback>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "center",
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingTop: 16,
        paddingBottom: 0
    },
    list: {
        flex: 1,
        padding: 16
    },
    centerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22

    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})

export default FiveDayScreen