import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useListSchedulesQuery } from "../../../../redux/api/leader/schedule-api.slice";
import { useListTeachersQuery } from "../../../../redux/api/leader/list-users-api.slice";
import Pagination from "../../../../components/paginate/paginate";

import { ListClass } from "./listClasses.styles";
import {
  Header,
  TitleList,
  Section,
  DivItem,
  Item,
} from "../../../../generalCss/shared.styles";

const ListClasses = ({ listClasses }) => {
  const navigate = useNavigate();
  const { data: listTeachers } = useListTeachersQuery();
  const { data: listSchedules } = useListSchedulesQuery();

  const uniqueClassCodes = [];

  listSchedules?.forEach((itemSche) => {
    if (!uniqueClassCodes.includes(itemSche.class_code)) {
      uniqueClassCodes.push(itemSche.class_code);
    }
  });

  const classNoSchedule = listClasses?.filter(
    (item) => !uniqueClassCodes.includes(item.class_code)
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

  const handleClick = (classCode) => {
    navigate(`/leader/createSchedule/${classCode}`);
  };

  //paginate
  const itemsPerPage = 10;
  const totalItems = listClasses?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const customListClasses = listClasses?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  //paginate

  return (
    <ListClass>
      <Header>
        <TitleList>Class Code</TitleList>
        <TitleList>Class Name</TitleList>
        <TitleList>Teacher Name</TitleList>
        <TitleList>Course</TitleList>
      </Header>
      <Section>
        {customListClasses?.map((item, index) => (
          <DivItem onClick={() => handleClick(item.class_code)} key={index}>
            <Item>{item.class_code}</Item>
            <Item>{item.class_name}</Item>
            {(classNoSchedule?.find(
              (item2) => item2.class_code === item.class_code
            ) && <Item style={{ color: "red" }}>Chua co lich day</Item>) || (
              <Item>{findTeacherName(teacherMap[item.class_code])}</Item>
            )}
            <Item>{item.course}</Item>
          </DivItem>
        ))}
      </Section>
      <Pagination totalPages={totalPages} handlePageClick={handlePageClick} />
    </ListClass>
  );
};

export default ListClasses;
