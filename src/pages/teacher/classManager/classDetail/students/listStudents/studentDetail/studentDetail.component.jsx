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
  toastError
}) => {
  const handleCancelClick = () => {
    setDetail(false);
  };

  const handleDeleteStudent = async () => {
    let newListStudents = infoClass?.students.filter(
      (item) => item !== studentDetail.usercode
    );
    
    const dataUpdate = {
        class_info: infoClass.class_info,
        Teachers: infoClass.Teachers,
        students: newListStudents,
    }

    const response = await updateInfoClass(dataUpdate);
    
    if(response.data) {
        await setDetail(false);
        toastSuccess('Student has been successfully removed from class!!');
        return;
    } 

    if(response.error) {
        toastError('Error!!!.');
        return;
    }
  };

  return (
    <Layout active={detail ? "active" : ""}>
      <Blur></Blur>
      <Detail>
        <Title>Student Detail</Title>
        <Content>
          <Left>
            <Div>
              <Span>Name:</Span>
              <Value>{studentDetail?.full_name}</Value>
            </Div>
            <Div>
              <Span>Code:</Span>
              <Value>{studentDetail?.usercode}</Value>
            </Div>
            <Div>
              <Span>Phone:</Span>
              <Value>{studentDetail?.mobile}</Value>
            </Div>
            <Div>
              <Span>First test:</Span>
              <Value>9</Value>
            </Div>
            <Div>
              <Span>Second test:</Span>
              <Value>7</Value>
            </Div>
            <Div>
              <Span>Total absence:</Span>
              <Value>2</Value>
            </Div>
            <Div>
              <Span>Absent Day 1</Span>
              <Value>22/12/2023</Value>
            </Div>
            <Div>
              <Span>Absent Day 2</Span>
              <Value>27/12/2023</Value>
            </Div>
          </Left>
          <Right>
            <Img src="/imgs/user-img.jpg" alt="avata" />
          </Right>
        </Content>
        <DivBtn>
          <Btn onClick={() => handleDeleteStudent()}>Delete</Btn>
          <Btn onClick={() => handleCancelClick()}>Cancel</Btn>
        </DivBtn>
      </Detail>
    </Layout>
  );
};

export default StudentDetail;
