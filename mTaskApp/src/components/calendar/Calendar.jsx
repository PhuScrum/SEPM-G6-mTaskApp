import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Calendar,
  Text,
} from '@ui-kitten/components';
const now = new Date();
const minDate = new Date(100, now.getMonth(), 15);
const maxDate = new Date(99999, now.getMonth() + 1, 15);

const DayCell = ({ date }, style) => (
  <View
    style={[styles.dayContainer, style.container]}>
    <Text style={style.text}>{`${date.getDate()}`}</Text>
    <Text style={[style.text, styles.value]}>
      {`${100 * date.getDate() + Math.pow(date.getDate(), 2)}$`}
    </Text>
  </View>
);

export default function CalendarCustomDayShowcase  () {

  const [selectedDate, setSelectedDate] = React.useState(null);
//   useEffect(() => alert(selectedDate));
  return (
      <React.Fragment>
           <Calendar
      style={{width: '100%'}}
      
      date={selectedDate}
      onSelect={setSelectedDate}
      renderDay={DayCell}
      min={minDate}
      max={maxDate}
    />
    <Text>{selectedDate !== null? typeof(selectedDate) : null}</Text>
      </React.Fragment>
   
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
  },
  value: {
    fontSize: 12,
    fontWeight: '400',
  },
  
    // calendar: {
    //   flexDirection: 'column',
    //   alignItems: 'stretch',
    //   flex: 1,
    // //   justifyContent: 'center',
    // //   aspectRatio: 1

    // },
});