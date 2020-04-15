import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Calendar,
  Text,
} from '@ui-kitten/components';
import tasks from '../../constants/fake_data/tasks'
var hashMap = {}
const getDateFromDateTime = ()=>{
  //set up hashmap
  for(let i=0; i < tasks.length; i++){
    var date = new Date(tasks[i].dateTime).getDate()
    if(hashMap[date]){
      hashMap[date].push(tasks[i])
    }else{
      var arr = 
      hashMap[date] = [tasks[i]]
    }
  }
}
getDateFromDateTime()
console.log('tasks list: ', tasks)
console.log('hashmap: ', hashMap)
const now = new Date();
const minDate = new Date(100, now.getMonth(), 15);
const maxDate = new Date(99999, now.getMonth() + 1, 15);
const DayCell = ({ date }, style) => (
  <View
    style={[styles.dayContainer, style.container]}>
    <Text style={style.text}>{`${date.getDate()}`}</Text>
    <Text style={[style.text, styles.value]}>
      {hashMap[date.getDate()] ? <Text>x</Text>: null}

    </Text>
  </View>
);


export default function CalendarCustomDayShowcase  () {

  const [selectedDate, setSelectedDate] = React.useState(null);
  const [itemsOnSpecificDate, setItemOnSpecificDate] = React.useState([])
  
  const fetchItemSpecificDate = (selectedDate) =>{
    // nếu chọn ngày
    if(selectedDate){
      selectedDate = selectedDate.getDate()
      setItemOnSpecificDate(hashMap[selectedDate])
      console.log(hashMap[selectedDate])
    }
    else{ // nếu ngày là null. khi users chuyển trang qua. 
      var dateToday = new Date().getDate()
      setItemOnSpecificDate(hashMap[dateToday])
    }
    console.log('itemOSD', itemsOnSpecificDate)
    
  }
  useEffect(() => {
    fetchItemSpecificDate(selectedDate)
  });
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