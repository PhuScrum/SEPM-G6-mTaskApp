import React, { useState, useEffect, useCallback, createRef, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
    View,
    StyleSheet,
    Alert,
    TouchableWithoutFeedback,
    Keyboard,
    SafeAreaView,
    RefreshControl,
    ActivityIndicator,
    TouchableHighlight,
    TouchableOpacity,
    Dimensions,
    TextInput,
    SectionList,
    AsyncStorage
} from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { Layout, Text, Icon } from '@ui-kitten/components';
import TopNavigationBar from './TopNavigationBar'
import TaskItem from '../../components/tasks/TaskItem';
import AddTask from '../../components/tasks/AddTask';
import AddToDoButton from '../../components/tasks/AddTaskButton';
import { withNavigation } from 'react-navigation';

import FAIcon from "react-native-vector-icons/FontAwesome";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import RBSheet from "react-native-raw-bottom-sheet";

import _ from 'lodash'
import moment from 'moment-timezone'

import { getTasksAction, deleteTaskAction, addTaskAction, editTaskAction, getMyTasksAction, getTaskItemAction, clearTaskItemAction } from '../../actions/TaskAction'
import { clearSelectedAction } from '../../actions/tag-members-actions';
import TestPush from '../../components/push_notification/TestPush'
import sendPushNotification from '../../components/push_notification/API/send-push-notification'
import setLocalNotification from '../../components/push_notification/API/set-local-notification'
import { Notifications } from 'expo'
FAIcon.loadFont();
MDIcon.loadFont();

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

function between(x, min, max) {
    return x >= min && x <= max;
}

const getSections = (tasks) => {
    const tmrDay = moment().add(1, 'days').format('Do MMMM YYYY')
    const twoDay = moment().add(2, 'days').format('Do MMMM YYYY')
    const threeDay = moment().add(3, 'days').format('Do MMMM YYYY')
    const fourDay = moment().add(4, 'days').format('Do MMMM YYYY')
    const fiveDay = moment().add(5, 'days').format('Do MMMM YYYY')

    //Devide Data
    const todayData = tasks.filter(task => moment(task.dateTime).format('Do MMMM YYYY') === moment().format('Do MMMM YYYY'))
    const tmrData = tasks.filter(task => moment(task.dateTime).format('Do MMMM YYYY') === tmrDay)
    const twodayData = tasks.filter(task => moment(task.dateTime).format('Do MMMM YYYY') === twoDay)
    const threeDayData = tasks.filter(task => moment(task.dateTime).format('Do MMMM YYYY') === threeDay)
    const fourDayData = tasks.filter(task => moment(task.dateTime).format('Do MMMM YYYY') === fourDay)
    const fiveDayData = tasks.filter(task => moment(task.dateTime).format('Do MMMM YYYY') === fiveDay)

    //Define Section
    const sectionsList = [
        { title: 'Today', data: todayData },
        { title: 'Tomorrow', data: tmrData },
        { title: `${twoDay}`, data: twodayData },
        { title: `${threeDay}`, data: threeDayData },
        { title: `${fourDay}`, data: fourDayData },
        { title: `${fiveDay}`, data: fiveDayData }
    ]
    const sections = sectionsList.filter(section => section.data.length !== 0)
    return sections
}

