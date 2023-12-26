import { useState, useEffect } from "react";
import BarChartAbsent from "./chartDbAbsent/chartDbAbsent.component";
import { useListAttendanceQuery } from "../../../../redux/api/teacher/attendance-api.slice";

import {
  Div,
  DivHead,
  DivSelect,
  SpanName,
  Select,
  Option,
  DivBody,
} from "./dbAsbsent.styles";

const ChartAbsent = () => {
  const { data: listAttendance } = useListAttendanceQuery();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const calculateYears = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 2023;
    const years = [];

    for (let year = startYear; year <= currentYear; year++) {
      years.push(year);
    }

    return years;
  };

  const yearsList = calculateYears();
  const [data, setData] = useState([]); 

  useEffect(() => {
    const filteredData = listAttendance?.filter((item) => {
      if (selectedMonth && selectedYear) {
        const itemDate = new Date(item.session_day);
        const itemMonth = itemDate.getMonth() + 1;
        const itemYear = itemDate.getFullYear();
        return itemMonth === selectedMonth && itemYear === selectedYear;
      }
      return true; // Tìm kiếm tất cả nếu không có tháng hoặc năm được chọn
    });

    const attendanceData = filteredData?.reduce(
      (result, item) => {
        if (item.is_present === "absent") {
          result.absentCount += 1;
        } else if (item.is_present === "present") {
          result.presentCount += 1;
        }
        return result;
      },
      { absentCount: 0, presentCount: 0 }
    );

  
    const chartData = [
      {
        x: ["Absent", "Present"],
        y: [attendanceData?.absentCount, attendanceData?.presentCount],
        // labels: ["Absent", "Present"],
        // values: [attendanceData?.absentCount, attendanceData?.presentCount],
        type: "bar",
        marker: { color: ["#d85858", "#83D9EC"] },
      },
    ];

    setData(chartData);
  }, [listAttendance, selectedMonth, selectedYear]);

  const layout = {
    title: "Biểu đồ điểm danh",
    xaxis: { title: "Trạng thái" },
    yaxis: { title: "Tổng số học sinh" },
  };

  return (
    <Div>
      <DivBody>
        <BarChartAbsent chartData={data} layout={layout}/>
      </DivBody>
      <DivHead>
        <DivSelect>
          <SpanName>Month:</SpanName>
          <Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
          >
            <Option value="">All</Option>
            {months.map((item, index) => (
              <Option key={index} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </DivSelect>
        <DivSelect>
          <SpanName>Year:</SpanName>
          <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            <Option value="">All</Option>
            {yearsList.map((item, index) => (
              <Option key={index} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </DivSelect>
      </DivHead>
    </Div>
  );
};

export default ChartAbsent;
