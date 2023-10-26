import { Page, Title } from "../../../../generalCss/shared.styles"
import InforClassDetail from "./infoClassDetail/infoClassDetail.component"
import ListLessonContent from "./listLessonContent/listLessonContent.component"

import { 
    Body,
    DivTeacher,
    Left,
    Right 
} from "./classDetailOfStudent.styles"

const ClassDetailOfStudent = () => {

    return (
        <Page>
            <Title>Details of class TI123</Title>
            <DivTeacher>Teacher Name: Tran Thi A</DivTeacher>
            <Body>
                <Left>
                    <InforClassDetail />
                </Left>
                <Right>
                    <ListLessonContent />
                </Right>
            </Body>
        </Page>
    )
}

export default ClassDetailOfStudent