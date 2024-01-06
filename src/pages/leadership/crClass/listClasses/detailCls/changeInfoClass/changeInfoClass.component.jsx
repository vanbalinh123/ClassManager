import { useParams } from "react-router-dom";
import { useState } from "react";
import { useClassDetailQuery } from "../../../../../../redux/api/leader/class-api.slice";
import { useUpdateClassMutation } from "../../../../../../redux/api/leader/class-api.slice";


import { MdList } from "react-icons/md";
import { FcCancel } from "react-icons/fc";

import { toastSuccess, ToastCtn, toastError } from "../../../../../../components/toast/toast";

import {
  TableWrapper,
  Table,
  Th,
  Td,
} from "../../../../../../generalCss/table.styles";

import { Title, Div, DivTt, Btn, InputChange } from "./changeInfoClass.styles";

const ChangeInforClass = () => {
  const { classCode } = useParams();
  const [change, setChange] = useState(false);
  const { data: classDetail } = useClassDetailQuery(classCode);
  const [updateClass] = useUpdateClassMutation();

  const [newClassName, setNewClassName] = useState(classDetail?.class_name);
  const [newCourse, setNewCourse] = useState(classDetail?.course);
  const [newCost, setNewCost] = useState(classDetail?.cost);

  const handleChange = () => {
    setChange(!change);
    setNewClassName(classDetail?.class_name);
    setNewCourse(classDetail?.course);
    setNewCost(classDetail?.cost);
  };



  const handleClassNameChange = (e) => {
    setNewClassName(e.target.value);
  };

  const handleCourseChange = (e) => {
    setNewCourse(e.target.value);
  };

  const handleCostChange = (e) => {
    setNewCost(e.target.value);
  };

  const handleUpdateClass = async () => {
    try {
      const response = await updateClass({
        class_name: newClassName,
        course: newCourse,
        cost: newCost,
        class_code: classCode
      });
  
      if (response.data) {
        toastSuccess('Cập nhật lớp học thành công');
        setChange(!change);
      } else {
        toastError('Cập nhật lớp học thất bại');
      }
    } catch (error) {
      toastError('Đã xảy ra lỗi khi cập nhật lớp học');
    }
  };

  return (
    <Div>
      <DivTt>
        <Title>Thông tin lớp học</Title>
      </DivTt>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>Mã lớp</Th>
              <Th>Tên lớp</Th>
              <Th>Khoá</Th>
              <Th>Học phí</Th>
              {change && <Th>Huỷ</Th> || <Th>Thay đổi</Th>}
            </tr>
          </thead>
          <tbody>
            {(change && (
              <tr>
                <Td>{classDetail?.class_code}</Td>
                <Td style={{ position: "relative" }}>
                  <InputChange value={newClassName} onChange={handleClassNameChange} />
                </Td>
                <Td style={{ position: "relative" }}>
                  <InputChange value={newCourse} onChange={handleCourseChange} />
                </Td>
                <Td style={{ position: "relative" }}>
                  <InputChange value={newCost} onChange={handleCostChange} />
                </Td>
                <Td onClick={handleChange}>
                  <FcCancel />
                </Td>
              </tr>
            )) || (
              <tr>
                <Td>{classDetail?.class_code}</Td>
                <Td>{classDetail?.class_name}</Td>
                <Td>{classDetail?.course}</Td>
                <Td>{classDetail?.cost}</Td>
                <Td onClick={handleChange}>
                  <MdList />
                </Td>
              </tr>
            )}
          </tbody>
        </Table>
      </TableWrapper>
      {change && <Btn onClick={handleUpdateClass}>Lưu</Btn>}
      <ToastCtn />
    </Div>
  );
};

export default ChangeInforClass;
