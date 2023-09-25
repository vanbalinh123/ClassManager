import { useNavigate } from "react-router-dom";
import {
  Header,
  TitleList,
  Section,
  DivItem,
  Item,
} from "../../../../../../generalCss/shared.styles";

const ListLesson = () => {
    const navigate = useNavigate()

    const handleItemClick = () => {
        navigate('lesson/attendance')
    }
  return (
    <>
      <Header>
        <TitleList>Lesson</TitleList>
        <TitleList>Lesson content</TitleList>
        <TitleList>Day</TitleList>
      </Header>
      <Section>
        <DivItem onClick={() => handleItemClick()}>
          <Item>1</Item>
          <Item>
            Bố mẹ bận rộn công việc, anh trai là người luôn dạy cho tôi nhiều
            điều bổ ích. Không chỉ giảng bài cho tôi, anh còn dạy tôi học võ
            nữa. Anh bảo con gái phải biết tự bảo vệ bản thân mình. Biết bao
            nhiêu là kỉ niệm đẹp đẽ như vừa mới xảy ra thôi. Những năm anh học
            đại học, phải xa nhà thường xuyên, tôi thấy nhớ anh. Nhớ những lúc
            anh nấu cơm dỗ tôi ăn khi tôi bị ốm còn bố mẹ bận công chuyện, những
            lần anh dạy tôi học bài… Nhờ có anh mà tuổi thơ của tôi luôn cảm
            thấy hạnh phúc.
          </Item>
          <Item>27/12/2023</Item>
        </DivItem>
        <DivItem>
          <Item>2</Item>
          <Item>
            Bố mẹ bận rộn công việc, anh trai là người luôn dạy cho tôi nhiều
            điều bổ ích. Không chỉ giảng bài cho tôi, anh còn dạy tôi học võ
            nữa. Anh bảo con gái phải biết tự bảo vệ bản thân mình. Biết bao
            nhiêu là kỉ niệm đẹp đẽ như vừa mới xảy ra thôi. Những năm anh học
            đại học, phải xa nhà thường xuyên, tôi thấy nhớ anh. Nhớ những lúc
            anh nấu cơm dỗ tôi ăn khi tôi bị ốm còn bố mẹ bận công chuyện, những
            lần anh dạy tôi học bài… Nhờ có anh mà tuổi thơ của tôi luôn cảm
            thấy hạnh phúc.
          </Item>
          <Item>28/12/2023</Item>
        </DivItem>
        <DivItem>
          <Item>3</Item>
          <Item>
            Bố mẹ bận rộn công việc, anh trai là người luôn dạy cho tôi nhiều
            điều bổ ích. Không chỉ giảng bài cho tôi, anh còn dạy tôi học võ
            nữa. Anh bảo con gái phải biết tự bảo vệ bản thân mình. Biết bao
            nhiêu là kỉ niệm đẹp đẽ như vừa mới xảy ra thôi. Những năm anh học
            đại học, phải xa nhà thường xuyên, tôi thấy nhớ anh. Nhớ những lúc
            anh nấu cơm dỗ tôi ăn khi tôi bị ốm còn bố mẹ bận công chuyện, những
            lần anh dạy tôi học bài… Nhờ có anh mà tuổi thơ của tôi luôn cảm
            thấy hạnh phúc.
          </Item>
          <Item>29/12/2023</Item>
        </DivItem>
        <DivItem>
          <Item>4</Item>
          <Item>
            Bố mẹ bận rộn công việc, anh trai là người luôn dạy cho tôi nhiều
            điều bổ ích. Không chỉ giảng bài cho tôi, anh còn dạy tôi học võ
            nữa. Anh bảo con gái phải biết tự bảo vệ bản thân mình. Biết bao
            nhiêu là kỉ niệm đẹp đẽ như vừa mới xảy ra thôi. Những năm anh học
            đại học, phải xa nhà thường xuyên, tôi thấy nhớ anh. Nhớ những lúc
            anh nấu cơm dỗ tôi ăn khi tôi bị ốm còn bố mẹ bận công chuyện, những
            lần anh dạy tôi học bài… Nhờ có anh mà tuổi thơ của tôi luôn cảm
            thấy hạnh phúc.
          </Item>
          <Item>30/12/2023</Item>
        </DivItem>
        <DivItem>
          <Item>5</Item>
          <Item>Buổi học chưa bắt đầu</Item>
          <Item>31/12/2023</Item>
        </DivItem>
      </Section>
    </>
  );
};

export default ListLesson;