const FiveDayScreen = (props) => {
    const [isLoading, setLoading] = useState(true);
    const scrollRef = createRef()
    const refBottomSheet = useRef();
    const tasks = useSelector(state => state.taskReducer.tasks, [tasks]);
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getMyTasks()
        setRefreshing(false)

    }, [refreshing]);

    const deleteHandler = async (id) => {
        await dispatch(deleteTaskAction(id))
        onRefresh()
    }

    const editTaskHandler = async (id, data) => {
        await dispatch(editTaskAction(id, data))
        onRefresh()
    }

    const handlePushNoti = (taskObj) => {
        var taggedUsers = taskObj.taggedUsers
        if (taggedUsers.length >= 1) {
            for (let i = 0; i < taggedUsers.length; i++) {
                var userObj = taggedUsers[i]
                var expoPushToken = userObj.expoPushToken
                sendPushNotification(userObj, taskObj)
            }
        }
    }

    const addTaskHandler = (taskObj) => {
        console.log('addTAskHandler: ', taskObj)
        handlePushNoti(taskObj)
        setLocalNotification(taskObj.name, 'Click here to view more', taskObj.dateTime)
        if (taskObj.name.length > 3) {
            dispatch(addTaskAction(taskObj))
            onRefresh()
            refBottomSheet.current.close()
        } else {
            Alert.alert('Warning!!!', 'Todos must be over 3 characters long', [
                { text: 'Understood' }
            ])
        }
    }

    const onNavigateDetail = (id) => {
        dispatch(getTaskItemAction(id))
            .then(() => props.navigation.navigate('TaskDetail'))
    }

    const getMyTasks = async () => {
        let id = await AsyncStorage.getItem('userId')
        console.log(id)
        dispatch(getMyTasksAction(id))
    }

    // useEffect(() => {
    //     const unsubscribe = props.navigation.addListener('focus', async () => {
    //         await getMyTasks()
    //         setLoading(false)
    //     })
    //     return unsubscribe
    // }, [props.navigation])
    useEffect(() => {
        getMyTasks()
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [])

    // console.log(userId)

    //Define Swipeable Section Elements

    // console.log(myTasks)
    const unDoneList = tasks.filter(task => task.completed !== true)
    const sections = getSections(unDoneList)
    const renderItem = ({ item, index }) => (
        <TaskItem
            item={item}
            index={index}
            deleteHandler={deleteHandler}
            editTaskHandler={editTaskHandler}
            onNavigateDetail={onNavigateDetail}
        />
    )
    const renderSectionHeader = ({ section }) => <Text style={styles.SectionHeaderStyle}>{section.title}</Text>
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss()
                onRefresh()
            }}
        >
            <>
                <TopNavigationBar {...props} />

                <Layout style={styles.container} >
                    <View style={styles.list} >
                        <Text style={styles.title}>Five Days List</Text>
                        {/* <TestPush/> */}
                        {isLoading ? <ActivityIndicator /> : (
                            <SectionList
                                stickySectionHeadersEnabled={false}
                                ref={scrollRef}
                                sections={sections}
                                renderSectionHeader={renderSectionHeader}
                                renderItem={renderItem}
                                keyExtractor={item => item._id}
                                refreshControl={
                                    <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
                                }
                            />
                        )}
                    </View>
                    {/* {!bottomSheetShow && (<AddToDoButton toggleBottomSheet={() => Input.open()} />)} */}
                    <AddToDoButton toggleBottomSheet={() => {
                        refBottomSheet.current.open()
                    }
                    } />
                    <RBSheet
                        ref={refBottomSheet}
                        closeOnDragDown
                        height={500}
                        customStyles={{
                            container: {
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10
                            }
                        }}
                    >
                        <View style={styles.bottomSheetContainer}>
                            <Text style={styles.bottomSheetTitle}>Create a new task</Text>
                            <AddTask submitHandler={addTaskHandler} />
                        </View>
                    </RBSheet>
                </Layout>
            </>

        </TouchableWithoutFeedback>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "center",
        justifyContent: 'center',
        backgroundColor: '#EDF1F7',
        // marginTop: 20,
        paddingBottom: 0
    },
    title: {
        fontFamily: 'Lato-Regular',
        fontSize: 36,
        paddingTop: 32,
        color: '#1E262C'
    },
    list: {
        flex: 1,
        padding: 5
    },
    SectionHeaderStyle: {
        paddingTop: 20,
        // backgroundColor: '#CDDC89',
        fontSize: 20,
        padding: 5,
        color: 'black',
        paddingBottom: 2
    },
    bottomSheetContainer: {
        flex: 1,
        padding: 15
    },
    bottomSheetTitle: {
        fontFamily: 'Lato-Regular',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 20,
        color: "#666",
        alignSelf: 'center'
    }
})

export default withNavigation(FiveDayScreen)

