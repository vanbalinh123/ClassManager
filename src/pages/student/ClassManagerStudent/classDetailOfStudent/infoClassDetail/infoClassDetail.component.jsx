import { useClassDetailQuery } from "../../../../../redux/api/leader/class-api.slice";
import { useListAttendanceQuery } from "../../../../../redux/api/teacher/attendance-api.slice";
import { useListTestsQuery } from "../../../../../redux/api/teacher/test-api";
import { BiUserX } from "react-icons/bi";

import {
  Div,
  Title,
  Content,
  Info,
  Span,
  Data,
  TotalAbsent,
  DetailAbsent,
  DateAbsent,
} from "./infoClassDetail.styles";

const InforClassDetail = ({ classCode, detailStudent, thisLessonContent }) => {
  const { data: classDetail } = useClassDetailQuery(classCode);
  const { data: listTests } = useListTestsQuery();

  const listTestsOfThisClass = listTests?.filter(
    (item) => item.class_info === classCode
  );

  const { data: listAttendance } = useListAttendanceQuery();

  const countAttendance = (usercode) => {
    let sum = 0;
    let arrID = [];
    thisLessonContent?.forEach((item) => arrID.push(item.id));
    const listAttendanceOfClass = listAttendance?.filter((item) =>
      arrID.includes(item.lesson)
    );

    listAttendanceOfClass?.forEach((item) => {
      if (item.student === usercode && item.is_present === "absent") sum += 1;
    });

    return sum;
  };

  const findAbsentDay = (usercode) => {
    let result = [];
    let arrID = [];
    thisLessonContent?.forEach((item) => arrID.push(item.id));
    const listAttendanceOfClass = listAttendance?.filter((item) =>
      arrID.includes(item.lesson)
    );

    listAttendanceOfClass?.forEach((item) => {
      if (item.student === usercode && item.is_present === "absent") {
        result.push(item.session_day);
      }
    });

    return result;
  };

  const findListScoreOfSt = (usercode) => {
    let arr = [];
    listTestsOfThisClass?.map((item) => {
      const student = item.scores.find((item2) => item2.student === usercode);
      if (student) {
        arr.push(student);
      }
    });
    return arr;
  };

  const listScore = findListScoreOfSt(detailStudent?.usercode);

  const countScore = (id) => {
    let count;
    listScore?.map((item) => {
      if (item.test_and_quiz === id) {
        count = item.score;
      }
    });

    return count;
  };

  console.log(findAbsentDay("ST00039"));
  return (
    <Div>
      <Title>Learning outcomes</Title>
      <Content>
        <Info>
          <Span>Student Name:</Span>
          <Data>{detailStudent?.full_name}</Data>
        </Info>
        <Info>
          <Span>Class Name:</Span>
          <Data>{classDetail?.class_name}</Data>
        </Info>
        <Info>
          <Span>Class Code:</Span>
          <Data>{classDetail?.class_code}</Data>
        </Info>
        <Info>
          <Span>Total Absent:</Span>
          <Data>
            <TotalAbsent>
              {countAttendance(detailStudent?.usercode)}
            </TotalAbsent>
            <DetailAbsent>
              {findAbsentDay(detailStudent?.usercode).length > 0 &&
                findAbsentDay(detailStudent?.usercode).map((day, index) => (
                  <DateAbsent key={index}>
                    <BiUserX color="red" />
                    {day}
                  </DateAbsent>
                ))}
            </DetailAbsent>
          </Data>
        </Info>
        {listTestsOfThisClass?.map((item, index) => {
          if (item.scores.length > 0) {
            return (
              <Info key={index}>
                <Span>{item.quiz_name}</Span>
                <Data>{countScore(item.id)}</Data>
              </Info>
            );
          }
        })}
      </Content>
    </Div>
  );
};

export default InforClassDetail;
