import { useEffect, useState } from "react";
import { useListTestsQuery } from "../../../../redux/api/teacher/test-api";
import { useListClassQuery } from "../../../../redux/api/leader/class-api.slice";
import BarChartScore from "./chartDbScore/chartDbScore.component";
import { Div, DivHead, DivSelect, SpanName, Select, Option, DivBody } from "./dbScore.styles";

const ChartScore = () => {
  const { data: listTests } = useListTestsQuery();
  const { data: listClass } = useListClassQuery();

  const sortCourses = (courses) => {
    return courses.sort((a, b) => {
      const getNumericPart = (str) => parseInt(str.replace(/\D/g, ""), 10);
      const courseA = getNumericPart(a);
      const courseB = getNumericPart(b);
      return courseB - courseA;
    });
  };

  const updateListCourse = (courses) => {
    const uniqueCourses = [...new Set(courses)]; // Loại bỏ sự trùng lặp
    return sortCourses(["All", ...uniqueCourses]);
  };

  const [listCourse, setListCourse] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (listClass?.length > 0) {
      const updatedListCourse = updateListCourse(listClass.map((item) => item.course));
      setListCourse(updatedListCourse);

      if (!selectedCourse || !updatedListCourse.includes(selectedCourse)) {
        setSelectedCourse("All");
      }

      const newData = countScore(listTests, selectedCourse, listClass);
      setData(newData);
    }
  }, [listTests, listClass, selectedCourse]);

  const countScore = (tests, selectedCourse, classList) => {
    let arr = [];

    if (selectedCourse === "All") {
      // Xử lý khi chọn "All"
      let filteredList = [];
      tests?.map((item) => {
        classList?.map((item2) => {
          if (item.class_info === item2.class_code) filteredList.push(item);
        });
      });

      filteredList?.forEach((item) => {
        item?.scores.forEach((item2) => {
          const existingItem = arr.find((element) => element.diem === item2.score);

          if (existingItem) {
            existingItem.soluong += 1;
          } else {
            arr.push({ diem: item2.score, soluong: 1 });
          }
        });
      });

      arr.sort((a, b) => a.diem - b.diem);
    } else {
      // Xử lý khi chọn một khóa học cụ thể
      let listOfCourse = classList?.filter((item) => item.course === selectedCourse);
      let filteredList = [];
      tests?.map((item) => {
        listOfCourse?.map((item2) => {
          if (item.class_info === item2.class_code) filteredList.push(item);
        });
      });

      filteredList?.forEach((item) => {
        item?.scores.forEach((item2) => {
          const existingItem = arr.find((element) => element.diem === item2.score);

          if (existingItem) {
            existingItem.soluong += 1;
          } else {
            arr.push({ diem: item2.score, soluong: 1 });
          }
        });
      });

      arr.sort((a, b) => a.diem - b.diem);
    }

    return arr;
  };

  const histogramData = [
    {
      x: data?.map((item) => item.diem),
      y: data?.map((item) => item.soluong),
      type: "line",
      marker: { color: "#83D9EC" },
    },
  ];

  const layout = {
    title: "Biểu đồ điểm số",
    xaxis: { title: "Điểm (Từ 0 đến 10)" },
    yaxis: { title: "Số Lượng" },
  };

  return (
    <Div>
      <DivHead>
        <DivSelect>
          <SpanName>Khoá:</SpanName>
          <Select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            {listCourse?.map((item, index) => (
              <Option key={index} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </DivSelect>
      </DivHead>
      <DivBody>
        <BarChartScore
          chartData={histogramData}
          layout={layout}
          styles={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
        />
      </DivBody>
    </Div>
  );
};

export default ChartScore;
