import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useListTestsQuery } from "../../../../../../redux/api/teacher/test-api";
import { useCreateTestMutation } from "../../../../../../redux/api/teacher/test-api";
import { useDeleteTestMutation } from "../../../../../../redux/api/teacher/test-api";
import { FaAlignJustify } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";

import { AiOutlineUserAdd } from "react-icons/ai";
import {
  ToastCtn,
  toastSuccess,
  toastError,
} from "../../../../../../components/toast/toast";

import { Div, DivBtn, Btn, DivInput, Input } from "./listAssignment.styles";

import {
  TableWrapper,
  Table,
  Th,
  Td,
} from "../../../../../../generalCss/table.styles";

const ListAssignment = () => {
  const navigate = useNavigate();
  const [titleQuiz, setTitleQuiz] = useState("");
  const { classCode } = useParams();
  const { data: listTest } = useListTestsQuery();
  const [createTest] = useCreateTestMutation();
  const [deleteTest] = useDeleteTestMutation();

  const listTestsOfThisClass = listTest?.filter(
    (item) => item.class_info === classCode
  );

  const handleItemClick = (id) => {
    navigate(`./${id}`);
  };

  const handleAddQuiz = async () => {
    if (titleQuiz === "") return toastError("Không được để trống");

    const data = {
      class_info: classCode,
      quiz_name: titleQuiz,
      scores: [],
    };

    try {
      const response = await createTest(data);
      setTitleQuiz("");
      toastSuccess("Thành công!!");
    } catch (err) {
      toastError("Đã xảy ra lỗi");
    }
  };

  const handleDeleteTest = async (item) => {
    const isConfirmed = window.confirm(
      `Bạn có muốn xoá '${item.quiz_name}' hay không ?`
    );
    if (isConfirmed) {
      try {
        const response = await deleteTest(item.id);
        toastSuccess(`Bạn đã xoá bài ${item.quiz_name} thành công`);
      } catch (error) {
        toastSuccess(`Bạn đã xoá bài ${item.quiz_name} thất bại`);
      }
    }
  }

  return (
    <Div>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>STT</Th>
              <Th>Tiêu đề bài kiểm tra</Th>
              <Th>Ngày tạo</Th>
              <Th>Chi tiết</Th>
              <Th>Xoá</Th>
            </tr>
          </thead>
          <tbody>
            {listTestsOfThisClass?.map((item, index) => (
              <tr key={index}>
                <Td >{index + 1}</Td>
                <Td style={{width: '50%'}}>{item.quiz_name}</Td>
                <Td>{item.created_at ? item.created_at.slice(0, 10) : new Date().toISOString().slice(0, 10)}</Td>
                <Td onClick={() => handleItemClick(item.id)}>
                  <FaAlignJustify />
                </Td>
                <Td 
                  style={{color: 'red'}}
                  onClick={() => handleDeleteTest(item)} 
                >
                  <MdDeleteOutline size='20px'/>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
      <DivBtn>
        <DivInput>
          <Input
            placeholder="Nhập tiêu đề..."
            value={titleQuiz}
            onChange={(e) => setTitleQuiz(e.target.value)}
          />
        </DivInput>
        <Btn onClick={() => handleAddQuiz()}>
          <AiOutlineUserAdd size="15px" />
          Thêm
        </Btn>
      </DivBtn>
      <ToastCtn />
    </Div>
  );
};

export default ListAssignment;
