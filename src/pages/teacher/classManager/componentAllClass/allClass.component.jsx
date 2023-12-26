import { useState } from "react";
import { useEffect } from "react";
import { useListClassQuery } from "../../../../redux/api/leader/class-api.slice";
import { useListSchedulesQuery } from "../../../../redux/api/leader/schedule-api.slice";
import { Page, Title } from "../../../../generalCss/shared.styles";
import ListClassOfTeacher from "./listClass/listClass.component";
import SearchContainer from "../../../../components/search/search";

const ListClass = () => {
  const [listClass, setListClass] = useState([]);
  const [valueSearch, setValueSearch] = useState("");

  const { data: listClasses } = useListClassQuery({search: `${valueSearch}`});
  const { data: listSchedule } = useListSchedulesQuery();



  const userCode = JSON.parse(localStorage.getItem("user_code"));

  useEffect(() => {
    if (listClasses && listSchedule) {
      const mySchedule = listSchedule.filter(
        (item) => item.teacher_code === userCode
      );

      const updatedListClass = listClasses.filter((classItem) => {
        return mySchedule.some(
          (scheduleItem) => classItem.class_code === scheduleItem.class_code
        );
      });

      setListClass(updatedListClass);
    }
  }, [listClasses, listSchedule, userCode]);


  return (
    <Page>
      <Title>Danh sách lớp học</Title>
      <SearchContainer 
        setValueSearch={setValueSearch}
        placeholder='Mã lớp, tên lớp, khoá...'
        type='text'
      />
      <ListClassOfTeacher 
        listClass={listClass}
    />
    </Page>
  );
};

export default ListClass;
