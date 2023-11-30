function getDayOfWeek(dateString) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date(dateString);
  const dayOfWeek = daysOfWeek[date.getDay()];
  return daysOfWeek.indexOf(dayOfWeek);
}


export function filterDays(scheduleDetails, totalSessionsPerWeek) {
  const selectedDays = [];
  
  for (const item of scheduleDetails) {
    const dayOfWeek = getDayOfWeek(item.day);
    
    // Nếu ngày trong tuần chưa được thêm vào mảng
    if (!selectedDays.some(day => day.dayOfWeek === dayOfWeek)) {
      console.log(item)
      selectedDays.push({
        dayOfWeek,
        startTime: item.start_time,
        endTime: item.end_time,
      });
    }

    // Nếu đã đủ số ngày cần thiết, dừng vòng lặp
    if (selectedDays.length === totalSessionsPerWeek) {
      break;
    }
  }

  return selectedDays;
}


// const scheduleDetails = [
//   { day: '2023-11-26', start_time: '09:00', end_time: '11:00' },
//   { day: '2023-11-27', start_time: '14:00', end_time: '16:00' },
//   { day: '2023-12-04', start_time: '09:00', end_time: '11:00' },
//   { day: '2023-12-10', start_time: '14:00', end_time: '16:00' },
// ];

// const totalSessionsPerWeek = 2; 

// const result = filterDays(scheduleDetails, totalSessionsPerWeek);
// console.log(result);
