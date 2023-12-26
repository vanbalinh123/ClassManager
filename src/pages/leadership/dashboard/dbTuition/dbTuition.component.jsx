import { useEffect, useState } from "react";
import { useListCostQuery } from "../../../../redux/api/leader/cost-api.slice";
import { useListClassQuery } from "../../../../redux/api/leader/class-api.slice";
import BarChartTuition from "./charTuition/chartTuition.component";
import {
  Div,
  DivHead,
  DivSelect,
  SpanName,
  Select,
  Option,
  DivBody,
} from "./dbTuition.styles";

const ChartTuition = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(""); 
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
 
  const { data: listCost } = useListCostQuery();
  const { data: listClass } = useListClassQuery();

  const uniqueCourses = [...new Set(listClass?.map((classItem) => classItem.course))];

  const calculateRevenue = () => {
    const revenueData = [];
  
    listCost?.forEach((costItem) => {
      const classItem = listClass?.find((classInfo) => classInfo.class_code === costItem.classInformation);
  
      if (
        classItem &&
        (!selectedMonth || new Date(costItem.date).getMonth() + 1 === parseInt(selectedMonth)) &&
        (!selectedYear || new Date(costItem.date).getFullYear() === parseInt(selectedYear)) &&
        (!selectedCourse || classItem.course === selectedCourse)
      ) {
        const existingRevenueItem = revenueData.find((revenueItem) => revenueItem.class_code === costItem.classInformation);
  
        if (existingRevenueItem) {
          existingRevenueItem.revenue += classItem.cost;
        } else {
          revenueData.push({
            class_code: costItem.classInformation,
            revenue: classItem.cost,
          });
        }
      }
    });
  
    return revenueData;
  };
  

  const revenueData = calculateRevenue();

  const chartData = [
    {
      x: revenueData.map((item) => item.class_code),
      y: revenueData.map((item) => item.revenue),
      type: "bar",
      marker: { color: "#83D9EC" },
    },
  ];

  const layout = {
    title: "Biểu đồ Doanh Thu",
    xaxis: { title: "Lớp" },
    yaxis: { title: "Tổng tiền" },
  };

  return (
    <Div>
      <DivHead>
        <DivSelect>
          <SpanName>Month:</SpanName>
          <Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
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
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <Option value="">All</Option>
            {yearsList.map((item, index) => (
              <Option key={index} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </DivSelect>
        <DivSelect>
          <SpanName>Course:</SpanName>
          <Select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <Option value="">All</Option>
            {uniqueCourses.map((course, index) => (
              <Option key={index} value={course}>
                {course}
              </Option>
            ))}
          </Select>
        </DivSelect>
      </DivHead>
      <DivBody>
        <BarChartTuition chartData={chartData} layout={layout} />
      </DivBody>
    </Div>
  );
};

export default ChartTuition;
