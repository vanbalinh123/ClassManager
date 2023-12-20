import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useListLessonContentsQuery } from "../../../../../../../redux/api/teacher/lesson-content-api.slice";
import { useCreateLessonContentMutation } from "../../../../../../../redux/api/teacher/lesson-content-api.slice";
import { useUpdateLessonContentMutation } from "../../../../../../../redux/api/teacher/lesson-content-api.slice";
import { RiSaveLine } from "react-icons/ri";
import {
  ToastCtn,
  toastError,
  toastSuccess,
} from "../../../../../../../components/toast/toast";
import { Textarea, DivBtn, Btn } from "./lessonContent.styles";

const LessonContent = () => {
  const data = useRef("");
  const { classCode, idSession } = useParams();
  const [createLessonContent] = useCreateLessonContentMutation();
  const [updateLessonContent] = useUpdateLessonContentMutation();
  const { data: listLessonContent } = useListLessonContentsQuery();

  const lesson =
    listLessonContent
      ?.filter((item) => item.class_info === classCode)
      .find((item) => item.class_session === Number(idSession)) || null;
  
      useEffect(() => {
        if (lesson !== null) {
          data.current.value = lesson.content;
        } else {
          data.current.value = "";
        }
      }, [lesson]);
    
      
  const handleSave = async () => {
    const dataPost = {
      class_info: classCode,
      content: data.current.value,
      class_session: idSession,
    };

    try {
      const response = await createLessonContent(dataPost);
      toastSuccess("You have successfully added lesson content!");
    } catch (err) {
      toastError("Error!!");
    }
  };

  const handleUpdate = async () => {
    let lessonToday = listLessonContent?.find(item => item.class_session === Number(idSession));
    // lessonToday.content = data.current.value;
    const dataPut = {
      class_info: lessonToday.class_info,
      class_session: lessonToday.class_session,
      content: data.current.value,
      id: lessonToday.id,
      Attendance_set: lessonToday.Attendance_set
    }
    
    try {
      const response = await updateLessonContent(dataPut);
      toastSuccess("You have successfully updated lesson content!");
    } catch (err) {
      toastError("Error!!");
    }
  }
 

  return (
    <>
      <Textarea
        // value={value}
        // onChange={(e) => setValue(e.target.value)}
        ref={data}
      />
      {(lesson === null && (
        <DivBtn>
          <Btn onClick={handleSave}>
            <RiSaveLine size="15px" />
            Save
          </Btn>
        </DivBtn>
      )) || (
        <DivBtn>
          <Btn onClick={handleUpdate}>
            <RiSaveLine size="15px" />
            Upadte
          </Btn>
        </DivBtn>
      )}

      <ToastCtn />
    </>
  );
};

export default LessonContent;
