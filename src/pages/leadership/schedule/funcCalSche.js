export function calculateClassSchedule(startDate, totalSessions, sessionsPerWeek, daysOfWeek, sessionDetails, room) {
  //console.log(startDate, totalSessions, sessionsPerWeek, daysOfWeek, sessionDetails, room);

  const currentDate = new Date(startDate);
  const currentThu = currentDate.getDay();
  let index = daysOfWeek[0];
  let min = 7;
  for (let i = 0; i < daysOfWeek.length; i++) {
    let hieu = daysOfWeek[i] - currentThu;
    if(hieu >= 0 && hieu < min) {
        min = hieu;
        index = daysOfWeek[i];
    }
  }
  startDate = new Date(startDate);
  let arr;
  if(currentThu > index) arr = [index, currentThu];
  else arr = [currentThu, index];
  startDate = new Date(startDate.setDate(startDate.getDate() + findSpace(arr,currentThu)));
  let totalSchedules = [];
  let space = 0;
  for(let i = 0; i < totalSessions; i ++) {
      startDate = new Date(startDate);
      startDate = new Date(startDate.setDate(startDate.getDate() + space));
      const id_session = sessionDetails.findIndex(item => item.day === index);
      totalSchedules.push({ 
          day: startDate.toISOString().split("T")[0],
          start_time: sessionDetails[id_session].startTime + ':00' ,
          end_time: sessionDetails[id_session].endTime + ':00',
          room
      });
      space = findSpace(daysOfWeek, index);
      if(index === daysOfWeek[daysOfWeek.length-1]) {
          index = daysOfWeek[0];
      } else {
          index = index + space;
      }
  }

  return totalSchedules;
}

// Example usage:
// const startDate = '2023-11-30';
// const totalSessions = 30;
// const sessionsPerWeek = 2;
// const daysOfWeek = [2, 5];
// const sessionDetails = [
//   { day: 2, startTime: { hour: '09', minute: '50' }, endTime: { hour: '11', minute: '20' } },
//   { day: 5, startTime: { hour: '19', minute: '30' }, endTime: { hour: '21', minute: '12' } }
// ];
// const room = 'B202';
const findSpace = (arr,thu) => {
    let index = 0;
    for(let i = 0; i < arr.length; i++) {
        if(thu === arr[i]) {
            index = i;
            break;
        }
    }
    let space = 0;
    if(index === arr.length-1) {
        space = 6 - arr[index] + arr[0] + 1;
    } else {
        space = arr[index + 1] - arr[index];
    }
    return space;
}
// const result = calculateClassSchedule(startDate, totalSessions, sessionsPerWeek, daysOfWeek, sessionDetails, room);