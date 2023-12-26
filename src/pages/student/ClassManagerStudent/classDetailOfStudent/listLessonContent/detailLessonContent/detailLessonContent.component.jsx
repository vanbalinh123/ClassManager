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
                <Span>Nội dung bài học</Span>
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
                    Đóng
                </Btn>
            </DivButton>
        </DetailLesson>
    )
}

export default DetailLessonContent;