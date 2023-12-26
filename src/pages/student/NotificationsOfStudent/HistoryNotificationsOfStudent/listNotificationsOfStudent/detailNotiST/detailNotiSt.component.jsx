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
} from "./detailNotiSt.styles";

const DetailNotiST = ({ setCheck, value, setValue, selectedValue }) => {
  
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
          {(selectedValue === "teacher" && (
            <DivRole>
              <Key>Thông báo của lớp: </Key>
              <span>{value.class_code}</span>
            </DivRole>
          )) || (
            <DivRole>
              <Key>Người gửi: </Key>
              <span>{value.usercode}</span>
            </DivRole>
          )}

          <DivDateTime>
            <div>
              <Key>Ngày nhận: </Key>
              <span>{value.created_at.split(" ")[0]}</span>
            </div>
            <div>
              <Key>Giờ nhận: </Key>
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
            {(selectedValue === "teacher" && <span>{value.message}</span>) || (
              <span>{value.content}</span>
            )}
          </DivContent>
        </DivBody>
        <DivBtn>
          <Btn onClick={() => handleClose()}>Đóng</Btn>
        </DivBtn>
      </Div>
    </>
  );
};

export default DetailNotiST;
