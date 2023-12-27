import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useListTestsQuery } from "../../../../../../redux/api/teacher/test-api";
import { useCreateTestMutation } from "../../../../../../redux/api/teacher/test-api";

import { AiOutlineUserAdd } from "react-icons/ai";
import {
  ToastCtn,
  toastSuccess,
  toastError,
} from "../../../../../../components/toast/toast";

import {
  Div,
  DivBtn,
  Btn,
  DivInput,
  Input,
} from "./listAssignment.styles";

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

  const listTestsOfThisClass = listTest?.filter(
    (item) => item.class_info === classCode
  );

  const handleItemClick = (id) => {
    navigate(`./${id}`);
  };

  const handleAddQuiz = async () => {
    if (titleQuiz === "") return toastError("Cannot be left blank!!");

    const data = {
      class_info: classCode,
      quiz_name: titleQuiz,
      scores: [],
    };

    try {
      const response = await createTest(data);
      setTitleQuiz("");
      toastSuccess("Test creation successful!!");
    } catch (err) {
      toastError("Create test failed!!");
    }
  };

  console.log(listTestsOfThisClass);

  return (
    <Div>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>STT</Th>
              <Th>Tiêu đề bài kiểm tra</Th>
              <Th>Ngày tạo</Th>
            </tr>
          </thead>
          <tbody>
          {listTestsOfThisClass?.map((item, index) => (
          <tr key={index} onClick={() => handleItemClick(item.id)}>
            <Td style={{ flex: 0.5 }}>{index + 1}</Td>
            <Td>{item.quiz_name}</Td>
            <Td style={{ flex: 0.5 }}>{item.created_at}</Td>
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
