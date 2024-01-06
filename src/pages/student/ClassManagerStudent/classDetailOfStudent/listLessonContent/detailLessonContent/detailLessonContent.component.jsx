import { AiOutlineClose } from "react-icons/ai";

import {
  DetailLesson,
  Title,
  Span,
  Date,
  Content,
  DivButton,
  Btn,
  Div,
  DivFile,
  Files
} from "./detailLessonContent.styles";

const DetailLessonContent = ({ setCheck, detail }) => {
  const handleCloseClick = () => {
    setCheck(false);
  };

  return (
    <>
      <Div></Div>
      <DetailLesson>
        <Title>
          <Span>Nội dung bài học</Span>
          <Date>{detail?.session_day}</Date>
        </Title>
        <Content>{detail?.content}</Content>
        <DivFile>
          <span style={{fontWeight: 'bold'}}>Tệp đính kèm</span>
          <Files>
            {detail.File.length > 0 && detail.File.map((item) => (
              <a
                href={item.file}
                download={item.file}
                style={{ display: "block" }}
              >
                {item.file !== null ? item.file.slice(33) : "Không có tệp đính kèm!!"}
              </a>
            )) || <p>Không có tệp đính kèm!!!</p>}
          </Files>
        </DivFile>
        <DivButton>
          <Btn onClick={() => handleCloseClick()}>
            <AiOutlineClose size="15px" />
            Đóng
          </Btn>
        </DivButton>
      </DetailLesson>
    </>
  );
};

export default DetailLessonContent;
