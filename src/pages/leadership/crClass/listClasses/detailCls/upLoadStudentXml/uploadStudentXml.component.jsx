import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useListStudentsQuery } from "../../../../../../redux/api/leader/list-users-api.slice";
import * as XLSX from "xlsx";

import { IoAdd } from "react-icons/io5";

import { useInforClassQuery } from "../../../../../../redux/api/teacher/class-information-api";
import { useUpdateInfoClassMutation } from "../../../../../../redux/api/teacher/class-information-api";
import { toastSuccess, toastError, ToastCtn } from "../../../../../../components/toast/toast";
import Pagination from "../../../../../../components/paginate/paginate";
import {
  TableWrapper,
  Table,
  Th,
  Td,
} from "../../../../../../generalCss/table.styles";

import {
  Div,
  Title,
  FileInput,
  FileInputLabel,
  UploadButton,
  FormContainer,
  ErrorAlert,
} from "./uploadStudentXml.styles";

const UploadStudentXML = () => {
  const [excelData, setExcelData] = useState(null);
  const { classCode } = useParams();
  const { data: detailClassInfo, refetch: refetchDetailClassInfo } =
    useInforClassQuery(classCode);
  const [updateInfoClass] = useUpdateInfoClassMutation();
  const { data: listStudents } = useListStudentsQuery();
  const [errorStudents, setErrorStudents] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryString = event.target.result;
      const workbook = XLSX.read(binaryString, { type: "binary" });

      // Lấy dữ liệu từ sheet đầu tiên (0-indexed)
      const sheetData = XLSX.utils.sheet_to_json(
        workbook.Sheets[workbook.SheetNames[0]]
      );

      setExcelData(sheetData);
    };

    reader.readAsBinaryString(file);
  };

  const importListStudent = async () => {
    const studentsArray = [];
    const errorArray = [];
    const encounteredStudents = new Set(detailClassInfo.students);
  
    for (const item of excelData || []) {
      if (item.class_info === classCode) {
        const studentsInRow = item.students
          .split(",")
          .map((student) => student.trim());
  
        // Lọc ra những sinh viên chưa có tài khoản
        const nonExistentStudents = studentsInRow.filter(
          (student) =>
            !listStudents.some(
              (existingStudent) => existingStudent.usercode === student
            )
        );
  
        if (nonExistentStudents.length > 0) {
          errorArray.push({
            message: nonExistentStudents
              .map((student) => `Học sinh "${student}" không có tài khoản`)
              .join(", "),
            classCode: item.class_info,
            students: studentsInRow.join(", "),
          });
        } else {
          // Check for duplicates
          for (const student of studentsInRow) {
            if (encounteredStudents.has(student)) {
              errorArray.push({
                message: `Học sinh "${student}" bị trùng lặp`,
                classCode: item.class_info,
                students: studentsInRow.join(", "),
              });
            } else {
              encounteredStudents.add(student);
            }
          }
  
          studentsArray.push(...studentsInRow);
        }
      } else {
        // Nếu class_info không trùng với classCode, thêm vào danh sách lỗi
        errorArray.push({
          message: `Mã lớp "${item.class_info}" không trùng khớp với mã lớp hiện tại`,
          classCode: item.class_info,
          students: item.students,
        });
      }
    }
  
    if (errorArray.length > 0) {
      // Hiển thị thông báo lỗi (nếu có)
      setErrorStudents(errorArray);
      toastError('Một số dữ liệu chưa đúng !!!');
    } else {
      // Chỉ khi không có lỗi thì thực hiện cập nhật dữ liệu
      await refetchDetailClassInfo();
  
      const updatedDetailClassInfo = {
        Teachers: detailClassInfo.Teachers,
        class_info: detailClassInfo.class_info,
        students: Array.from(encounteredStudents), // Convert set back to array
      };
  
      try {
        let response = await updateInfoClass(updatedDetailClassInfo);
  
        toastSuccess('Dữ liệu thêm thành công !!');
      } catch (error) {
        toastError(error);
        toastError('Bạn gặp sự cố!!');
      }
    }
  };
  

  useEffect(() => {
    refetchDetailClassInfo();
  }, [excelData]);

  //paginate
  const itemsPerPage = 10;
  const totalItems = excelData?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const customList = excelData?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  //paginate

  return (
    <Div>
      <Title>Tải lên file Execl</Title>
      <FileInput
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        id="fileInput" // Liên kết id với label
      />
      <FileInputLabel htmlFor="fileInput">Chọn File</FileInputLabel>

      <FormContainer>
        {(excelData && (
          <div style={{ fontWeight: "bold" }}>
            Dữ liệu từ Excel: {excelData.length} lớp học
          </div>
        )) || <ErrorAlert>Không có file nào được chọn!!</ErrorAlert>}
        {errorStudents.length > 0 && (
          <div style={{color: 'red'}}>
            Có lỗi xảy ra:
            <ul>
              {errorStudents.map((error, index) => (
                <li key={index} >
                  {error.message} - Học sinh: {error.students} !!!
                </li>
              ))}
            </ul>
          </div>
        )}
        {excelData && (
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <Th>Mã lớp</Th>
                  <Th>Học sinh</Th>
                </tr>
              </thead>
              <tbody>
                {excelData &&
                  customList?.map((item, index) => (
                    <tr key={index}>
                      <Td>{item.class_info}</Td>
                      <Td>{item.students}</Td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </TableWrapper>
        )}

        {excelData && (
          <Pagination
            totalPages={totalPages}
            handlePageClick={handlePageClick}
          />
        )}
      </FormContainer>
      {excelData && (
        <UploadButton onClick={importListStudent}>
          <IoAdd />
          Lưu
        </UploadButton>
      )}
      <ToastCtn />
    </Div>
  );
};

export default UploadStudentXML;
