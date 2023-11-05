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

    return (
        <Page>
            <Title>Details of class TI123</Title>
            <DivTeacher>Teacher Name: Tran Thi A</DivTeacher>
            <Body>
                <Left>
                    <InforClassDetailOfChild />
                </Left>
                <Right>
                    <ListLessonContent />
                </Right>
            </Body>
        </Page>
    )
}

export default ClassDetailOfChild;