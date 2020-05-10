import React, { useState, useEffect, useCallback, createRef, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, View, AsyncStorage, TouchableWithoutFeedback, TouchableHighlight, Keyboard, FlatList, RefreshControl } from 'react-native'

import { Layout, Text } from '@ui-kitten/components'
import { getMyListsAction } from '../../actions/ListActions';
import TopNavigationBar from '../five_date/TopNavigationBar';
import CategoryItem from '../../components/categoryList/CategoryItem';

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const ListScreen = (props) => {
    const dispatch = useDispatch()
    const lists = useSelector(state => state.listReducer.lists, [])
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(600)
            .then(() => {
                getMyLists()
                setRefreshing(false)
            })
    }, [refreshing]);

    const getMyLists = async () => {
        let id = await AsyncStorage.getItem('userId')
        dispatch(getMyListsAction(id))
    }

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getMyLists()
        })
        return unsubscribe
    }, [props.navigation])

    //Define List Elems
    const renderItem = ({ item }) => (
        <CategoryItem item={item} />
    )

    // console.log(lists)

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss()
                onRefresh()
            }}
        >
            <>
                <TopNavigationBar {...props} />
                <Layout style={styles.container}>
                    <View style={styles.list}>
                        <Text category='h1'>My Lists</Text>
                        <View style={styles.gridView}>
                            <FlatList
                                data={lists}
                                keyExtractor={list => list._id}
                                renderItem={renderItem}
                                refreshControl={
                                    <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
                                }
                            />
                        </View>
                    </View>
                </Layout>
            </>
        </TouchableWithoutFeedback>
    )
}

export default ListScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#EDF1F7',
        // alignItems: 'center'
    },
    gridView: {
        marginTop: 20,
        // flex: 1,
        justifyContent: 'center',
    },
    list: {
        flex: 3,
        padding: 10
    },
})
