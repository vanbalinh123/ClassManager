import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useListLessonContentsQuery } from "../../../../../../../redux/api/teacher/lesson-content-api.slice";
import { useCreateLessonContentMutation } from "../../../../../../../redux/api/teacher/lesson-content-api.slice";
import { useUpdateLessonContentMutation } from "../../../../../../../redux/api/teacher/lesson-content-api.slice";
import { useCreateFileLessonContentMutation } from "../../../../../../../redux/api/teacher/file-lesson-content-api.slice";
import { RiSaveLine } from "react-icons/ri";
import {
  ToastCtn,
  toastError,
  toastSuccess,
} from "../../../../../../../components/toast/toast";
import { Textarea, DivBtn, Btn,
  FileInput,
  AddFileButton,
  SelectedFilesList,
  SelectedFileItem,
  DownloadLink,
  RemoveFileButton
} from "./lessonContent.styles";

const LessonContent = () => {
  const data = useRef("");
  const { classCode, idSession } = useParams();
  const [createLessonContent] = useCreateLessonContentMutation();
  const [updateLessonContent] = useUpdateLessonContentMutation();
  const [createFileLessonContent] = useCreateFileLessonContentMutation();
  const { data: listLessonContent } = useListLessonContentsQuery();
  const [selectedFiles, setSelectedFiles] = useState([]);

  const lesson =
    listLessonContent
      ?.filter((item) => item.class_info === classCode)
      .find((item) => item.class_session === Number(idSession)) || null;

  useEffect(() => {
    if (lesson !== null) {
      data.current.value = lesson.content;
      setSelectedFiles(lesson.File);
    } else {
      data.current.value = "";
    }
  }, [lesson]);

  const handleSave = async () => {
    if(data.current.value === "") {
      return toastError("Nội dung bài học không được để trống");
    }

    const formData = new FormData();
    formData.append("class_info", classCode);
    formData.append("content", data.current.value);
    formData.append("class_session", idSession);

    selectedFiles.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });

    try {
      const response = await createLessonContent(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toastSuccess("Bạn đã thêm nội dung bài học thành công");
      // setSelectedFiles([]);
    } catch (error) {
      toastError("Đã xảy ra lỗi");
    }
  };

  const handleUpdate = async () => {
    if(data.current.value === "") {
      return toastError("Nội dung bài học không được để trống");
    }
    
    let lessonToday = listLessonContent?.find(
      (item) => item.class_session === Number(idSession)
    );

    console.log('ádasd', lessonToday)

    const formData = new FormData();
    formData.append("class_info", lessonToday.class_info);
    formData.append("content", data.current.value);
    formData.append("class_session", lessonToday.class_session);
    formData.append("id", lessonToday.id);
    // formData.append("Attendance_set", JSON.stringify(lessonToday.Attendance_set));
    formData.append("Attendance_set", lessonToday.Attendance_set);

    selectedFiles.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });

    try {
      const response = await updateLessonContent(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response)
      toastSuccess("Bạn đã thêm nội dung bài học thành công");
      // setSelectedFiles([]);
    } catch (err) {
      toastError("Đã xảy ra lỗi");
    }
  };

  // const handleFileChange = (files) => {
  //   setSelectedFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
  // };

  const handleFileChange = (files) => {
    // Lọc chỉ giữ lại các tệp tin hợp lệ
    const validFiles = Array.from(files).filter((file) => {
      const fileName = file.name.toLowerCase();
      return (
        fileName.endsWith('.doc') ||
        fileName.endsWith('.docx') ||
        fileName.endsWith('.xls') ||
        fileName.endsWith('.xlsx') ||
        fileName.endsWith('.ppt') ||
        fileName.endsWith('.pptx')
      );
    });
  
    if (validFiles.length !== files.length) {
      toastError('Chỉ chấp nhận các tệp tin có phần mở rộng .doc, .docx, .xls, .xlsx, .ppt, .pptx');
    }
  
    // Thêm các tệp tin hợp lệ vào danh sách đã chọn
    setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);
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
      <Textarea ref={data} />
      <FileInput 
        type="file"
        accept=".doc, .docx, .xls, .xlsx, .ppt, .pptx" 
        onChange={(e) => handleFileChange(e.target.files)} 
      />
      <AddFileButton onClick={handleAddFile}>Thêm File</AddFileButton>
      <div>
        <strong>Selected Files:</strong>
        <SelectedFilesList>
          {selectedFiles.map((file, index) => (
            <SelectedFileItem key={index}>
              {lesson !== null ? (
                <DownloadLink href={file.file} download={file.file}>
                  {file.file && file.file.slice(33) || file.name} 
                </DownloadLink>
              ) : (
                <DownloadLink href={file.name} download={file.name}>
                  {file.name}
                </DownloadLink>
              )}
              <RemoveFileButton onClick={() => handleRemoveFile(index)}>Xóa</RemoveFileButton>
            </SelectedFileItem>
          ))}
        </SelectedFilesList>
      </div>
      {lesson === null ? (
        <DivBtn>
          <Btn onClick={handleSave}>
            <RiSaveLine size="15px" />
            Lưu
          </Btn>
        </DivBtn>
      ) : (
        <DivBtn>
          <Btn onClick={handleUpdate}>
            <RiSaveLine size="15px" />
            Cập nhật
          </Btn>
        </DivBtn>
      )}
      <ToastCtn />
    </>
  );
};

export default LessonContent;
