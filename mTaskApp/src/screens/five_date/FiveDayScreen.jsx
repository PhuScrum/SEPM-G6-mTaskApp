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
    SectionList,
    TouchableOpacity

} from 'react-native';
import { BottomSheet } from 'react-native-btr';
import { SwipeListView } from 'react-native-swipe-list-view';
import moment from 'moment-timezone'
import { Layout, Text } from '@ui-kitten/components';
import TopNavigationBar from './TopNavigationBar'
import TaskItem from '../../components/tasks/TaskItem';
import AddTask from '../../components/tasks/AddTask';
import AddToDoButton from '../../components/tasks/AddTaskButton';

import { getTasksAction, deleteTaskAction } from '../../actions/TaskAction'

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

    //Define Swipeable Section Elements
    const sections = getSections(tasks)
    const renderItem = ({ item }) => (
        <TaskItem item={item} />
    )
    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };
    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <Text>Left</Text>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() => closeRow(rowMap, data.item._id)}
            >
                <Text style={styles.backTextWhite}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => console.log(data.item._id)}
            >
                <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
        </View>
    );
    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };
    const renderSectionHeader = ({ section }) => <Text style={styles.SectionHeaderStyle}>{section.title}</Text>


    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss()
            }}
        >
            <Layout style={styles.container} >
                
                    <TopNavigationBar {...props} />
                
                

                
                <Text style={styles.title}>Five Days List</Text>

                <SafeAreaView style={styles.list} >
                    {/* <SectionList
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

                    /> */}
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
                        leftOpenValue={75}
                        rightOpenValue={-150}
                        previewRowKey={'0'}
                        previewOpenValue={-40}
                        previewOpenDelay={3000}
                        onRowDidOpen={onRowDidOpen}
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
        backgroundColor: '#F5F5F5',
        marginTop: 16,
        paddingBottom: 0
    },
    title: {
        fontFamily: 'Lato-Regular',
        fontSize: 36,
        paddingTop: 30,
        paddingLeft: 10
        
    },
    list: {
        flex: 1,
        padding: 10
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
        fontSize: 24,
        padding: 5,
        color: 'black',
    },
    rowBack: {
        alignItems: 'center',
        // backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    }

})

export default FiveDayScreen

