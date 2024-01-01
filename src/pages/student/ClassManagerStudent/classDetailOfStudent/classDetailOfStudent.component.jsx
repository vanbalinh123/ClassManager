import { useParams } from "react-router-dom";
import { useListSchedulesQuery } from "../../../../redux/api/leader/schedule-api.slice";
import { useDetailTeacherQuery } from "../../../../redux/api/teacher/list-teachers-api.slice";
import { useDetailStudentQuery } from "../../../../redux/api/student/list-students-api.slice";
import { useListLessonContentsQuery } from "../../../../redux/api/teacher/lesson-content-api.slice";
import { Page, Title } from "../../../../generalCss/shared.styles";
import InforClassDetail from "./infoClassDetail/infoClassDetail.component";

const ClassDetailOfStudent = () => {
  const { classCode } = useParams();
  const { data: listSchedule } = useListSchedulesQuery();
  const thisSchedule = listSchedule?.find(
    (item) => item.class_code === classCode
  );
  
  const { data: detailTeacher } = useDetailTeacherQuery(
    thisSchedule?.teacher_code
  );
  const userCode = JSON.parse(localStorage.getItem("user_code"));
  const { data: detailStudent } = useDetailStudentQuery(userCode);
  const { data: listLessonContent } = useListLessonContentsQuery();

  const thisLessonContent = listLessonContent?.filter(
    (item) => item.class_info === classCode
  );



  return (
    <Page>
      <Title>Chi tiết lớp {classCode}</Title>
      <div
        style={{
          width: "90%",
          margin: "0 auto",
          paddingTop: "30px",
          paddingBottom: "30px",
        }}
      >
        <InforClassDetail
          classCode={classCode}
          detailStudent={detailStudent}
          thisLessonContent={thisLessonContent}
          detailTeacher={detailTeacher}
          thisSchedule={thisSchedule}
        />
      </div>
    </Page>
  );
};

export default ClassDetailOfStudent;
