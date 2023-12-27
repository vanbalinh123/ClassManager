import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useListInforClassQuery } from "../../../../../redux/api/teacher/class-information-api.js";
import { useListSchedulesQuery } from "../../../../../redux/api/leader/schedule-api.slice.js";
import { useListTeachersQuery } from "../../../../../redux/api/leader/list-users-api.slice.js";
import { useListParentsQuery } from "../../../../../redux/api/leader/list-users-api.slice.js";
import { useListStudentsQuery } from "../../../../../redux/api/leader/list-users-api.slice.js";

import Pagination from "../../../../../components/paginate/paginate.js";

import { ListClass } from "./listClassesOfChild.styles";

import {
  TableWrapper,
  Table,
  Th,
  Td,
} from "../../../../../generalCss/table.styles.js";

const ListClassOfChild = ({ listClasses }) => {
  const navigate = useNavigate();
  const { data: listParents } = useListParentsQuery();
  const { data: listClassInfo } = useListInforClassQuery();
  const { data: listSchedules } = useListSchedulesQuery();
  const { data: listTeachers } = useListTeachersQuery();
  const { data: listStudents } = useListStudentsQuery();
  const userCode = JSON.parse(localStorage.getItem("user_code"));

  const userCodes = listParents?.find(
    (item) => item.usercode === userCode
  )?.student;

  const arrayClassOfStudent =
    listClassInfo
      ?.filter((item) =>
        userCodes?.some((code) => item.students.includes(code))
      )
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

  const findStudentInClass = (classCode) => {
    const listStdInCls = listClassInfo?.find(
      (item) => item.class_info === classCode
    )?.students;
    const student = listStdInCls?.find((item) => userCodes?.includes(item));
    const studentName = listStudents?.find(
      (item) => item.usercode === student
    )?.full_name;

    return studentName;
  };

  const findStudentCodeInClass = (classCode) => {
    const listStdInCls = listClassInfo?.find(
      (item) => item.class_info === classCode
    )?.students;
    const student = listStdInCls?.find((item) => userCodes?.includes(item));
    return student;
  };

  const handleItemClick = (classCode) => {
    const studentCode = findStudentCodeInClass(classCode);
    navigate(`/parents/listClassesOfChild/${studentCode}/${classCode}`);
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
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>Class Code</Th>
              <Th>Class Name</Th>
              <Th>Teacher Name</Th>
              <Th>Course</Th>
              <Th>Student</Th>
            </tr>
          </thead>
          <tbody>
            {customListClasses?.map((item, index) => (
              <tr onClick={() => handleItemClick(item.class_code)} key={index}>
                <Td>{item.class_code}</Td>
                <Td>{item.class_name}</Td>
                <Td>{findTeacherName(teacherMap[item.class_code])}</Td>
                <Td>{item.course}</Td>
                <Td>{findStudentInClass(item.class_code)}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
      <Pagination totalPages={totalPages} handlePageClick={handlePageClick} />
    </ListClass>
  );
};

export default ListClassOfChild;
