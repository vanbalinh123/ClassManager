import { 
  Layout, 
  Div,
  Text,
  DivHead,
  DivBody,
  DivRole,
  DivDateTime,
  DivTitle,
  DivContent,
  DivBtn,
  Btn,
  Key,
} from "./detailNoti.styles";

const DetailNoti = ({ 
  setCheck, 
  value,
  calTime,
  calDate ,
  setValue
}) => {

  const handleClose = () => {
    setCheck(false)
    setValue({})
  }
  return (
    <>
      <Layout />
      <Div>
        <Text>Notification Detail</Text>
        <DivHead>
          <DivRole>
            <Key>Send to: </Key>
            <span>{value.role}</span>
          </DivRole>
          <DivDateTime>
            <div>
              <Key>Date: </Key>
              <span>{calDate(value.created_at)}</span>
            </div>
            <div>
              <Key>Time: </Key>
              <span>{calTime(value.created_at)}</span>
            </div>
          </DivDateTime>
        </DivHead>
        <DivBody>
          <DivTitle>
              <Key>Title:</Key>
              <span>{value.title}</span>
          </DivTitle>
          <DivContent>
            <Key>Content:</Key>
            <span>{value.content}</span>
          </DivContent>
        </DivBody>
        <DivBtn>
        <Btn
          onClick={() => handleClose()}
        >
            Exist
        </Btn>
      </DivBtn>
      </Div>
    </>
  );
};

export default DetailNoti;
