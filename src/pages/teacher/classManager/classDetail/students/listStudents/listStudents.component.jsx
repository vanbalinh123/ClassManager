import { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useListStudentsQuery } from "../../../../../../redux/api/leader/list-users-api.slice";
import { useInforClassQuery } from "../../../../../../redux/api/teacher/class-information-api";
import { useUpdateInfoClassMutation } from "../../../../../../redux/api/teacher/class-information-api";
import { toastSuccess, ToastCtn, toastError, toastWarn } from "../../../../../../components/toast/toast";


import StudentDetail from "./studentDetail/studentDetail.component";

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
} from "./listStudent.styles";

const ListStudents = () => {
  const [detail, setDetail] = useState(false);
  const { classCode } = useParams();
  const [studentCode, setStudentCode] = useState('')
  const [studentDetail, setStudentDetail] = useState(null);
  const { data: infoClass } = useInforClassQuery(classCode);
  const [ updateInfoClass ] = useUpdateInfoClassMutation();
  const {data: listStudent} = useListStudentsQuery();
  

  const findStudent = (userCode) => {
    return listStudent?.find((item) => item.usercode === userCode)
  }

  const handleItemClick = (usercode) => {
    setStudentDetail(findStudent(usercode))
    setDetail(true);
  };

  const handleAddNewStudent = async () => {
    if (!studentCode) {
      toastError('Please enter a student code.')
      return;
    }
    
    const checkExist = infoClass.students.find(item => item === studentCode);
    
    if(checkExist) {
      toastWarn('Students attended class!')
      return;
    }
    
    const newListStudent = [...infoClass.students, studentCode];

    const dataUpdate = {
      class_info: infoClass.class_info,
      Teachers: infoClass.Teachers,
      students: newListStudent,
    };
    const response = await updateInfoClass(dataUpdate);

    if(response.data) {
      setStudentCode('');
      findStudent(studentCode);
      toastSuccess('The student has been successfully added to the class!!');
      return;
    } 

    if(response.error) {
      toastError('Student code does not exist.');
      return
    }
  };

  
  return (
    <Div>
      <StudentDetail 
        detail={detail} 
        setDetail={setDetail} 
        studentDetail={studentDetail}
        infoClass={infoClass}
        updateInfoClass={updateInfoClass}
        toastSuccess={toastSuccess}
        toastError={toastError}
      />
      <Header>
        <TitleList style={{ flex: 0.5 }}>Index</TitleList>
        <TitleList>Student Code</TitleList>
        <TitleList>Student Name</TitleList>
        <TitleList style={{ flex: 0.5 }}>Absent</TitleList>
        <TitleList style={{ flex: 0.5 }}>Test 1</TitleList>
        <TitleList style={{ flex: 0.5 }}>Test 2</TitleList>
      </Header>
      <Section>
        {infoClass?.students.map((usercode, index) => (
          <DivItem 
            onClick={() => handleItemClick(usercode)}
            key={index}
          >
            <Item style={{ flex: 0.5 }}>{index + 1}</Item>
            <Item>{usercode}</Item>
            <Item>{findStudent(usercode).full_name}</Item>
            <Item style={{ flex: 0.5 }}>2</Item>
            <Item style={{ flex: 0.5 }}>9</Item>
            <Item style={{ flex: 0.5 }}>10</Item>
          </DivItem>
        ))}
      </Section>
      <DivBtn>
        <DivInput>
          <Input 
            placeholder="Enter student code..."
            value={studentCode}
            onChange={(e) => setStudentCode(e.target.value)}
          />
        </DivInput>
        <Btn
          onClick={() => handleAddNewStudent()}
        >
          <AiOutlineUserAdd size="15px" />
          Add
        </Btn>
      </DivBtn>
      <ToastCtn />
    </Div>
  );
};

export default ListStudents;
