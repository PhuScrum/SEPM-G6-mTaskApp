import React,  {useState, useCallback} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet,  View, RefreshControl } from 'react-native'
import TopNavigationBar from '../five_date/TopNavigationBar'
import { Layout, Text, } from '@ui-kitten/components'
import { list } from '../../constants/url/url'
import { FlatList } from 'react-native-gesture-handler'
import { getListItemAction, deleteTaskFromListAction } from '../../actions/ListActions'
import TaskItem from '../../components/tasks/TaskItem'
import { getTaskItemAction } from '../../actions/TaskAction'

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const ListDetail = (props) => {
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
        onRefresh()
    }

    const editTaskHandler = (id, data) => {
        dispatch(editTaskAction(id, data))
        onRefresh()
    }

    const onNavigateDetail = (id) => {
        dispatch(getTaskItemAction(id))
        .then(()=>props.navigation.navigate('TaskDetail'))
    }
    
    const renderItem = ({item, index}) => (
        <TaskItem
            item={item}
            index={index}
            deleteHandler={deleteHandler}
            editTaskHandler={editTaskHandler}
            onNavigateDetail={onNavigateDetail}
        />
    )

    return (
        <>
            <TopNavigationBar {...props} />
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
     
})
