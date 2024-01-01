import { useNavigate } from "react-router-dom";
import { AiOutlineSchedule } from "react-icons/ai";
import { FiAlignJustify } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import { useListSchedulesQuery } from "../../../../redux/api/leader/schedule-api.slice";
import { useListTeachersQuery } from "../../../../redux/api/leader/list-users-api.slice";
import { useDeleteClassMutation } from "../../../../redux/api/leader/class-api.slice";
import Pagination from "../../../../components/paginate/paginate";

import { ListClass } from "./listClasses.styles";
import {
  toastSuccess,
  toastError,
  ToastCtn,
} from "../../../../components/toast/toast";
import {
  TableWrapper,
  Table,
  Th,
  Td,
} from "../../../../generalCss/table.styles";

const ListClasses = ({ listClasses }) => {
  const navigate = useNavigate();
  const { data: listTeachers } = useListTeachersQuery();
  const { data: listSchedules } = useListSchedulesQuery();
  const [deleteClass] = useDeleteClassMutation();

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
    navigate(`/leader/schedule/${classCode}`);
  };

  const handleDetailCls = (classCode) => {
    navigate(`/leader/class/${classCode}`);
  };

  const handleDelete = async (classcode) => {
    const isConfirmed = window.confirm(
      `Bạn có muốn xoá lớp '${classcode}' hay không ?`
    );
    if (isConfirmed) {
      try {
        const response = await deleteClass(classcode);
        console.log(response)
        toastSuccess(`Bạn đã xoá lớp ${classcode} thành công`);
      } catch (error) {
        toastSuccess(`Bạn đã xoá lớp ${classcode} thất bại`);
      }
    }
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
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>Mã lớp</Th>
              <Th>Tên lớp</Th>
              <Th>Tên giáo viên</Th>
              <Th>Khoá</Th>
              <Th>Lịch</Th>
              <Th>Chi tiết</Th>
              <Th>Xoá</Th>
            </tr>
          </thead>
          <tbody>
            {customListClasses?.map((item, index) => (
              <tr key={index}>
                <Td>{item.class_code}</Td>
                <Td>{item.class_name}</Td>
                {(classNoSchedule?.find(
                  (item2) => item2.class_code === item.class_code
                ) && <Td style={{ color: "red" }}>Chưa có lịch dạy</Td>) || (
                  <Td>{findTeacherName(teacherMap[item.class_code])}</Td>
                )}
                <Td>{item.course}</Td>
                <Td onClick={() => handleClick(item.class_code)}>
                  <AiOutlineSchedule />
                </Td>
                <Td onClick={() => handleDetailCls(item.class_code)}>
                  <FiAlignJustify />
                </Td>
                <Td onClick={() => handleDelete(item.class_code)}>
                  <MdDeleteForever />
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
      <Pagination totalPages={totalPages} handlePageClick={handlePageClick} />
      <ToastCtn />
    </ListClass>
  );
};

export default ListClasses;
