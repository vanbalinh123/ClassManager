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
        <Text>Notification Detail</Text>
        <DivHead>
          {(selectedValue === "teacher" && (
            <DivRole>
              <Key>Sent to class: </Key>
              <span>{value.class_code}</span>
            </DivRole>
          )) || (
            <DivRole>
              <Key>From to: </Key>
              <span>{value.usercode}</span>
            </DivRole>
          )}

          <DivDateTime>
            <div>
              <Key>Date: </Key>
              <span>{value.created_at.split(" ")[0]}</span>
            </div>
            <div>
              <Key>Time: </Key>
              <span>{value.created_at.split(" ")[1]}</span>
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
            {(selectedValue === "teacher" && <span>{value.message}</span>) || (
              <span>{value.content}</span>
            )}
          </DivContent>
        </DivBody>
        <DivBtn>
          <Btn onClick={() => handleClose()}>Exist</Btn>
        </DivBtn>
      </Div>
    </>
  );
};

export default DetailNotiST;
