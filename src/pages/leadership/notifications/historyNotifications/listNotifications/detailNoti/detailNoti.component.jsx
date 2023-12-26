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
        <Text>Chi tiết thông báo</Text>
        <DivHead>
          <DivRole>
            <Key>Gửi đến: </Key>
            <span>{value.role}</span>
          </DivRole>
          <DivDateTime>
            <div>
              <Key>Ngày: </Key>
              <span>{calDate(value.created_at)}</span>
            </div>
            <div>
              <Key>Thời gian: </Key>
              <span>{calTime(value.created_at)}</span>
            </div>
          </DivDateTime>
        </DivHead>
        <DivBody>
          <DivTitle>
              <Key>Tiêu đề:</Key>
              <span>{value.title}</span>
          </DivTitle>
          <DivContent>
            <Key>Nội dung:</Key>
            <span>{value.content}</span>
          </DivContent>
        </DivBody>
        <DivBtn>
        <Btn
          onClick={() => handleClose()}
        >
            Thoát
        </Btn>
      </DivBtn>
      </Div>
    </>
  );
};

export default DetailNoti;
