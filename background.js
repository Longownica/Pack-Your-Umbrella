chrome.alarms.create("checkWeather", {
    when: new Date().setHours(21, 30, 0),
    periodInMinutes: 60 * 24
  });
  
  chrome.alarms.onAlarm.addListener(onAlarm);
  function onAlarm(alarm) {
    if (alarm.name === "checkWeather") {

      console.log("Alarm fired", alarm);
      chrome.notifications.create(
        {
            type: "basic",
            iconUrl: "images/umbrella128.png",
            title: "Pack your umbrella",
            message: "Check weather forecast. It may rain tommorow.",
            silent: false
        }
      );
    }
}