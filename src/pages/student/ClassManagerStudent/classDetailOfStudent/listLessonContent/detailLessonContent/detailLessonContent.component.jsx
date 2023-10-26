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

const DetailLessonContent = ({setCheck}) => {

    const handleCloseClick = () => {
        setCheck(false)
    }

    return (
        <DetailLesson>
            <Title>
                <Span>Lesson Content</Span>
                <Date>22/11/2023</Date>
            </Title>
            <Content>
            - Cách hiểu thứ nhất (đoạn ý): Đoạn văn được dùng với ý nghĩa để chỉ sự phân đoạn nội dung, phân đoạn ý của văn bản. Một văn bản bao gồm nhiều đoạn văn: Đoạn mở đầu văn bản, những đoạn khai triển văn bản, đoạn kết thúc văn bản. Mỗi đoạn phải có sự hoàn chỉnh nhất định nào đó về mặt ý, về mặt nội dung. Nhưng thế nào là một nội dung, một ý hoàn chỉnh thì không có tiêu chí để xác định rõ ràng. Một văn bản, tuỳ theo người đọc cảm nhận mà phân chia ra thành các đoạn, sự phân chia có thể không thống nhất giữa những người đọc: có người chia theo ý lớn, có người chia theo ý nhỏ. Ý lớn là đoạn bài có hai hoặc ba ý nhỏ được khai triển từ ý lớn, bao gồm hai hoặc ba đoạn văn ngắn, mỗi đoạn ngắn đó là một ý nhỏ, các đoạn này hợp ý với nhau thành một ý lớn; ý nhỏ là ý được khai triển từ ý lớn, về mặt nội dung chỉ triển khai theo một phương diện, một hướng cụ thể, mỗi ý nhỏ là một đoạn.

Cách hiểu này khiến cho cách phân đoạn thiếu tính khách quan. Với cách hiểu này, diện mạo đoạn văn không được xác định (đoạn văn bắt đầu từ đâu, như thế nào, các câu văn trong đoạn có mối liên kết với nhau như thế nào,…) cho nên việc xây dựng đoạn văn trở nên khó khăn, phức tạp, khó rèn luyện các thao tác để trở thành kĩ năng kĩ xảo.

- Cách hiểu thứ hai (đoạn lời): Đoạn văn được hiểu là sự phân chia văn bản thành những phần nhỏ, hoàn toàn dựa vào dấu hiệu hình thức: một đoạn văn bao gồm những câu văn nằm giữa hai dấu chấm xuống dòng.

Cách hiểu này không tính tới tiêu chí nội dung, cơ sở ngữ nghĩa của đoạn văn. Với cách hiểu này, việc rèn luyện xây dựng đoạn văn càng trở nên mơ hồ, khó xác định vì đoạn văn không được xây dựng trên một cơ sở chung nào vì hình thức bao giờ cũng phải đi đôi với nội dung, bao chứa một nội dung nhất định và phù hợp với nội dung mà nó bao chứa.

- Cách hiểu thứ ba (đoạn văn xét thao cả hai tiêu chí về ý và về lời): Đoạn văn vừa là kết quả của sự phân đoạn văn bản về nội dung ( dựa trên cơ sở logic ngữ nghĩa) vừa là kết quả của sự phân đoạn về hình thức ( dựa trên dấu hiệu hình thức thể hiện văn bản).

Về mặt nội dung: đoạn văn là một ý hoàn chỉnh ở một mức độ nhất định nào đó về logic ngữ nghĩa, có thể nắm bắt được một cách tương đối dễ dàng. Mỗi đoạn văn trong văn bản diễn đạt một ý, các ý có mối liên quan chặt chẽ với nhau trên cơ sở chung là chủ đề của văn bản. Mỗi đoạn trong văn bản có một vai trò chức năng riêng và được sắp xếp theo một trật tự nhất định: đoạn mở đầu văn bản, các đoạn thân bài của văn bản (các đoạn này triển khai chủ đề của văn bản thành các khía cạch khác nhau), đoạn kết thúc văn bản. Mỗi đoạn văn bản khi tách ra vẫn có tính độc lập tương đối của nó: nội dung của đoạn tương đối hoàn chỉnh, hình thức của đoạn có một kết cấu nhất định.

Về mặt hình thức: đoạn văn luôn luôn hoàn chỉnh. Sự hoàn chỉnh đó thể hiện ở những điểm sau: mỗi đoạn văn bao gồm một số câu văn nằm giữa hai dấu chấm xuống dòng, có liên kết với nhau về mặt hình thức, thể hiện bằng các phép liên kết; mỗi đoạn văn khi mở đầu, chữ cái đầu đoạn bao giờ cũng được viết hoa và viết lùi vào so với các dòng chữ khác trong đoạn.

Đây là cách hiểu hợp lí, thoả đáng hơn cả giúp người đọc nhận diện đoạn văn trong văn bản một cách nhanh chóng, thuận lợi đồng thời giúp người viết tạo lập văn bản bằng cách xây dựng từng đoạn văn được rõ ràng, rành mạch.
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