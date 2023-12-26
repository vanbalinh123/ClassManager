import { useState, useEffect } from "react";
import BarChartClass from "./chartDbClass/chartDbClass.component";
import {
  Div,
  DivHead,
  DivSelect,
  SpanName,
  Select,
  Option,
  DivBody,
} from "./dbClass.styles";
import {
  useListAdminsQuery,
  useListTeachersQuery,
  useListStudentsQuery,
  useListParentsQuery,
} from "../../../../redux/api/leader/list-users-api.slice";

const ChartClass = () => {
  const [quantity, setQuantity] = useState(8);
  const { data: listAdmin } = useListAdminsQuery();
  const { data: listTeacher } = useListTeachersQuery();
  const { data: listStudent } = useListStudentsQuery();
  const { data: listParent } = useListParentsQuery();

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
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const getRoleCounts = (roleList) => {
    const filteredList = roleList?.filter((user) => {
      const createdAt = new Date(user.created_at);
      const createdAtMonth = createdAt.getMonth() + 1; // getMonth trả về từ 0-11
      const createdAtYear = createdAt.getFullYear();

      return (
        (!selectedMonth || createdAtMonth === parseInt(selectedMonth, 10)) &&
        (!selectedYear || createdAtYear === parseInt(selectedYear, 10))
      );
    });

    const roleCounts = filteredList?.reduce((countMap, user) => {
      countMap[user.role] = (countMap[user.role] || 0) + 1;
      return countMap;
    }, {});

    return roleCounts;
  };

  const getChartData = (roleCounts) => {
    const roles = Object.keys(roleCounts);
    const counts = roles.map((role) => roleCounts[role]);

    const chartData = [
      {
        type: "bar",
        x: roles,
        y: counts,
        marker: { color: "#83D9EC" },
      },
    ];

    return chartData;
  };

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const adminCounts = getRoleCounts(listAdmin);
    const teacherCounts = getRoleCounts(listTeacher);
    const studentCounts = getRoleCounts(listStudent);
    const parentCounts = getRoleCounts(listParent);

    const combinedCounts = {
      admin: adminCounts ? adminCounts["admin"] || 0 : 0,
      teacher: teacherCounts ? teacherCounts["teacher"] || 0 : 0,
      student: studentCounts ? studentCounts["student"] || 0 : 0,
      parent: parentCounts ? parentCounts["parent"] || 0 : 0,
    };

    setChartData(getChartData(combinedCounts));
  }, [
    listAdmin,
    listTeacher,
    listStudent,
    listParent,
    selectedMonth,
    selectedYear,
  ]);

  const layout = {
    title: "Tổng số tài khoản được tạo",
    xaxis: { title: "Vai trò" },
    yaxis: { title: "Số lượng" },
  };

  return (
    <Div>
      <DivBody>
        <BarChartClass chartData={chartData} layout={layout} />
      </DivBody>
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
      </DivHead>
    </Div>
  );
};

export default ChartClass;
