import { useState } from "react";

import { useListAdminsQuery } from "../../redux/api/leader/list-users-api.slice";
import { useListTeachersQuery } from "../../redux/api/teacher/list-teachers-api.slice";
import { useListStudentsQuery } from "../../redux/api/student/list-students-api.slice";

import ChangePassword from "./changePass/changePass.component";
import InforUser from "./inforUser/inforUser.component";

import { Page, Title } from "../../generalCss/shared.styles";


const Profile = () => {
  const [changePass, setChangePass] = useState(false);

  const userRole = JSON.parse(localStorage.getItem("userRole"));
  const userID = JSON.parse(localStorage.getItem("id_user"));

  const {data: listAdmins} = useListAdminsQuery();
  const {data: listTeachers} = useListTeachersQuery();
  const {data: listStudents} = useListStudentsQuery();

  const usersData = {
    Admin: listAdmins,
    Teacher: listTeachers,
    Student: listStudents,
  };

  const currentUser = usersData[userRole]?.find((item) => item.id === Number(userID));


  return (
    <Page>
      <Title>Your Profile</Title>
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
