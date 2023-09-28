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
    Btn
} from "./studentDeteil.styles";

const StudentDetail = ({ detail, setDetail }) => {

    const handleCancelClick = () => {
        setDetail(false)
    }


  return (
    <Layout active={detail ? "active" : ""}>
      <Blur></Blur>
      <Detail>
        <Title>Student Detail</Title>
        <Content>
            <Left>
                <Div>
                    <Span>Name:</Span>
                    <Value>Van Ba Linh</Value>
                </Div>
                <Div>
                    <Span>Code:</Span>
                    <Value>HS123</Value>
                </Div>
                <Div>
                    <Span>Phone:</Span>
                    <Value>0123456789</Value>
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
                <Img src='/imgs/user-img.jpg' alt="avata"/>
            </Right>
        </Content>
        <DivBtn>
            <Btn>Delete</Btn>
            <Btn
                onClick={() => handleCancelClick()}
            >Cancel</Btn>
        </DivBtn>
      </Detail>
    </Layout>
  );
};

export default StudentDetail;
