import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListClass } from "./listClassesOfStudent.styles";
import { useListInforClassQuery } from "../../../../../redux/api/teacher/class-information-api.js";
import { useListSchedulesQuery } from "../../../../../redux/api/leader/schedule-api.slice.js";
import { useListTeachersQuery } from "../../../../../redux/api/leader/list-users-api.slice.js";
import Pagination from "../../../../../components/paginate/paginate.js";

import {
  TableWrapper,
  Table,
  Th,
  Td,
} from "../../../../../generalCss/table.styles.js";

const ListClassOfStudent = ({ listClasses }) => {
  const navigate = useNavigate();
  const { data: listClassInfo } = useListInforClassQuery();
  const { data: listSchedules } = useListSchedulesQuery();
  const { data: listTeachers } = useListTeachersQuery();
  const userCode = JSON.parse(localStorage.getItem("user_code"));

  const arrayClassOfStudent =
    listClassInfo
      ?.filter((item) => item.students.includes(userCode))
      .map((item) => item.class_info) || [];

  const listClassOfStudent = listClasses?.filter((item) =>
    arrayClassOfStudent.includes(item.class_code)
  );

  const teacherMap = {};

  listSchedules?.forEach((item) => {
    teacherMap[item.class_code] = item.teacher_code;
  });

  const findTeacherName = (userCode) => {
    const foundTeacher = listTeachers?.find(
      (teacher) => teacher.usercode === userCode
    );

    return foundTeacher ? foundTeacher.full_name : null;
  };

  const handleItemClick = (classCode) => {
    navigate(`/student/listClassesOfStudent/${classCode}`);
  };

  //paginate
  const itemsPerPage = 10;
  const totalItems = listClassOfStudent?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const sortedListUser = Array.isArray(listClassOfStudent)
  ? [...listClassOfStudent].reverse()
  : [];

  const customListClasses = sortedListUser?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  //paginate

  return (
    <ListClass>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>Mã lớp</Th>
              <Th>Tên lớp</Th>
              <Th>Giáo viên</Th>
              <Th>Khoá</Th>
            </tr>
          </thead>
          <tbody>
            {customListClasses?.map((item, index) => (
              <tr
                onClick={() => handleItemClick(item.class_code)}
                key={index}
              >
                <Td>{item.class_code}</Td>
                <Td>{item.class_name}</Td>
                <Td>{findTeacherName(teacherMap[item.class_code])}</Td>
                <Td>{item.course}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
      <Pagination totalPages={totalPages} handlePageClick={handlePageClick} />
    </ListClass>
  );
};

export default ListClassOfStudent;
