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
        <Text>Notification Detail</Text>
        <DivHead>
          {(selectedValue === "sent" && (
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
            {(selectedValue === "sent" && <span>{value.message}</span>) || (
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

export default DetailNotiTC;
