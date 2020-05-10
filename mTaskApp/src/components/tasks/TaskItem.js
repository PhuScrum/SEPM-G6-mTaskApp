import React, { createRef, useState, useRef } from 'react'
import { StyleSheet, View, TouchableOpacity, TouchableHighlight, Animated, I18nManager, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import RBSheet from "react-native-raw-bottom-sheet";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { Layout, Text, Button } from '@ui-kitten/components';
import { ListItem } from '@ui-kitten/components';
import moment from 'moment-timezone'
import DateTimePickerComponent from '../dateTimePicker/DateTimePickerComponent';

const combineDateTime = (date, time) => {
    const datePick = moment(date).format('DD MMM YYYY ')
    const timePick = moment(time).format('hh:mm:ss a')
    const finalTime = Date.parse(`${datePick}${timePick}`)
    return finalTime
}

const os = Platform.OS

const RowItem = ({ item }) => (
    <RectButton >
        <ListItem
            style={styles.item}
            title={item.name}
            description={moment(item.dateTime).format('LT')}
            // onPress={() => console.log(item.name)}
        />
    </RectButton>
)

const TaskItem = ({ item, deleteHandler, editTaskHandler, onNavigateDetail}) => {
    const scrollRef = createRef()
    const refRBSheet = useRef();

    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [date, setDate] = useState(new Date(item.dateTime))
    const [time, setTime] = useState(new Date(item.dateTime))

    const onChangeDate = (selectedDate) => {
        const currentDate = selectedDate
        setShowDatePicker(false)
        setDate(currentDate);
    };

    const onChangeTime = (selectedTime) => {
        const currentTime = selectedTime
        setShowTimePicker(false)
        setTime(currentTime);
    };

    const taskDateTime = {
        dateTime: combineDateTime(date, time)
    }

    const renderLeftAction = (text, color, x, progress) => {
        const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [x, 0],
        });
        const pressHandler = () => {
            switch (text) {
                case 'Delete':
                    deleteHandler(item._id)
                    refRBSheet.current.close()
                case 'Delay':
                    refRBSheet.current.open()
                default:
            }
        }
        return (
            <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
                <RectButton style={[styles.leftAction, { backgroundColor: color }]} onPress={pressHandler}>
                    <Text style={styles.actionText}>{text}</Text>
                </RectButton>
            </Animated.View>
        );
    }
    const renderLeftActions = (progress) => (
        <View style={{ width: 192, flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse' }}>
            {renderLeftAction('Delay', '#394F68', -64, progress)}
            {renderLeftAction('Delete', '#EE001D', -32, progress)}
        </View>
    )

    const renderMoreAction = (text, color, x, progress) => {
        const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [x, 0],
        });
        const pressHandler = () => {
            onNavigateDetail(item)
        };
        return (
            <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
                <RectButton
                    style={[styles.rightAction, { backgroundColor: color }]}
                    onPress={pressHandler}>
                    <Text style={styles.actionText}>{text}</Text>
                </RectButton>
            </Animated.View>
        );
    };
    const renderDoneAction = (text, color, x, progress) => {
        const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [x, 0],
        });
        const pressHandler = () => {
            editTaskHandler(item._id, { completed: !item.completed })
        };
        return (
            <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
                <RectButton
                    style={[styles.rightAction, { backgroundColor: color }]}
                    onPress={pressHandler}>
                    <Text style={styles.actionText}>{text}</Text>
                </RectButton>
            </Animated.View>
        );
    };
    const renderRightActions = progress => (
        <View style={{ width: 192, flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row' }}>
            {renderMoreAction('More', '#65AEE0', 192, progress)}
            {renderDoneAction('Done', '#4CBB87', 128, progress)}
        </View>
    );

    return (
        <TouchableHighlight
            style={styles.rowFront}
        >
            <View>
                <Swipeable
                    ref={scrollRef}
                    friction={2}
                    leftThreshold={40}
                    // rightThreshold={40}
                    renderLeftActions={renderLeftActions}
                    renderRightActions={renderRightActions}
                >
                    <RowItem item={item} />
                </Swipeable>

                <RBSheet
                    height={300}
                    ref={refRBSheet}
                >
                    <View style={styles.dateHeaderContainer}>
                        <TouchableOpacity
                            onPress={() => refRBSheet.current.close()}
                            style={styles.dateHeaderButton}
                        >
                            <Text style={styles.dateHeaderButtonCancel}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                refRBSheet.current.close()
                                editTaskHandler(item._id, taskDateTime)
                            }}
                            style={[styles.dateHeaderButton]}
                        >
                            <Text style={styles.dateHeaderButtonDone}>Done</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputGroup, { flexDirection: 'row', flex: 1, marginHorizontal: 10 }}>
                        <DateTimePickerComponent
                            dateVisible={showDatePicker}
                            timeVisible={showTimePicker}
                            onChangeDate={onChangeDate}
                            onChangeTime={onChangeTime}
                            setDatePickerVisible={setShowDatePicker}
                            setTimePickerVisible={setShowTimePicker}
                            dateValue={date}
                            timeValue={time}
                        />
                    </View>
                </RBSheet>           
            </View>

        </TouchableHighlight>
    );

}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // backgroundColor: '#EEF7FA'
    },
    button: {
        margin: 0
    },
    rowFront: {
        marginTop: 2,
        backgroundColor: '#EEF7FA',
        justifyContent: 'center',
        borderRadius: 12
    },
    leftAction: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    actionText: {
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        padding: 10,
    },
    rightAction: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    rectButton: {
        flex: 1,
        height: 80,
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    dateHeaderContainer: {
        height: 45,
        borderBottomWidth: 1,
        borderColor: "#ccc",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    dateHeaderButton: {
        height: "100%",
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    dateHeaderButtonCancel: {
        fontSize: 18,
        color: "#666",
        fontWeight: "400"
    },
    dateHeaderButtonDone: {
        fontSize: 18,
        color: "#006BFF",
        fontWeight: "500"
    },
    inputGroup: {
        width: '100%',
        paddingVertical: 8,
        position: 'relative'
    },
    dateTimeText: {
        fontSize: 16,
        fontWeight: 'normal',
        fontFamily: 'Lato-Regular',
        marginLeft: 15
    },
})

export default TaskItem