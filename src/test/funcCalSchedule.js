function calculateClassSchedule(startDate, totalSessions, sessionsPerWeek, daysOfWeek, startTime, endTime) {
    const classSchedule = [];
    const currentDate = new Date(startDate);
  
    // Tạo một mảng với tất cả các ngày trong tuần (0 là Chủ Nhật, 1 là Thứ Hai, v.v.)
    const allDaysOfWeek = [0, 1, 2, 3, 4, 5, 6];
  
    for (let i = 0; i < totalSessions; i++) {
      // Tìm ngày trong tuần dựa trên thứ ngày học
      const dayOfWeek = daysOfWeek[i % daysOfWeek.length];
  
      // Tính toán ngày học dựa trên thứ ngày trong tuần và số buổi học/tuần
      let daysToAdd = dayOfWeek - currentDate.getDay();
      if (daysToAdd < 0) {
        daysToAdd += 7;
      }
      daysToAdd += (i / daysOfWeek.length) * 7 * sessionsPerWeek;
  
      // Tính ngày học bằng cách thêm số ngày vào ngày bắt đầu
      const nextClassDate = new Date(currentDate);
      nextClassDate.setDate(currentDate.getDate() + daysToAdd);
  
      // Tính giờ bắt đầu và giờ kết thúc
      const classStartTime = new Date(nextClassDate);
      const classEndTime = new Date(nextClassDate);
      classStartTime.setHours(startTime.hour, startTime.minute);
      classEndTime.setHours(endTime.hour, endTime.minute);
  
      classSchedule.push({ date: nextClassDate, startTime: classStartTime, endTime: classEndTime });
    }
  
    return classSchedule;
  }
  
  // Sử dụng ví dụ
  const startDate = new Date("2023-09-18"); // Ngày bắt đầu
  const totalSessions = 10; // Tổng số buổi học
  const sessionsPerWeek = 2; // Số buổi học/tuần
  const daysOfWeek = [1, 3]; // Thứ ngày học trong tuần (1 là Thứ Hai, 3 là Thứ Tư)
  const startTime = { hour: 9, minute: 0 }; // Giờ bắt đầu (9:00 AM)
  const endTime = { hour: 11, minute: 0 }; // Giờ kết thúc (11:00 AM)
  
  const classSchedule = calculateClassSchedule(startDate, totalSessions, sessionsPerWeek, daysOfWeek, startTime, endTime);
  console.log(classSchedule);
  