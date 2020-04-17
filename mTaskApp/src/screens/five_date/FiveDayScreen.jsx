import React, { useState, useEffect, useReducer, useCallback, createRef } from 'react';
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
    TouchableHighlight,
    SectionList,

} from 'react-native';
import { BottomSheet } from 'react-native-btr';
import moment from 'moment-timezone'
import { Layout, Text } from '@ui-kitten/components';
import TopNavigationBar from './TopNavigationBar'
import { FlatList, ScrollView, } from 'react-native-gesture-handler';
import TaskItem from '../../components/tasks/TaskItem';
import AddTask from '../../components/tasks/AddTask';

import { getTasksAction, deleteTaskAction } from '../../actions/TaskAction'

import AddToDoButton from '../../components/tasks/AddTaskButton';

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const getSections = (tasks) => {
    //Devide Data
    const todayData = tasks.filter(task => moment(task.dateTime).date() === moment().date())
    const tmrData = tasks.filter(task => moment(task.dateTime).date() === moment().date() + 1)
    const twodayData = tasks.filter(task => moment(task.dateTime).date() === moment().date() + 2)
    const threeDayData = tasks.filter(task => moment(task.dateTime).date() === moment().date() + 3)
    const fourDayData = tasks.filter(task => moment(task.dateTime).date() === moment().date() + 4)
    const fiveDayData = tasks.filter(task => moment(task.dateTime).date() === moment().date() + 5)

    //Define Section
    const twoDay = moment().add(2, 'days').format('ll')
    const threeDay = moment().add(3, 'days').format('ll')
    const fourDay = moment().add(4, 'days').format('ll')
    const fiveDay = moment().add(5, 'days').format('ll')
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

    const getTasks = () => {
        dispatch(getTasksAction())
    }
    // console.log(tasks)

    const deleteHandler = (id) => {
        dispatch(deleteTaskAction(id))
    }

    useEffect(() => {
        getTasks()
    }, [])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getTasks()
        wait(2000).then(() => {
            setRefreshing(false)

        });
    }, [refreshing]);


    const submitHandler = (text) => {
        if (text.length > 3) {
            console.log(text)
        } else {
            Alert.alert('oops!!', 'Todos must be over 3 characters long', [
                { text: 'Understood', onPress: () => console.log('alert closed') }
            ])
        }
    }

    //Seperator Style
    const FlatListItemSeparator = () => {
        return (
            //Item Separator
            <View
                style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }}
            />
        );
    };

    const sections = getSections(tasks)


    return (

        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss()
            }}
        >
            <Layout style={styles.container} >
                <TopNavigationBar {...props} />
                <Text style={{ alignSelf: "center" }}>Five Days List</Text>

                <SafeAreaView style={styles.list} >
                    <SectionList
                        refreshControl={
                            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
                        }
                        keyExtractor={item => item._id}
                        ref={ref => scrollRef}
                        ItemSeparatorComponent={FlatListItemSeparator}
                        sections={sections}
                        renderSectionHeader={({ section }) => (
                            <Text style={styles.SectionHeaderStyle}> {section.title} </Text>
                        )}
                        renderItem={({ item }) => (
                            <TaskItem item={item} deleteHandler={deleteHandler} />
                        )
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
                            width: '100%',
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}>
                            <AddTask submitHandler={submitHandler} />
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
        // marginVertical: 10
    },
    SectionHeaderStyle: {
        // backgroundColor: '#CDDC89',
        fontSize: 20,
        padding: 5,
        color: 'black',
    }

})

export default FiveDayScreen