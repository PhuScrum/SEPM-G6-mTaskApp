import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { GET_TASKS } from '../../actions/types'
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
import { BottomSheet } from 'react-native-btr';

import axios from 'axios';
import { Layout, Text } from '@ui-kitten/components';
import TopNavigationBar from './TopNavigationBar'
import { FlatList, ScrollView, } from 'react-native-gesture-handler';
import TaskItem from '../../components/tasks/TaskItem';
import AddTask from '../../components/tasks/AddTask';

import { getTasksAction } from '../../actions/TaskAction'

import AddToDoButton from '../../components/tasks/AddTaskButton';
// import axiosConfig from '../../api/axiosConfig';

// const initialState = {
//     todos:[]
// }

// const reducer = (state, action) => {
//     switch(action.type){
//         case GET_TASKS:
//             return {...state, todos: action.payload}
//         default:
//             return state
//     }
// }

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const FiveDayScreen = (props) => {
    // const [todos, setTodos] = useState([])
    const tasks = useSelector(state => state.taskReducer.tasks);
    const dispatch = useDispatch();
    const getTasks = () => {
        dispatch(getTasksAction())
    }
    console.log(tasks)

    const [bottomSheetShow, setBottomSheetShow] = useState(false);
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(1500).then(() => setRefreshing(false));
    }, [refreshing]);

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

                {/* <AddTask submitHandler={submitHandler} /> */}
                <SafeAreaView style={styles.list} >
                    <FlatList
                        data={tasks}
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
                {!bottomSheetShow && (<AddToDoButton toggleBottomSheet={() => setBottomSheetShow(true)} />)}
                <BottomSheet
                    visible={bottomSheetShow}
                    onBackButtonPress={() => setBottomSheetShow(!bottomSheetShow)}
                    onBackdropPress={() => setBottomSheetShow(!bottomSheetShow)}
                >
                    <View style={styles.bottomNavigationView}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}>
                            <Text style={{ textAlign: 'center', padding: 20, fontSize: 20 }}>
                                Add Task
                            </Text>
                        </View>
                    </View>
                </BottomSheet>
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

    bottomNavigationView: {
        backgroundColor: '#fff',
        width: '100%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default FiveDayScreen