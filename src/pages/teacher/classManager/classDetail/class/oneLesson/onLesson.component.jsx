import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { useParams } from "react-router-dom";

import { 
  Header,
  TitleList,
  FlexNavLink,
  Section,
  Page,
  BtnBack
} from "./onLesson.styles";

const OneLesson = () => {
  const navigate = useNavigate();
  const { idSession, classCode } = useParams();

  return (
    <Page>
      <Header>
        <FlexNavLink to={`attendance/${idSession}`}>
          <TitleList>Attendance</TitleList>
        </FlexNavLink>
        <FlexNavLink to={`lessonContent/${idSession}`}>
          <TitleList>Lesson content</TitleList>
        </FlexNavLink>
        <FlexNavLink to={`reschedule/${idSession}`}>
          <TitleList>Reschedule</TitleList>
        </FlexNavLink>
      </Header>
      <Section>
        <Outlet />
      </Section>
      <BtnBack
        onClick={() => navigate(`/teacher/listClasses/classDetail/${classCode}/listLesson`)}
      >
        <IoMdArrowBack size="15px" />
        Back
      </BtnBack>
    </Page>
  );
};

export default OneLesson;
