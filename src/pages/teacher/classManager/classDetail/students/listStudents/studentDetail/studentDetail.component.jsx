import { RiUserForbidFill } from "react-icons/ri";

import {
  TableWrapper,
  Table,
  Th,
  Td,
} from "../../../../../../../generalCss/table.styles";

import {
  Layout,
  Detail,
  Blur,
  Title,
  Content,
  Left,
  Right,
  DivBtn,
  Div,
  Span,
  Value,
  Img,
  Btn,
  Value2,
  Div2,
  DivTable,
} from "./studentDeteil.styles";

const StudentDetail = ({
  detail,
  setDetail,
  studentDetail,
  infoClass,
  updateInfoClass,
  toastSuccess,
  toastError,
  countAttendance,
  findListScoreOfSt,
  listTestsOfThisClass,
  listLessonOfClass,
  listAttendance,
}) => {
  const handleCancelClick = () => {
    setDetail(false);
  };

  const userRole = JSON.parse(localStorage.getItem("userRole"));
  console.log(userRole);
  const handleDeleteStudent = async () => {
    let newListStudents = infoClass?.students.filter(
      (item) => item !== studentDetail.usercode
    );

    const dataUpdate = {
      class_info: infoClass.class_info,
      Teachers: infoClass.Teachers,
      students: newListStudents,
    };

    const response = await updateInfoClass(dataUpdate);

    if (response.data) {
      await setDetail(false);
      toastSuccess("Học sinh đã được xoá khỏi lớp");
      return;
    }

    if (response.error) {
      toastError("Đã xảy ra lỗi!!!");
      return;
    }
  };

  const listScore = findListScoreOfSt(studentDetail?.usercode);

  const findAbsentDay = (usercode) => {
    let result = [];
    let arrID = [];
    listLessonOfClass?.forEach((item) => arrID.push(item.id));
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

  return (
    <Layout active={detail ? "active" : ""}>
      <Blur></Blur>
      <Detail>
        <Title>Thông tin chi tiết</Title>
        <Content>
          <Left>
            <Div>
              <Span>Tên học sinh:</Span>
              <Value>{studentDetail?.full_name}</Value>
            </Div>
            <Div>
              <Span>Mã học sinh:</Span>
              <Value>{studentDetail?.usercode}</Value>
            </Div>
            <Div>
              <Span>Số điện thoại:</Span>
              <Value>{studentDetail?.mobile}</Value>
            </Div>
            <Div>
              <Span>Tổng ngày vắng:</Span>
              <Value>{countAttendance(studentDetail?.usercode)}</Value>
            </Div>
            {countAttendance(studentDetail?.usercode) > 0 && (
              <Div2>
                <Span>Ngày vắng</Span>
                {/* <Value>22/12/2023</Value> */}
                <Value2>
                  {findAbsentDay(studentDetail?.usercode).length > 0 &&
                    findAbsentDay(studentDetail?.usercode).map((day, index) => (
                      <span
                        style={{
                          color: "red",
                          display: "flex",
                          alignItems: "center",
                        }}
                        key={index}
                      >
                        <RiUserForbidFill /> {day}
                      </span>
                    ))}
                </Value2>
              </Div2>
            )}
          </Left>
          <Right>
            {(studentDetail?.avatar && (
              <Img src={studentDetail?.avatar} alt="avata" />
            )) || <Img src="/imgs/user-img.jpg" alt="avata" />}
          </Right>
        </Content>
        <DivTable>
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  {listScore?.map((item, index) => (
                    <Th key={index}>{listTestsOfThisClass[index].quiz_name}</Th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {listScore?.map((item, index) => (
                    <Td key={index}>{item.score}</Td>
                  ))}
                </tr>
              </tbody>
            </Table>
          </TableWrapper>
        </DivTable>

        <DivBtn>
          {userRole === "Admin" && (
            <Btn
              style={{ backgroundColor: "red" }}
              onClick={() => handleDeleteStudent()}
            >
              Xoá
            </Btn>
          )}

          <Btn onClick={() => handleCancelClick()}>Thoát</Btn>
        </DivBtn>
      </Detail>
    </Layout>
  );
};

export default StudentDetail;
