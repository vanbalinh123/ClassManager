import {AiOutlineClose} from 'react-icons/ai'
 
import { 
    DetailLesson,
    Title,
    Span,
    Date,
    Content,
    DivButton,
    Btn
} from "./detailLessonContent.styles"

const DetailLessonContent = ({setCheck, detail}) => {

    const handleCloseClick = () => {
        setCheck(false)
    }

    console.log(detail)

    return (
        <DetailLesson>
            <Title>
                <Span>Lesson Content</Span>
                <Date>{detail?.session_day}</Date>
            </Title>
            <Content>
                {detail?.content}
            </Content>
            <DivButton>
               <Btn
                    onClick={() => handleCloseClick()}
               >
                <AiOutlineClose size="15px"/>
                    Close
                </Btn>
            </DivButton>
        </DetailLesson>
    )
}

export default DetailLessonContent;