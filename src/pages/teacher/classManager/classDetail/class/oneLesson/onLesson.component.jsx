import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
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
  return (
    <Page>
      <Header>
        <FlexNavLink to='attendance'>
          <TitleList>Attendance</TitleList>
        </FlexNavLink>
        <FlexNavLink to='lessonContent'>
          <TitleList>Lesson content</TitleList>
        </FlexNavLink>
        <FlexNavLink to='reschedule'>
          <TitleList>Reschedule</TitleList>
        </FlexNavLink>
      </Header>
      <Section>
        <Outlet />
      </Section>
      <BtnBack
        onClick={() => navigate("/teacher/listClasses/classDetail/listLesson")}
      >
        <IoMdArrowBack size="15px" />
        Back
      </BtnBack>
    </Page>
  );
};

export default OneLesson;
