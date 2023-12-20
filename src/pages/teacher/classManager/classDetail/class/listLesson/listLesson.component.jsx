import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useListSchedulesQuery } from "../../../../../../redux/api/leader/schedule-api.slice";
import { useListLessonContentsQuery } from "../../../../../../redux/api/teacher/lesson-content-api.slice"
import Pagination from "../../../../../../components/paginate/paginate";
import {
  Header,
  TitleList,
  Section,
  DivItem,
  Item,
} from "../../../../../../generalCss/shared.styles";

const ListLesson = () => {
  const navigate = useNavigate();
  const { classCode } = useParams();
  console.log(classCode);
  const { data: listScheduleApi } = useListSchedulesQuery();
  const { data: listLessonContentApi } = useListLessonContentsQuery();
  
  const listLessonContent = listLessonContentApi?.filter((item) => item.class_info === classCode);
  
  const findLessContent = (id) => {
    console.log(id)
    let ls = listLessonContent?.find((item) => item.class_session === id);
    if(ls) {
      return ls.content;
    } else {
      return 'Class has not started yet!!!'
    }
  }

  console.log(listLessonContent)

  const listSchedule = listScheduleApi?.find(
    (item) => item.class_code === classCode
  );
  

  const handleItemClick = (item) => {
    console.log(item)
    navigate(`lesson/attendance/${item.id}`);
  };

  //paginate
  const itemsPerPage = 10;
  const totalItems = listSchedule?.class_sessions_set.length;
  console.log(totalItems)
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const customList = listSchedule?.class_sessions_set.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );


  //paginate

  return (
    <>
      <Header>
        <TitleList>Lesson</TitleList>
        <TitleList>Lesson content</TitleList>
        <TitleList>Day</TitleList>
      </Header>
      <Section>
        {customList?.map((item, index) => (
          <DivItem key={index} onClick={() => handleItemClick(item)}>
            <Item>{item.id}</Item>
            <Item>
              {/* Bố mẹ bận rộn công việc, anh trai là người luôn dạy cho tôi nhiều
              điều bổ ích. Không chỉ giảng bài cho tôi, anh còn dạy tôi học võ
              nữa. Anh bảo con gái phải biết tự bảo vệ bản thân mình. Biết bao
              nhiêu là kỉ niệm đẹp đẽ như vừa mới xảy ra thôi. Những năm anh học
              đại học, phải xa nhà thường xuyên, tôi thấy nhớ anh. Nhớ những lúc
              anh nấu cơm dỗ tôi ăn khi tôi bị ốm còn bố mẹ bận công chuyện,
              những lần anh dạy tôi học bài… Nhờ có anh mà tuổi thơ của tôi luôn
              cảm thấy hạnh phúc. */}
              {findLessContent(item.id)}
            </Item>
            <Item>{item.day}</Item>
          </DivItem>
        ))}
      </Section>
      <Pagination totalPages={totalPages} handlePageClick={handlePageClick} />
    </>
  );
};

export default ListLesson;
