import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useListSchedulesQuery } from "../../../../../../redux/api/leader/schedule-api.slice";
import { useListLessonContentsQuery } from "../../../../../../redux/api/teacher/lesson-content-api.slice";
import Pagination from "../../../../../../components/paginate/paginate";

import {
  TableWrapper,
  Table,
  Th,
  Td,
} from "../../../../../../generalCss/table.styles";

const ListLesson = () => {
  const navigate = useNavigate();
  const { classCode } = useParams();
  console.log(classCode);
  const { data: listScheduleApi } = useListSchedulesQuery();
  const { data: listLessonContentApi } = useListLessonContentsQuery();

  const listLessonContent = listLessonContentApi?.filter(
    (item) => item.class_info === classCode
  );

  const findLessContent = (id) => {
    console.log(id);
    let ls = listLessonContent?.find((item) => item.class_session === id);
    if (ls) {
      return ls.content;
    } else {
      return "Chưa có nội dung bài học!!";
    }
  };

  console.log(listLessonContent);

  const listSchedule = listScheduleApi?.find(
    (item) => item.class_code === classCode
  );

  const handleItemClick = (item) => {
    console.log(item);
    navigate(`lesson/attendance/${item.id}`);
  };

  //paginate
  const itemsPerPage = 10;
  const totalItems = listSchedule?.class_sessions_set.length;
  console.log(totalItems);
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
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>STT</Th>
              <Th>Nội dung bài học</Th>
              <Th>Ngày</Th>
            </tr>
          </thead>
          <tbody>
            {customList?.map((item, index) => (
              <tr key={index} onClick={() => handleItemClick(item)}>
                <Td>{item.id}</Td>
                <Td>{findLessContent(item.id)}</Td>
                <Td>{item.day}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
      <Pagination totalPages={totalPages} handlePageClick={handlePageClick} />
    </>
  );
};

export default ListLesson;
