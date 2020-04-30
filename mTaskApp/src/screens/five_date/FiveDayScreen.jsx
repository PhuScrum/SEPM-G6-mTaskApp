import React, { useState, useEffect, useCallback, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
    View,
    StyleSheet,
    Alert,
    TouchableWithoutFeedback,
    Keyboard,
    SafeAreaView,
    RefreshControl,
    TouchableHighlight,
    TouchableOpacity,
    Dimensions,
    TextInput,
    SectionList
} from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { BottomSheet } from 'react-native-btr';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Layout, Text, Icon } from '@ui-kitten/components';
import TopNavigationBar from './TopNavigationBar'
import TaskItem from '../../components/tasks/TaskItem';
import AddTask from '../../components/tasks/AddTask';
import AddToDoButton from '../../components/tasks/AddTaskButton';
import BottomSheetComponent from '../../components/bottomSheet';
import FAIcon from "react-native-vector-icons/FontAwesome";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import RBSheet from "react-native-raw-bottom-sheet";

import _ from 'lodash'
import moment from 'moment-timezone'

import { getTasksAction, deleteTaskAction, addTaskAction, editTaskAction } from '../../actions/TaskAction'

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
    const scrollRef = createRef()
    const tasks = useSelector(state => state.taskReducer.tasks);
    const dispatch = useDispatch();
    const [bottomSheetShow, setBottomSheetShow] = useState(false);
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => {
            getTasks()
            setRefreshing(false)
        });
    }, [refreshing]);

    const getTasks = () => {
        dispatch(getTasksAction())
    }
    // console.log(tasks)

    const deleteHandler = (id) => {
        dispatch(deleteTaskAction(id))
    }

    const editTaskHandler = (id, data) => {
        dispatch(editTaskAction(id, data))
        onRefresh()
    }

    const addTaskHandler = (data) => {
        if (data.name.length > 3) {
            dispatch(addTaskAction(data))
            onRefresh()
            setBottomSheetShow(false)
            Input.close()
        } else {
            Alert.alert('Warning!!!', 'Todos must be over 3 characters long', [
                { text: 'Understood' }
            ])
        }
    }

    useEffect(() => {
        getTasks()
    }, [])

    //Define Swipeable Section Elements
    const unDoneList = tasks.filter(task => task.completed !== true)
    const sections = getSections(unDoneList)
    const renderItem = ({ item, index }) => (
        <TaskItem item={item} index={index} deleteHandler={deleteHandler} editTaskHandler={editTaskHandler} />
    )
    const renderSectionHeader = ({ section }) => <Text style={styles.SectionHeaderStyle}>{section.title}</Text>
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss()
            }}
        >
            <Layout style={styles.container} >

                <TopNavigationBar {...props} />

                <SafeAreaView style={styles.list} >
                    <Text style={styles.title}>Five Days List</Text>
                    <SectionList
                        ref={scrollRef}
                        sections={sections}
                        renderSectionHeader={renderSectionHeader}
                        renderItem={renderItem}
                        keyExtractor={item => item._id}
                        refreshControl={
                            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
                        }
                    />
                </SafeAreaView>
                {/* {!bottomSheetShow && (<AddToDoButton toggleBottomSheet={() => Input.open()} />)} */}
                <AddToDoButton toggleBottomSheet={() => Input.open()} />
                {/* <BottomSheetComponent
                    visible={bottomSheetShow}
                    onBackButtonPress={() => setBottomSheetShow(!bottomSheetShow)}
                    onBackdropPress={() => setBottomSheetShow(!bottomSheetShow)}
                >
                    <AddTask submitHandler={addTaskHandler} />
                </BottomSheetComponent> */}
                <RBSheet
                    ref={ref => {
                        Input = ref;
                    }}
                    height={500}
                    customStyles={{
                        container: {
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10
                        }
                    }}
                >
                    <View style={styles.listContainer}>
                        <Text style={styles.listTitle}>Create a new task</Text>
                        <AddTask submitHandler={addTaskHandler} />
                    </View>
                </RBSheet>
                

            </Layout>

        </TouchableWithoutFeedback>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "center",
        justifyContent: 'center',
        backgroundColor: '#EDF1F7',
        marginTop: 16,
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
        padding: 10
    },
    SectionHeaderStyle: {
        paddingTop: 20,
        // backgroundColor: '#CDDC89',
        fontSize: 20,
        padding: 5,
        color: 'black',
        paddingBottom: 2
    },
    rowBack: {
        alignItems: 'center',
        // backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        marginTop: 2
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backLeftBtnRight: {
        backgroundColor: '#2F3860',
        left: 75,
    },
    backLeftBtnLeft: {
        backgroundColor: '#D26759',
        left: 0,
        borderTopLeftRadius: 13,
        borderBottomLeftRadius: 13
    },
    backRightBtnRight: {
        backgroundColor: '#2AB785',
        right: 0,
        borderTopRightRadius: 13,
        borderBottomRightRadius: 13
    },
    backTextWhite: {
        color: 'white',
        fontWeight: 'bold'
    },
    listContainer: {
        flex: 1,
        padding: 15
    },
    listTitle: {
        fontFamily: 'Lato-Regular',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 20,
        color: "#666",
        alignSelf: 'center'
    },
    listButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10
    }

})

export default FiveDayScreen

