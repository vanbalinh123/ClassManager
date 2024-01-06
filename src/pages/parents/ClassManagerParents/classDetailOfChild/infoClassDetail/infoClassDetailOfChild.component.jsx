import { useClassDetailQuery } from "../../../../../redux/api/leader/class-api.slice";
import { useListAttendanceQuery } from "../../../../../redux/api/teacher/attendance-api.slice";
import { useListTestsQuery } from "../../../../../redux/api/teacher/test-api";
import { useInforClassQuery } from "../../../../../redux/api/teacher/class-information-api";

import {
  DivTables,
  TitleTb,
  DivTable,
  Img,
} from "./infoClassDetailOfChild.styles";

import {
  Table,
  TableWrapper,
  Th,
  Td,
} from "../../../../../generalCss/table.styles";

const InforClassDetailOfChild = ({
  classCode,
  detailStudent,
  thisLessonContent,
  detailTeacher,
  thisSchedule,
}) => {
  const { data: classDetail } = useClassDetailQuery(classCode);
  const { data: listTests } = useListTestsQuery();
  const { data: classInfor } = useInforClassQuery(classCode);
  const findTuition = () => {
    const tuition = classInfor?.payment.find(
      (item) => item.student === detailStudent?.usercode
    );
    if (tuition) {
      return "Đã thanh toán";
    } else {
      return "Chưa thanh toán";
    }
  };

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

  return (
    <DivTables>
      <DivTable>
        <TitleTb>Thông tin học sinh</TitleTb>
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>Hình ảnh</Th>
                <Th>Mã học sinh</Th>
                <Th>Tên học sinh</Th>
                <Th>Email</Th>
                <Th>SDT</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td>
                {(detailStudent?.avatar && (
                    <Img src={detailStudent?.avatar} alt="avata" />
                  )) || <Img src="/imgs/user-img.jpg" alt="avata" />}
                </Td>
                <Td>{detailStudent?.usercode}</Td>
                <Td>{detailStudent?.full_name}</Td>
                <Td>{detailStudent?.email}</Td>
                <Td>{detailStudent?.mobile}</Td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>
      </DivTable>
      <DivTable>
        <TitleTb>Thông tin lớp học</TitleTb>
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>Tên lớp</Th>
                <Th>Mã lớp</Th>
                <Th>Khoá</Th>
                <Th>Tổng buổi</Th>
                <Th>Học phí</Th>
                <Th>Trạng thái</Th>
                <Th>Tổng vắng</Th>
                {findAbsentDay(detailStudent?.usercode).length > 0 &&
                  findAbsentDay(detailStudent?.usercode).map((day, index) => (
                    <Th key={index}></Th>
                  ))}
              </tr>
            </thead>
            <tbody>
              <Td>{classDetail?.class_name}</Td>
              <Td>{classDetail?.class_code}</Td>
              <Td>{classDetail?.course}</Td>
              <Td>{thisSchedule?.class_sessions_set?.length}</Td>
              <Td>{classDetail?.cost}</Td>
              {(findTuition() === "Chưa thanh toán" && (
                <Td style={{ color: "red" }}>{findTuition()}</Td>
              )) || <Td style={{ color: "#1a9ca6" }}>{findTuition()}</Td>}
              <Td>{countAttendance(detailStudent?.usercode)}</Td>
              {findAbsentDay(detailStudent?.usercode).length > 0 &&
                findAbsentDay(detailStudent?.usercode).map((day, index) => (
                  <Td style={{ color: "red" }} key={index}>
                    {day}
                  </Td>
                ))}
            </tbody>
          </Table>
        </TableWrapper>
      </DivTable>
      <DivTable>
        <TitleTb>Bảng điểm</TitleTb>
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                {listTestsOfThisClass?.map((item, index) => {
                  if (item.scores.length > 0) {
                    return <Th key={index}>{item.quiz_name}</Th>;
                  }
                })}
              </tr>
            </thead>

            {(listTestsOfThisClass?.length > 0 && (
              <tbody>
                {listTestsOfThisClass?.map((item, index) => {
                  if (item.scores.length > 0) {
                    return (
                      <Td key={index} style={{ color: "#1a9ca6" }}>
                        {countScore(item.id)}
                      </Td>
                    );
                  }
                })}
              </tbody>
            )) || (
              <div style={{ color: "red" }}>Chưa có bài kiểm tra nào !!!</div>
            )}
          </Table>
        </TableWrapper>
      </DivTable>
      <DivTable>
        <TitleTb>Thông tin giáo viên</TitleTb>
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>Hình ảnh</Th>
                <Th>Mã giáo viên</Th>
                <Th>Tên giáo viên</Th>
                <Th>Email</Th>
                <Th>SDT</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td>
                  {(detailTeacher?.avatar && (
                    <Img src={detailTeacher?.avatar} alt="avata" />
                  )) || <Img src="/imgs/user-img.jpg" alt="avata" />}
                </Td>
                <Td>{detailTeacher?.usercode}</Td>
                <Td>{detailTeacher?.full_name}</Td>
                <Td>{detailTeacher?.email}</Td>
                <Td>{detailTeacher?.mobile}</Td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>
      </DivTable>
    </DivTables>
  );
};

export default InforClassDetailOfChild;
