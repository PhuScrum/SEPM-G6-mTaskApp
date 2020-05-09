import React, { useState, useCallback, useEffect } from 'react'
import { View, StyleSheet, TouchableHighlight, TouchableOpacity, AsyncStorage } from 'react-native'
import { Layout, Text, Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import TopNavigationBar from '../five_date/TopNavigationBar'
import { useSelector, useDispatch } from 'react-redux'
import { Ionicons, AntDesign, FontAwesome, Feather } from '@expo/vector-icons';

import moment from 'moment-timezone'

import TaskDate from '../../components/taskDetail/TaskDate'
import TagUser from '../../components/taskDetail/TagUser';

import {clearSelectedAction} from '../../actions/tag-members-actions'
import {clearTaskItemAction} from '../../actions/TaskAction'
import { editTaskAction, getTaskItemAction, getMyTasksAction } from '../../actions/TaskAction';

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const TaskDetail = (props) => {
    const {navigation} = props
    const dispatch = useDispatch()
    const task = useSelector(state => state.taskReducer.taskItem, []);
    const [desc, setDesc] = useState('')

    const [refreshing, setRefreshing] = useState(false)

    const getMyTasks = async () => {
        let id = await AsyncStorage.getItem('userId')
        dispatch(getMyTasksAction(id))
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getMyTasks()
        // wait(600)
        dispatch(getTaskItemAction(task._id))
            .then(() => {
                setRefreshing(false)
            })
    }, [refreshing]);

    const editTaskHandler = (id, data) => {
        dispatch(editTaskAction(id, data))
        .then(onRefresh)
    }

    useEffect(() => {
        const unMount = navigation.addListener('blur',() => {
            dispatch(clearSelectedAction())
            dispatch(clearTaskItemAction())
          })
        return unMount
    }, [navigation])

    // console.log(task)

    return (
        <>
            <TopNavigationBar {...props} withBackControl={'true'}/>
            <Layout style={styles.container} >
                <View style={{ marginBottom: 60 }}>
                    <View style={styles.headerStyle}>
                        <TouchableOpacity
                            style={styles.doneStyle}
                            onPress={() => editTaskHandler(task._id, { completed: !task.completed })}
                        >
                            <FontAwesome
                                name={task.completed === true ? "circle" : "circle-thin"}
                                size={32}
                            />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>{task.name}</Text>
                    </View>
                    <View style={{ paddingBottom: 20, paddingTop: 5 }}>
                        <Text style={{ color: '#919191', fontSize: 12 }}>Created {moment(task.dateCreated).format('ddd, MMM DD')}</Text>
                    </View>
                </View>

                <TaskDate dateTime={task.dateTime} saveDateTime={editTaskHandler} id={task._id} propStyle={{borderStyle: borderStyle, iconSize: iconSize}} />

                <View style={[styles.otherStyle, styles.borderStyle]}>
                    <View style={styles.itemStyle}>
                        <Feather name="sun" size={iconSize} />
                        <TouchableOpacity
                            style={styles.touchableStyle}
                            onPress={() => console.log('My List')}
                        >
                            <Text style={styles.textStyle}>Add to My Lists</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemStyle}>
                        <Feather name="repeat" size={iconSize} />
                        <TouchableOpacity
                            style={styles.touchableStyle}
                            onPress={() => console.log('Repeat')}
                        >
                            <Text style={styles.textStyle}>Repeat</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemStyle}>
                        <Feather name="bell" size={iconSize} />
                        <TouchableOpacity
                            style={styles.touchableStyle}
                            onPress={() => console.log('Remind')}
                        >
                            <Text style={styles.textStyle}>Remind Me</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                <TagUser isSaveTag={true} propStyle={{borderStyle: borderStyle, iconSize: iconSize}} tagType={'input'} id={task._id} saveTagUser={editTaskHandler} />

                <View style={[styles.descStyle, styles.borderStyle]}>
                    <View style={styles.descInputStyle}>
                        <TouchableOpacity onPress={() => console.log('Desc')}>
                            <Text>Add Description</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Layout>
        </>
    )
}

const iconSize = 24
const borderStyle = {
    borderBottomColor: '#D1D5D8',
    borderBottomWidth: 1
}

const styles = StyleSheet.create({
    container: {
        // alignItems: "center",
        // justifyContent: 'center',
        // backgroundColor: '#EDF1F7',
        paddingTop: 18,
        paddingBottom: 0,
        paddingHorizontal: 15,
        height: '100%'
    },
    headerStyle: {
        flexDirection: 'row',
        // height: 60,
        // backgroundColor: 'gray',
        alignItems: 'center',
        paddingVertical: 5
    },
    headerText: {
        fontFamily: 'Lato-Regular',
        fontSize: 20,
        paddingHorizontal: 20,
        // color: 'white'
        // fontWeight: '700'
    },
    touchableStyle: {
        paddingHorizontal: 20
    },
    textStyle: {
        fontSize: 15,
        color: '#6F7274'
        // height:'100%'
    },
    otherStyle: {
        justifyContent: 'center',
        height: 180
    },
    itemStyle: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    borderStyle: borderStyle,
    tagStyle: {
        paddingVertical: 20,
        // backgroundColor: 'gray'
    },
    tagInputStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    descStyle: {
        paddingVertical: 20
    },
    descInputStyle: {
        justifyContent: 'center',
        paddingBottom: 10
    }

})


export default TaskDetail
