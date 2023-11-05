let db = [
  {
    role: "admin",
    id: 1,
    userName: "admin123",
    email: "admin@example.com",
    password: "adminpass",
    phone: "123-456-7890",
    userCode: "ADM123",
    createdAccounts: ["teacher123", "student456", "parent789"],
    classList: [
      {
        className: "Class A",
        classCode: "CA123",
        courseName: "Math 101",
      },
      {
        className: "Class B",
        classCode: "CB456",
        courseName: "Science 202",
      },
    ],
    teachingSchedules: [
      {
        teacherCode: "TCH789",
        teacherName: "John Doe",
        classCode: "CA123",
        sessionsPerCourse: 20,
        sessionsPerWeek: 4,
        startDate: "2023-09-01",
        endDate: "2023-12-15",
        classroom: "Room 101",
        scheduleDetails: [
          {
            day: "Monday",
            startTime: "09:00 AM",
            endTime: "10:30 AM",
          },
          {
            day: "Wednesday",
            startTime: "09:00 AM",
            endTime: "10:30 AM",
          },
          {
            day: "Friday",
            startTime: "09:00 AM",
            endTime: "10:30 AM",
          },
        ],
      },
    ],
    notifications: [
      {
        title: "Important Announcement",
        content: "School closed on public holidays.",
      },
    ],
    notificationHistory: [
      {
        title: "Class Canceled",
        content: "Math 101 class on Monday is canceled.",
      },
    ],
  },
  {
    role: "teacher",
    id: 2,
    userName: "teacher123",
    email: "teacher@example.com",
    password: "teacherpass",
    phone: "987-654-3210",
    userCode: "TCH789",
    teachingSchedules: [
      {
        classCode: "CA123",
        sessionsPerCourse: 20,
        sessionsPerWeek: 4,
        startDate: "2023-09-01",
        endDate: "2023-12-15",
        classroom: "Room 101",
        scheduleDetails: [
          {
            day: "Monday",
            startTime: "09:00 AM",
            endTime: "10:30 AM",
          },
          {
            day: "Wednesday",
            startTime: "09:00 AM",
            endTime: "10:30 AM",
          },
          {
            day: "Friday",
            startTime: "09:00 AM",
            endTime: "10:30 AM",
          },
        ],
      },
    ],
    classDetails: [
      {
        classCode: "CA123",
        className: "Class A",
        students: ["student123", "student124"],
        attendance: [
          {
            date: "2023-09-02",
            attendanceList: ["student123", "student124"],
          },
        ],
        tests: [
          {
            testTitle: "Math Quiz 1",
            scoreList: [
              {
                studentCode: "student123",
                score: 95,
              },
              {
                studentCode: "student124",
                score: 88,
              },
            ],
          },
        ],
        announcements: [
          {
            title: "Homework Reminder",
            content: "Don't forget to submit your homework.",
          },
        ],
      },
    ],
    notificationHistory: [
      {
        title: "Class Canceled",
        content: "Math 101 class on Monday is canceled.",
      },
    ],
  },
  {
    role: "student",
    id: 3,
    userName: "student123",
    email: "student@example.com",
    password: "studentpass",
    phone: "555-123-4567",
    userCode: "STD456",
    classSchedules: [
      {
        classCode: "CA123",
        className: "Class A",
        attendanceCount: 15,
        testScores: [
          {
            testTitle: "Math Quiz 1",
            score: 95,
          },
        ],
        classDetails: [
          {
            sessionDate: "2023-09-02",
            attendanceStatus: "Present",
          },
        ],
        lessonContents: [
          {
            contentTitle: "Algebra Basics",
            contentDetails: "Introduction to algebraic expressions.",
          },
        ],
      },
    ],
    notifications: [
      {
        title: "Homework Reminder",
        content: "Math homework due on Friday.",
      },
    ],
    notificationHistory: [
      {
        title: "Class Canceled",
        content: "Math 101 class on Monday is canceled.",
      },
    ],
  },
  {
    role: "parents",
    id: 4,
    userName: "parent789",
    email: "parent@example.com",
    password: "parentpass",
    phone: "111-222-3333",
    userCode: "PRN101",
    childSchedules: [
      {
        childCode: "STD456",
        childName: "Student 123",
        classSchedules: [
          {
            classCode: "CA123",
            className: "Class A",
            attendanceCount: 15,
            testScores: [
              {
                testTitle: "Math Quiz 1",
                score: 95,
              },
            ],
          },
        ],
      },
    ],
    notifications: [
      {
        title: "Class Schedule Change",
        content: "Class A schedule changed to Mondays and Thursdays.",
      },
    ],
    notificationHistory: [
      {
        title: "Homework Reminder",
        content: "Math homework due on Friday.",
      },
    ],
  },
];
