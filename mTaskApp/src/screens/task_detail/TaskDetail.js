import React, { useState, useCallback } from 'react'
import { View, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native'
import { Layout, Text, Icon } from '@ui-kitten/components';
import TopNavigationBar from '../five_date/TopNavigationBar'
import { useSelector, useDispatch } from 'react-redux'
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { editTaskAction, getTaskItemAction } from '../../actions/TaskAction';

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const TaskDetail = (props) => {
    const dispatch = useDispatch()
    const task = useSelector(state => state.taskReducer.taskItem, []);
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(500).then(() => {
            dispatch(getTaskItemAction(task._id))
            setRefreshing(false)
        });
    }, [refreshing]);

    const editTaskHandler = (id, data) => {
        dispatch(editTaskAction(id, data))
        onRefresh()
    }

    console.log(task)

    return (
        <>
            <TopNavigationBar {...props} />
            <Layout style={styles.container} >
                <View style={styles.headerStyle}>
                    <TouchableOpacity 
                        style={styles.doneStyle} 
                        onPress={()=>editTaskHandler(task._id, {completed: !task.completed})}
                    >
                        <FontAwesome 
                            name= {task.completed === true ? "circle" : "circle-thin"} 
                            size={32}  
                        />
                    </TouchableOpacity>
    <Text style={styles.headerText}>{task.name}</Text>
                </View>


            </Layout>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        // alignItems: "center",
        // justifyContent: 'center',
        backgroundColor: '#EDF1F7',
        paddingTop: 12,
        paddingBottom: 0,
        paddingHorizontal: 15,
        height: '100%'
    },
    headerStyle: {
        flexDirection: 'row',
        height: 50,
        // backgroundColor: 'white',
        alignItems: 'center',
    },
    headerText: {
        fontFamily: 'Lato-Regular',
        fontSize: 20,
        paddingHorizontal: 20,
        // color: 'white'
        // fontWeight: '700'
    },
    doneStyle: {
        color: 'white'
    }

})


export default TaskDetail
