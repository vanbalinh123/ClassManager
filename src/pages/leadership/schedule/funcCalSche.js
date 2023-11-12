export function calculateClassSchedule(startDate, totalSessions, sessionsPerWeek, daysOfWeek, startTime, endTime, room) {
    const classSchedule = [];
    const currentDate = new Date(startDate);
  
    const allDaysOfWeek = [0, 1, 2, 3, 4, 5, 6];
  
    for (let i = 0; i < totalSessions; i++) {
      const dayOfWeek = daysOfWeek[i % daysOfWeek.length];
  
      let daysToAdd = dayOfWeek - currentDate.getDay();
      if (daysToAdd < 0) {
        daysToAdd += 7;
      }
      daysToAdd += (i / daysOfWeek.length) * 7 * sessionsPerWeek;
  
      const nextClassDate = new Date(currentDate);
      nextClassDate.setDate(currentDate.getDate() + daysToAdd);
  
      const classStartTime = new Date(nextClassDate);
      const classEndTime = new Date(nextClassDate);
      classStartTime.setHours(startTime.hour, startTime.minute);
      classEndTime.setHours(endTime.hour, endTime.minute);
  
      classSchedule.push({ date: nextClassDate, startTime: classStartTime, endTime: classEndTime, room: room });
    }
  
    return classSchedule;
}