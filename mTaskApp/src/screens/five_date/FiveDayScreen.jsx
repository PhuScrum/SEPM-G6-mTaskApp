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
    Dimensions
} from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { BottomSheet } from 'react-native-btr';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Layout, Text, Icon } from '@ui-kitten/components';
import TopNavigationBar from './TopNavigationBar'
import TaskItem from '../../components/tasks/TaskItem';
import AddTask from '../../components/tasks/AddTask';
import AddToDoButton from '../../components/tasks/AddTaskButton';

import _ from 'lodash'
import moment from 'moment-timezone'

import { getTasksAction, deleteTaskAction, addTaskAction, editTaskAction } from '../../actions/TaskAction'
import TagMembers from '../../components/tag_members/TagMembers'
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
    const threeDayData = tasks.filter(task => moment(task.dateTime).format('Do MMMM YYYY') === threeDay )
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
    const sections = getSections(tasks)
    const renderItem = (data, rowMap) => (
        <TaskItem item={data.item} />
    )
    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };
    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backLeftBtnRight]}
                onPress={() => closeRow(rowMap, data.item._id)}
            >
                <Text style={styles.backTextWhite}>Delay</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backLeftBtnLeft]}
                onPress={() => deleteHandler(data.item._id)}
            >
                <Ionicons name="ios-trash" size={32} color="white" />
            </TouchableOpacity>
            <View style={[
                styles.backRightBtn,
                {
                    backgroundColor: '#2F3860',
                    left: 149,
                    width: 200
                }]}></View>
            <View style={[
                styles.backRightBtn,
                {
                    backgroundColor: '#2AB785',
                    right: 74,
                    width: 75
                }]}></View>

            <TouchableOpacity
                activeOpacity={1.0}
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => {
                    editTaskHandler(data.item._id, {completed: !data.item.completed})
                    wait(800).then(() => {
                        closeRow(rowMap, data.item._id)
                    })
                }}
            >
                <AntDesign 
                    name= {data.item.completed ? 'checkcircle' : 'checkcircleo'}
                    size={32} 
                    color="white" 
                />
            </TouchableOpacity>
        </View>
    );
    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };
    const renderSectionHeader = ({ section }) => <Text style={styles.SectionHeaderStyle}>{section.title}</Text>
    const onSwipeValueChange = ({ key, value }) => {
        // console.log('Key: ', key)
        // console.log('Value: ', value)

    }

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
                    <SwipeListView
                        useSectionList
                        refreshControl={
                            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
                        }
                        keyExtractor={item => item._id}
                        // ItemSeparatorComponent={FlatListItemSeparator}
                        sections={sections}
                        renderItem={renderItem}
                        renderHiddenItem={renderHiddenItem}
                        renderSectionHeader={renderSectionHeader}
                        leftOpenValue={150}
                        rightOpenValue={-75}
                        previewRowKey={'0'}
                        previewOpenValue={-40}
                        previewOpenDelay={150}
                        // onRowDidOpen={onRowDidOpen}
                        onSwipeValueChange={onSwipeValueChange}
                    />
                </SafeAreaView>
                {!bottomSheetShow && (<AddToDoButton toggleBottomSheet={() => setBottomSheetShow(true)} />)}
                <BottomSheet
                    visible={bottomSheetShow}
                    onBackButtonPress={() => setBottomSheetShow(!bottomSheetShow)}
                    onBackdropPress={() => setBottomSheetShow(!bottomSheetShow)}
                >
                    <View style={styles.bottomNavigationView}>
                        <View style={{ flex: 3, justifyContent: 'center' }}>
                            <Text style={styles.bottomSheetTitle}>Create a new task</Text>
                        </View>
                        <View style={{
                            width: '100%',
                            flex: 16,
                            marginTop: 2
                        }}>
                            <AddTask submitHandler={addTaskHandler} />
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
    bottomNavigationView: {
        borderRadius: 15,
        backgroundColor: '#fff',
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        // marginVertical: 10
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
    bottomSheetTitle: {
        // flexDirection:'row',
        fontFamily: 'Lato-Light',
        fontWeight: 'bold',
        fontSize: 18
    }

})

export default FiveDayScreen

