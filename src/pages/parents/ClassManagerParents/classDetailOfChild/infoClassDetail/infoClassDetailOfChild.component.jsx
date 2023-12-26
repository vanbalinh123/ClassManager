import { useClassDetailQuery } from "../../../../../redux/api/leader/class-api.slice";
import { useListAttendanceQuery } from "../../../../../redux/api/teacher/attendance-api.slice";
import { useListTestsQuery } from "../../../../../redux/api/teacher/test-api";
import { BiUserX } from "react-icons/bi";
import { useInforClassQuery } from "../../../../../redux/api/teacher/class-information-api";

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
} from "./infoClassDetailOfChild.styles";

const InforClassDetailOfChild = ({
  classCode,
  detailStudent,
  thisLessonContent,
}) => {
  const { data: classDetail } = useClassDetailQuery(classCode);
  const { data: listTests } = useListTestsQuery();
  const { data: classInfor } = useInforClassQuery(classCode);
  const findTuition = () => {
    const tuition = classInfor?.payment.find(item => item.student === detailStudent?.usercode)
    console.log(detailStudent)
    if(tuition) {
      return 'Đã thanh toán'
    } else {
      return 'Chưa thanh toán'
    }
  }

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
      <Title>Kết quả học tập</Title>
      <Content>
        <Info>
          <Span>Tên học sinh:</Span>
          <Data>{detailStudent?.full_name}</Data>
        </Info>
        <Info>
          <Span>Tên lớp:</Span>
          <Data>{classDetail?.class_name}</Data>
        </Info>
        <Info>
          <Span>Mã lớp:</Span>
          <Data>{classDetail?.class_code}</Data>
        </Info>
        <Info>
          <Span>Học phí:</Span>
          <Data>{classDetail?.cost}</Data>
        </Info>
        <Info>
          <Span>Trạng thái:</Span>
          {findTuition() === 'Chưa thanh toán'
            && <Data style={{color: 'red'}}>{findTuition()}</Data>
            || <Data style={{color: '#1a9ca6'}}>{findTuition()}</Data>
          }
        </Info>
        <Info>
          <Span>Tổng số buổi vắng:</Span>
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

export default InforClassDetailOfChild;
