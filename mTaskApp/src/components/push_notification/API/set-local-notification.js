import {Notifications} from 'expo'

const setLocalNotification = async (title, body, time, repeat)=>{
    var halfAnHour = 1000 * 60 * 30
    var oneMiniute = 1000 * 60
    var anHour = 1000* 60
    var remindTime = time - anHour
    var dateNow = (new Date()).getTime()
    console.log(time, dateNow)
    console.log(time.toString().length, dateNow.toString().length)
    // time must greater than datenow
    if(time> dateNow)console.log('true')
    var localNotification ={
            title,
            body,
        }
        var schedulingOptions = {
            time: time,
            // repeat,
        }
    var res = await Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)
    console.log(res)
}

export default setLocalNotification