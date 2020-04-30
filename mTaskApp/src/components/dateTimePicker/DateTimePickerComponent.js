import React from 'react'
import { View, StyleSheet } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button} from '@ui-kitten/components';

const DateTimePickerComponent = ({
    dateVisible,
    timeVisible,
    onChangeDate,
    onChangeTime,
    setDatePickerVisible,
    setTimePickerVisible,
    date,
    time }) => {

    const os = Platform.OS

    const DateTimePickerAndroid = () => {
        return (
            <>
                {dateVisible && (
                    <View >
                        <DateTimePicker
                            testID="dateTimePicker"
                            timeZoneOffsetInMinutes={0}
                            value={date}
                            mode={'date'}
                            is24Hour={true}
                            display="default"
                            onChange={onChangeDate}
                            style={{ width: '100%', backgroundColor: 'white', position: "absolute" }}
                        />
                    </View>
                )}
                {timeVisible && (
                    <View>
                        <DateTimePicker
                            testID="dateTimePicker"
                            timeZoneOffsetInMinutes={0}
                            value={time}
                            mode={'time'}
                            is24Hour={true}
                            display="spinner"
                            onChange={onChangeTime}
                            style={{ width: '100%', backgroundColor: 'white', position: "absolute" }}
                        />
                    </View>
                )}
            </>
        )
    }

    const DateTimePickerIOS = () => {
        return (
            <>
                {dateVisible && (
                    <View style={styles.iosPicker}>
                        <View style={styles.iosPickerBackground}>
                            <View>
                                <DateTimePicker
                                    value={date}
                                    mode="date"
                                    display="calendar"
                                    onChange={onChangeDate}
                                    style={{ width: '100%' }}
                                />
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Button onPress={setDatePickerVisible}>Done</Button>
                            </View>
                        </View>
                    </View>
                )}

                {timeVisible && (
                    <View style={styles.iosPicker}>
                        <View style={styles.iosPickerBackground}>
                            <View>
                                <DateTimePicker
                                    value={time}
                                    mode="time"
                                    display="default"
                                    onChange={onChangeTime}
                                    style={{ width: '100%' }}
                                />
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Button onPress={setTimePickerVisible}>Done</Button>
                            </View>
                        </View>
                    </View>
                )}
            </>
        )
    }
    return (
        <>
            {os === 'android' && <DateTimePickerAndroid />}
            {os === 'ios' && <DateTimePickerIOS />}
        </>
    )
}

const styles = StyleSheet.create({
    iosPicker: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        // height:'100%',
        // bottom: '50%'
    },
    iosPickerBackground: {
        backgroundColor: 'white',
        padding: 15,
        // position: "absolute",
    }
})

export default DateTimePickerComponent
