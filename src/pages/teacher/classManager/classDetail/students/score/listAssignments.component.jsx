import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useListTestsQuery } from "../../../../../../redux/api/teacher/test-api";
import { useCreateTestMutation } from "../../../../../../redux/api/teacher/test-api";

import { AiOutlineUserAdd } from "react-icons/ai";
import { ToastCtn, toastSuccess, toastError } from "../../../../../../components/toast/toast";

import {
  Div,
  Header,
  TitleList,
  Section,
  DivItem,
  Item,
  DivBtn,
  Btn,
  DivInput,
  Input
} from "./listAssignment.styles";

const ListAssignment = () => {
  const navigate = useNavigate();
  const [ titleQuiz, setTitleQuiz ] = useState('');
  const { classCode } = useParams();
  const { data: listTest } = useListTestsQuery();
  const [ createTest ] = useCreateTestMutation();

  const listTestsOfThisClass = listTest?.filter(
    (item) => item.class_info === classCode
  );


  const handleItemClick = (id) => {
    navigate(`./${id}`);
  };

  const handleAddQuiz = async () => {
    if(titleQuiz === '') return toastError('Cannot be left blank!!');

    const data = {
      class_info: classCode,
      quiz_name: titleQuiz,
      scores: []
    };

    try {
      const response = await createTest(data)
      setTitleQuiz('')
      toastSuccess('Test creation successful!!')
    } catch (err) {
      toastError('Create test failed!!')
    }
  }

  console.log(listTestsOfThisClass)

  return (
    <Div>
      <Header>
        <TitleList style={{ flex: 0.5 }}>STT</TitleList>
        <TitleList>Tiêu đề bài kiểm tra</TitleList>
        <TitleList style={{ flex: 0.5 }}>Ngày tạo</TitleList>
      </Header>
      <Section>
        {listTestsOfThisClass?.map((item, index) => (
          <DivItem 
            key={index}
            onClick={() => handleItemClick(item.id)}
          >
            <Item style={{ flex: 0.5 }}>{index + 1}</Item>
            <Item>{item.quiz_name}</Item>
            <Item style={{ flex: 0.5 }}>{item.created_at}</Item>
          </DivItem>
        ))}
      </Section>
      {/* <DivBtn>
        <Btn>
          <AiOutlineUserAdd size="15px" />
          Tạo bài 
        </Btn>
      </DivBtn> */}
      <DivBtn>
        <DivInput>
          <Input 
            placeholder="Nhập tiêu đề"
            value={titleQuiz}
            onChange={(e) => setTitleQuiz(e.target.value)}
          />
        </DivInput>
        <Btn
          onClick={() => handleAddQuiz()}
        >
          <AiOutlineUserAdd size="15px" />
          Thêm
        </Btn>
      </DivBtn>
      <ToastCtn />
    </Div>
  );
};

export default ListAssignment;
