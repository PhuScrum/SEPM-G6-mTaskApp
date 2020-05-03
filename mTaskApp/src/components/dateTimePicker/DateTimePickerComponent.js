import React from 'react'
import { View, StyleSheet, Dimensions, Modal } from 'react-native'
import { Button } from '@ui-kitten/components';
import moment from 'moment-timezone'
import DateTimePickerModal from "react-native-modal-datetime-picker";

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

const DateTimePickerComponent = ({
    dateVisible,
    timeVisible,
    onChangeDate,
    onChangeTime,
    setDatePickerVisible,
    setTimePickerVisible,
    dateValue,
    timeValue }) => {

    const os = Platform.OS

    const displayDate = moment(dateValue).format('LL')
    const displayTime = moment(timeValue).format('LT')

    const DateTimePickerIOS = () => {
        return (
            <>
                <View>
                    <DateTimePickerModal
                        isVisible={dateVisible}
                        date={dateValue}
                        mode="date"
                        display="calendar"
                        onConfirm={onChangeDate}
                        onCancel={() => setDatePickerVisible(false)}
                    />
                </View>
                <View>
                    <DateTimePickerModal
                        isVisible={timeVisible}
                        date={timeValue}
                        mode="time"
                        display={os === 'ios' ? "default" : "spinner"}
                        onConfirm={onChangeTime}
                        onCancel={() => setTimePickerVisible(false)}
                    />
                </View>
            </>
        )
    }

    return (
        <>
            <View style={styles.pickerButton}>
                <Button onPress={() => {
                    setDatePickerVisible(true)
                    setTimePickerVisible(false)
                }}
                >{displayDate}</Button>
            </View>
            <View style={styles.pickerButton}>
                <Button onPress={() => {
                    setTimePickerVisible(true)
                    setDatePickerVisible(false)
                }}
                >{displayTime}</Button>
            </View>
            <DateTimePickerIOS />
        </>
    )
}

const styles = StyleSheet.create({
    iosPicker: {
        position: 'absolute',
        flex: 1,
        width: '100%',
    },
    iosPickerBackground: {
        backgroundColor: 'white',
        padding: 15,
        width: windowWidth
    },
    pickerButton: {
        flex: 1,
        margin: 3
    }
})

export default DateTimePickerComponent
