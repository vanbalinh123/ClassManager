import { useState } from "react";

import { useListAdminsQuery } from "../../redux/api/leader/list-users-api.slice";
import { useListTeachersQuery } from "../../redux/api/teacher/list-teachers-api.slice";
import { useListStudentsQuery } from "../../redux/api/student/list-students-api.slice";
import { useListParentsQuery } from "../../redux/api/leader/list-users-api.slice";

import ChangePassword from "./changePass/changePass.component";
import InforUser from "./inforUser/inforUser.component";

import { Page, Title } from "../../generalCss/shared.styles";


const Profile = () => {
  const [changePass, setChangePass] = useState(false);

  const userRole = JSON.parse(localStorage.getItem("userRole"));
  const userCode = JSON.parse(localStorage.getItem("user_code"));

  const {data: listAdmins} = useListAdminsQuery();
  const {data: listTeachers} = useListTeachersQuery();
  const {data: listStudents} = useListStudentsQuery();
  const {data: listParents} = useListParentsQuery()

  const usersData = {
    Admin: listAdmins,
    Teacher: listTeachers,
    Student: listStudents,
    Parents: listParents
  };

  const currentUser = usersData[userRole]?.find((item) => item.usercode === userCode);


  return (
    <Page>
      <Title>Hồ sơ</Title>
      <InforUser 
        setChangePass={setChangePass}
        currentUser={currentUser}
        userRole={userRole}
      />
      <ChangePassword 
        changePass={changePass}
        setChangePass={setChangePass}
      />
    </Page>
  );
};

export default Profile;
