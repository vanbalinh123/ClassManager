import { useListClassSessionQuery } from "../../../../../../../redux/api/leader/class-session.slice";

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
  const { data: listClassSession } = useListClassSessionQuery();

  const handleCancelClick = () => {
    setDetail(false);
  };

  console.log(listLessonOfClass);

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
      toastSuccess("Student has been successfully removed from class!!");
      return;
    }

    if (response.error) {
      toastError("Error!!!.");
      return;
    }
  };

  const listScore = findListScoreOfSt(studentDetail?.usercode);

  const findAbsent = (usercode) => {
    let result = [];
    let arrID = [];
    listLessonOfClass?.forEach((item) => arrID.push(item.id));
    const listAttendanceOfClass = listAttendance?.filter((item) =>
      arrID.includes(item.lesson)
    );

    listAttendanceOfClass?.forEach((item) => {
      if (item.student === usercode && item.is_present === "absent") {
        result.push(item);
      }
    });

    return result;
  };

  console.log(findAbsent(studentDetail?.usercode));

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
            {listScore?.map((item, index) => (
              <Div>
                <Span>{listTestsOfThisClass[index].quiz_name}</Span>
                <Value>{item.score}</Value>
              </Div>
            ))}
            <Div>
              <Span>Tổng ngày vắng:</Span>
              <Value>{countAttendance(studentDetail?.usercode)}</Value>
            </Div>
            <Div>
              <Span>Ngày vắng chưa sửa</Span>
              <Value>22/12/2023</Value>
            </Div>
          </Left>
          <Right>
            <Img src="/imgs/user-img.jpg" alt="avata" />
          </Right>
        </Content>
        <DivBtn>
          <Btn onClick={() => handleDeleteStudent()}>Xoá</Btn>
          <Btn onClick={() => handleCancelClick()}>Thoát</Btn>
        </DivBtn>
      </Detail>
    </Layout>
  );
};

export default StudentDetail;
