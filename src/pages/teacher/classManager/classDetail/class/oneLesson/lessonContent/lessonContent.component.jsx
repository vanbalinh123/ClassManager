import { RiSaveLine } from "react-icons/ri";
import { Textarea, DivBtn, Btn } from "./lessonContent.styles";

const LessonContent = () => {
  return (
    <>
      <Textarea />
      <DivBtn>
        <Btn>
          <RiSaveLine size="15px" />
          Save
        </Btn>
      </DivBtn>
    </>
  );
};

export default LessonContent;
