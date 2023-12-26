import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListClass } from "./listClassesOfStudent.styles";
import { useListInforClassQuery } from "../../../../../redux/api/teacher/class-information-api.js";
import { useListSchedulesQuery } from "../../../../../redux/api/leader/schedule-api.slice.js";
import { useListTeachersQuery } from "../../../../../redux/api/leader/list-users-api.slice.js";
import Pagination from "../../../../../components/paginate/paginate.js";
import {
  Header,
  TitleList,
  Section,
  DivItem,
  Item,
} from "../../../../../generalCss/shared.styles";

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

  const customListClasses = listClassOfStudent?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  //paginate

  return (
    <ListClass>
      <Header>
        <TitleList>Mã lớp</TitleList>
        <TitleList>Tên lớp</TitleList>
        <TitleList>Giáo viên</TitleList>
        <TitleList>Khoá</TitleList>
      </Header>
      <Section>
        {customListClasses?.map((item, index) => (
          <DivItem onClick={() => handleItemClick(item.class_code)} key={index}>
            <Item>{item.class_code}</Item>
            <Item>{item.class_name}</Item>
            <Item>{findTeacherName(teacherMap[item.class_code])}</Item>
            <Item>{item.course}</Item>
          </DivItem>
        ))}
      </Section>
      <Pagination totalPages={totalPages} handlePageClick={handlePageClick} />
    </ListClass>
  );
};

export default ListClassOfStudent;
