import React,  {useState, useCallback, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet,  View, RefreshControl } from 'react-native'
import TopNavigationBar from '../five_date/TopNavigationBar'
import { Layout, Text, } from '@ui-kitten/components'
import { list } from '../../constants/url/url'
import { FlatList } from 'react-native-gesture-handler'
import { getListItemAction, deleteTaskFromListAction } from '../../actions/ListActions'
import TaskItem from '../../components/tasks/TaskItem'
import { getTaskItemAction, addTaskAction } from '../../actions/TaskAction'
import AddToDoButton from '../../components/tasks/AddTaskButton'
import sendPushNotification from '../../components/push_notification/API/send-push-notification'
import setLocalNotification from '../../components/push_notification/API/set-local-notification'
import { clearSelectedAction } from '../../actions/tag-members-actions'

import RBSheet from "react-native-raw-bottom-sheet";
import AddTask from '../../components/tasks/AddTask'

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const ListDetail = (props) => {
    const refBottomSheet = useRef();
    const dispatch = useDispatch()
    const listItem = useSelector(state => state.listReducer.listItem)
    const tasks = listItem.items ? listItem.items : []
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(600)
            .then(() => {
                dispatch(getListItemAction(listItem._id))
                .then(setRefreshing(false))
            })
    }, [refreshing])

    const deleteHandler = async (id) => {
        const listID = listItem._id
        const removeTaskData = {
            taskId: id
        }
        await dispatch(deleteTaskFromListAction(listID, removeTaskData))
        // onRefresh()
    }

    const editTaskHandler = (id, data) => {
        dispatch(editTaskAction(id, data))
        onRefresh()
    }

    const onNavigateDetail = (id) => {
        dispatch(getTaskItemAction(id))
        .then(()=>props.navigation.navigate('TaskDetail'))
    }

    const handlePushNoti = (taskObj)=>{
        var taggedUsers = taskObj.taggedUsers
        if(taggedUsers.length >=1){
            for(let i=0; i < taggedUsers.length; i++){
                var userObj = taggedUsers[i]
                var expoPushToken = userObj.expoPushToken
                sendPushNotification(userObj, taskObj)
            }
        }       
    }  

    const addTaskHandler = async (taskObj) => {
        const data = {...taskObj, listId: listItem._id}
        console.log('addTAskHandler: ', data)
        handlePushNoti(taskObj)
        setLocalNotification(taskObj.name, 'Click here to view more', taskObj.dateTime)
        if (taskObj.name.length > 3) {
            await dispatch(addTaskAction(data))
            dispatch(clearSelectedAction())
            onRefresh()
            refBottomSheet.current.close()
        } else {
            Alert.alert('Warning!!!', 'Todos must be over 3 characters long', [
                { text: 'Understood' }
            ])
        }
    }
    
    const renderItem = ({item, index}) => (
        <TaskItem
            isShowDate={true}
            item={item}
            index={index}
            deleteHandler={deleteHandler}
            editTaskHandler={editTaskHandler}
            onNavigateDetail={onNavigateDetail}
        />
    )

    return (
        <>
            <TopNavigationBar {...props} withBackControl={true} />
            <Layout style={styles.container}>
                <View style={styles.list}>
                    <Text category='h1'>{listItem.name}</Text>
                    <View style={styles.gridView}>
                        <FlatList
                            data={tasks}
                            keyExtractor={task=>task._id}
                            renderItem={renderItem}
                            refreshControl = {
                                <RefreshControl onRefresh={onRefresh} refreshing={refreshing}/>
                            }
                        />
                    </View>
                </View>
            </Layout>
            <AddToDoButton toggleBottomSheet={() => refBottomSheet.current.open()} />
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

        </>
    )
}

export default ListDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#EDF1F7',
    },
    list: {
        flex: 1,
        padding: 10
    },
    gridView: {
        marginTop: 20,
        justifyContent: 'center',
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
