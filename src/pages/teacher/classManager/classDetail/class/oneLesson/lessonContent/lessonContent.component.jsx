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
  const [selectedFiles, setSelectedFiles] = useState([]);

  const lesson =
    listLessonContent
      ?.filter((item) => item.class_info === classCode)
      .find((item) => item.class_session === Number(idSession)) || null;

      console.log(lesson)

  useEffect(() => {
    if (lesson !== null) {
      data.current.value = lesson.content;
      setSelectedFiles(lesson.File)
    } else {
      data.current.value = "";
    }
  }, [lesson]);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("class_info", classCode);
    formData.append("content", data.current.value);
    formData.append("class_session", idSession);

    selectedFiles.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });

    const values = [...formData.values()];
    console.log(values);
    const data2 = Object.fromEntries(formData);
    console.log(data2);

    try {
      const response = await createLessonContent(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      toastSuccess("You have successfully added lesson content!");
      setSelectedFiles([]);
    } catch (error) {
      toastError("Error!!");
    }
  };

  const handleUpdate = async () => {
    let lessonToday = listLessonContent?.find(
      (item) => item.class_session === Number(idSession)
    );

    const formData = new FormData();
    formData.append("class_info", lessonToday.class_info);
    formData.append("content", data.current.value);
    formData.append("class_session", lessonToday.class_session);
    formData.append("id", lessonToday.id);
    formData.append("Attendance_set", lessonToday.Attendance_set);

    // Đối với mỗi file đã chọn, thêm vào FormData
    selectedFiles.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });


    console.log('ccccccccc', selectedFiles)

    try {
      const response = await updateLessonContent(formData,  {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const values = [...formData.values()];
    console.log(values);
    const data2 = Object.fromEntries(formData);
    console.log(data2);
      console.log(response)
      toastSuccess("You have successfully updated lesson content!");
      setSelectedFiles([]); // Reset danh sách các file đã chọn sau khi cập nhật
    } catch (err) {
      toastError("Error!!");
    }
  };

  const handleFileChange = (files) => {
    setSelectedFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
  };

  const handleAddFile = () => {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.addEventListener("change", (e) =>
      handleFileChange(e.target.files)
    );
    inputElement.click();
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  return (
    <>
      <Textarea
        // value={value}
        // onChange={(e) => setValue(e.target.value)}
        ref={data}
      />
      <input type="file" onChange={(e) => handleFileChange(e.target.files)} />

      <button onClick={handleAddFile}>Thêm File</button>
      <div>
        <strong>Selected Files:</strong>
        <ul>
          {selectedFiles.map((file, index) => (
            <li key={index}>
              {lesson !== null
                && file.file
                || file.name
              }
              {/* {file.name} */}
              <button onClick={() => handleRemoveFile(index)}>Xóa</button>
            </li>
          ))}
        </ul>
      </div>
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
