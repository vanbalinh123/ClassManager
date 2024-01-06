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
} from "./detailNotiTC.styles";

const DetailNotiTC = ({ setCheck, value, setValue, selectedValue }) => {
  
  const handleClose = () => {
    setCheck(false);
    setValue({});
  };
  
  return (
    <>
      <Layout />
      <Div>
        <Text>Chi tiết thông báo</Text>
        <DivHead>
          {(selectedValue === "sent" && (
            <DivRole>
              <Key>Gửi đến lớp: </Key>
              <span>{value.class_code}</span>
            </DivRole>
          )) || (
            <DivRole>
              <Key>Nhận từ: </Key>
              <span>{value.usercode}</span>
            </DivRole>
          )}

          <DivDateTime>
            <div>
              <Key>Ngày: </Key>
              <span>{value.created_at.split(" ")[0]}</span>
            </div>
            <div>
              <Key>Giờ: </Key>
              <span>{value.created_at.split(" ")[1]}</span>
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
            {(selectedValue === "sent" && <span>{value.message}</span>) || (
              <span>{value.content}</span>
            )}
          </DivContent>
        </DivBody>
        <DivBtn>
          <Btn onClick={() => handleClose()}>Thoát</Btn>
        </DivBtn>
      </Div>
    </>
  );
};

export default DetailNotiTC;
