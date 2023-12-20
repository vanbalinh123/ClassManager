import { useParams } from "react-router-dom";

import { useListSchedulesQuery } from "../../../../redux/api/leader/schedule-api.slice";
import { useDetailTeacherQuery } from "../../../../redux/api/teacher/list-teachers-api.slice";
import { useDetailStudentQuery } from "../../../../redux/api/student/list-students-api.slice";
import { useListLessonContentsQuery } from "../../../../redux/api/teacher/lesson-content-api.slice";

import { Page, Title } from "../../../../generalCss/shared.styles"
import InforClassDetailOfChild from "./infoClassDetail/infoClassDetailOfChild.component";
import ListLessonContent from "../../../student/ClassManagerStudent/classDetailOfStudent/listLessonContent/listLessonContent.component";

import { 
    Body,
    DivTeacher,
    Left,
    Right 
} from "./classDetailOfChild.styles"

const ClassDetailOfChild = () => {
    const { classCode, userCodeStudent: userCode } = useParams();
    const { data: listSchedule } = useListSchedulesQuery();
    const thisSchedule = listSchedule?.find(item => item.class_code === classCode);
    const { data: detailTeacher } = useDetailTeacherQuery(thisSchedule?.teacher_code)
    const { data: detailStudent } = useDetailStudentQuery(userCode);
    const { data: listLessonContent } = useListLessonContentsQuery();
    
    const thisLessonContent = listLessonContent?.filter(
        (item) => item.class_info === classCode
      );
    
    return (
        <Page>
            <Title>Details of class {classCode}</Title>
            <DivTeacher>Teacher Name: {detailTeacher?.full_name}</DivTeacher>
            <Body>
                <Left>
                    <InforClassDetailOfChild 
                        classCode={classCode}
                        detailStudent={detailStudent}
                        thisLessonContent={thisLessonContent}
                    />
                </Left>
                <Right>
                    <ListLessonContent 
                        thisLessonContent={thisLessonContent}
                    />
                </Right>
            </Body>
        </Page>
    )
}

export default ClassDetailOfChild;