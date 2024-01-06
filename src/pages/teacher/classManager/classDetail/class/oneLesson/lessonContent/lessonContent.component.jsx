import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useListLessonContentsQuery } from "../../../../../../../redux/api/teacher/lesson-content-api.slice";
import { useCreateLessonContentMutation } from "../../../../../../../redux/api/teacher/lesson-content-api.slice";
import { useUpdateLessonContent2Mutation } from "../../../../../../../redux/api/teacher/lesson-content-api.slice";
import { RiSaveLine } from "react-icons/ri";
import { useCreateFileLessonContentMutation } from "../../../../../../../redux/api/teacher/file-lesson-content-api.slice";
import { useUpdateFileLessonContentMutation } from "../../../../../../../redux/api/teacher/file-lesson-content-api.slice";
import { useDeleteFileLessonContentMutation } from "../../../../../../../redux/api/teacher/file-lesson-content-api.slice";
import {
  ToastCtn,
  toastError,
  toastSuccess,
} from "../../../../../../../components/toast/toast";
import {
  Textarea,
  DivBtn,
  Btn,
  FileInput,
  AddFileButton,
  SelectedFilesList,
  SelectedFileItem,
  DownloadLink,
  RemoveFileButton,
} from "./lessonContent.styles";

const LessonContent = () => {
  const data = useRef("");
  const { classCode, idSession } = useParams();
  const [createLessonContent] = useCreateLessonContentMutation();
  const [updateLessonContent] = useUpdateLessonContent2Mutation();
  const { data: listLessonContent } = useListLessonContentsQuery();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [createFile] = useCreateFileLessonContentMutation();
  const [updateFile] = useUpdateFileLessonContentMutation();
  const [deleteFile] = useDeleteFileLessonContentMutation();

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

  console.log(lesson);

  const handleFileChange = (files) => {
    // Lọc chỉ giữ lại các tệp tin hợp lệ
    const validFiles = Array.from(files).filter((file) => {
      const fileName = file.name.toLowerCase();
      return (
        fileName.endsWith(".doc") ||
        fileName.endsWith(".docx") ||
        fileName.endsWith(".xls") ||
        fileName.endsWith(".xlsx") ||
        fileName.endsWith(".ppt") ||
        fileName.endsWith(".pptx")
      );
    });

    if (validFiles.length !== files.length) {
      toastError(
        "Chỉ chấp nhận các tệp tin có phần mở rộng .doc, .docx, .xls, .xlsx, .ppt, .pptx"
      );
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

  const handleRemoveFile = async (index) => {
    const isConfirmed = window.confirm(`Bạn có muốn xoá file này hay không ?`);
    if (isConfirmed) {
      setSelectedFiles((prevFiles) => {
        const newFiles = [...prevFiles];
        newFiles.splice(index, 1);
        return newFiles;
      });

      const removedFile = selectedFiles[index];
      console.log(removedFile);
      if (removedFile.id) {
        try {
          await deleteFile(removedFile.id).unwrap();
          toastSuccess("File đã được xoá thành công");
        } catch (error) {
          toastError("Đã xảy ra lỗi khi xoá file");
        }
      }
    }
  };

  const handleSave = async () => {
    if (data.current.value === "") {
      return toastError("Nội dung bài học không được để trống");
    }

    try {
      const lessonData = {
        class_info: classCode,
        content: data.current.value,
        class_session: idSession,
      };

      const response = await createLessonContent(lessonData);
      if (response.data) {
        const lessonId = response.data.id;
        console.log(lessonId);
        const formData = new FormData();
        console.log(selectedFiles);

        formData.append("lesson", lessonId);

        selectedFiles.forEach((file, index) => {
          formData.append(`files[${index}]`, file);
        });

        const responseFile = await createFile(formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(responseFile);
        toastSuccess("Bạn đã thêm nội dung bài học thành công");
      }
    } catch (error) {
      toastError("Đã xảy ra lỗi");
    }
  };

  const handleUpdate = async () => {
    if (data.current.value === "") {
      return toastError("Nội dung bài học không được để trống");
    }

    let lessonToday = listLessonContent?.find(
      (item) => item.class_session === Number(idSession)
    );

    console.log("ádasd", lessonToday);

    try {
      const lessonData = {
        class_info: lessonToday.class_info,
        content: data.current.value,
        class_session: lessonToday.class_session,
        id: lessonToday.id,
        Attendance_set: lessonToday.Attendance_set,
      };

      const response = await updateLessonContent(lessonData);
      if (response.data) {
        const lessonId = response.data.id;
        console.log(lessonId);
        const formData = new FormData();
        console.log(selectedFiles);

        formData.append("lesson", lessonId);

        selectedFiles.forEach((file, index) => {
          formData.append(`files[${index}]`, file);
        });

        const responseFile = await createFile(formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(responseFile);
        toastSuccess("Bạn đã cập nhật nội dung bài học thành công");
      }
    } catch (err) {
      toastError("Đã xảy ra lỗi");
    }
  };

  console.log("selected", selectedFiles);

  return (
    <>
      <Textarea ref={data} />
      <FileInput
        type="file"
        accept=".doc, .docx, .xls, .xlsx, .ppt, .pptx"
        onChange={(e) => handleFileChange(e.target.files)}
      />
      <AddFileButton onClick={handleAddFile}>Chọn File</AddFileButton>
      <div style={{ paddingTop: "10px" }}>
        {selectedFiles.length > 0 && <strong>Các file đã chọn:</strong>}
        <SelectedFilesList>
          {selectedFiles.map((file, index) => (
            <SelectedFileItem key={index}>
              {lesson !== null ? (
                <div>
                  <DownloadLink href={file.file} download={file.file}>
                    {(file.file && file.file.slice(33)) || file.name}
                  </DownloadLink>
                  <RemoveFileButton onClick={() => handleRemoveFile(index)}>
                    Xóa
                  </RemoveFileButton>
                </div>
              ) : (
                <div>
                  <DownloadLink href={file.name} download={file.name}>
                    {file.name}
                  </DownloadLink>
                  <RemoveFileButton onClick={() => handleRemoveFile(index)}>
                    Xóa
                  </RemoveFileButton>
                </div>
              )}
            </SelectedFileItem>
          ))}
        </SelectedFilesList>
      </div>
      <div>
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
      </div>
      <ToastCtn />
    </>
  );
};

export default LessonContent;
