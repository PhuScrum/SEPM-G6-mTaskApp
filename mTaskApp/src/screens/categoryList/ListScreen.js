import React, { useState, useEffect, useCallback, createRef, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, View, AsyncStorage, TouchableWithoutFeedback, TouchableHighlight, Keyboard, FlatList, RefreshControl, TouchableOpacity } from 'react-native'
import RBSheet from "react-native-raw-bottom-sheet";
import { Layout, Text } from '@ui-kitten/components'
import { getMyListsAction, addListAction, clearListItemAction } from '../../actions/ListActions';
import TopNavigationBar from '../five_date/TopNavigationBar';
import CategoryItem from '../../components/categoryList/CategoryItem';
import AddList from '../../components/categoryList/AddList';

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const ListScreen = (props) => {
    const dispatch = useDispatch()
    const refBtnSheet = useRef()
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

    const addListHandler = async (listData) =>{
        await dispatch(addListAction(listData))
        dispatch(clearListItemAction())
        onRefresh()
        refBtnSheet.current.close()
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

                            <TouchableOpacity onPress={()=> {
                                console.log('add list')
                                refBtnSheet.current.open()
                            }}>
                                <View style={styles.btnContainer}>
                                    <Text style={styles.btnTextStyle}>Add List</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <RBSheet
                        ref = {refBtnSheet}
                        closeOnDragDown
                        height={350}
                        customStyles={{
                            container: {
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10
                            }
                        }}
                    >
                         <View style={styles.bottomSheetContainer}>
                            <Text style={styles.bottomSheetTitle}>Create a new List</Text>
                            <AddList submitHandler={addListHandler}/>
                        </View>
                    </RBSheet>
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
    btnContainer: {
        marginVertical: 5,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        // flex: 1,
        borderColor: 'black',
        borderStyle: 'dashed',
        borderWidth: 1,
        alignItems: 'center'
    },
    btnTextStyle:{
        fontSize: 16

    },
    bottomSheetContainer: {
        flex: 1,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    bottomSheetTitle: {
        fontFamily: 'Lato-Regular',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5,
        color: "#666",
        alignSelf: 'center',
        padding:10,
        borderBottomWidth: 1
    }
})
