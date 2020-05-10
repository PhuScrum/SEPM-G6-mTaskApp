  // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
  sendPushNotification = async (userObj, taskObj) => {
    var {expoPushToken} = userObj
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Someone tag you in a task.',
      body: 'Click here to find out!',
      data: { data: 'goes here' },
      _displayInForeground: true,
    };
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  };

export default sendPushNotification