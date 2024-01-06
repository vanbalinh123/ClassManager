import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { IoAdd } from "react-icons/io5";
import {
  useListAdminsQuery,
  useListTeachersQuery,
  useListStudentsQuery,
  useListParentsQuery,
} from "../../../../redux/api/leader/list-users-api.slice.js";
import { useCreateAdminMutation } from "../../../../redux/api/leader/createAccount.slice";
import { useCreateTeacherMutation } from "../../../../redux/api/leader/createAccount.slice";
import { useCreateStudentMutation } from "../../../../redux/api/leader/createAccount.slice";
import { useCreateParentsMutation } from "../../../../redux/api/leader/createAccount.slice";
import {
  ToastCtn,
  toastError,
  toastSuccess,
} from "../../../../components/toast/toast";
import Pagination from "../../../../components/paginate/paginate";
import {
  Table,
  TableWrapper,
  Th,
  Td,
} from "../../../../generalCss/table.styles";
import {
  Div,
  Title,
  FileInput,
  FileInputLabel,
  UploadButton,
  FormContainer,
  ErrorAlert,
} from "./uploadUserXml";

const UploadListUserXML = () => {
  const [excelData, setExcelData] = useState(null);
  const { data: listAdmins } = useListAdminsQuery();
  const { data: listTeachers } = useListTeachersQuery();
  const { data: listStudents } = useListStudentsQuery();
  const { data: listParents } = useListParentsQuery();

  const [createAdmin] = useCreateAdminMutation();
  const [createTeacher] = useCreateTeacherMutation();
  const [createStudent] = useCreateStudentMutation();
  const [createParent] = useCreateParentsMutation();

  const [errorFields, setErrorFields] = useState([]);

  const checkParent = (excelData) => {
    return excelData?.some((item) => item.role === "parent");
  };

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

  useEffect(() => {
    setErrorFields([]);
  }, [excelData]);

  const importListUser = async () => {
    let successCount = 0;
    let allRequestsSuccess = true;
    let failedEmail = null;

    for (const item of excelData || []) {
      if (item.role === undefined) {
        return toastError("File dữ liệu không đúng!!");
      }
      const dulieu = {
        full_name: item.full_name,
        email: item.email,
        password: item.password,
        mobile: item.mobile,
        role: item.role.toLowerCase(),
        student:
          item.role === "parent"
            ? item.student.split(",").map((studentId) => studentId.trim())
            : undefined,
      };

      const isEmailExist =
        listAdmins?.some((admin) => admin.email === item.email) ||
        listTeachers?.some((teacher) => teacher.email === item.email) ||
        listStudents?.some((student) => student.email === item.email) ||
        listParents?.some((parent) => parent.email === item.email);

      if (isEmailExist) {
        setErrorFields((prevErrors) => [...prevErrors, item]);
        allRequestsSuccess = false;
      } else {
        let response = null;

        try {
          if (item.role === "admin") {
            response = await createAdmin(dulieu);
          } else if (item.role === "teacher") {
            response = await createTeacher(dulieu);
          } else if (item.role === "student") {
            response = await createStudent(dulieu);
          } else if (item.role === "parent") {
            response = await createParent(dulieu);
          }

          if (response) {
            const responseData = response.data;
            successCount++;
          }
        } catch (error) {
          failedEmail = dulieu.email;
          setErrorFields((prevErrors) => [...prevErrors, item]);
          allRequestsSuccess = false;
        }
      }
    }

    if (allRequestsSuccess) {
      toastSuccess("Tất cả dữ liệu đã được thêm thành công!!");
    } else {
      toastError(`Đã xảy ra lỗi. Hãy kiểm tra dữ liệu`);
    }
  };

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

  errorFields.map((item) => {
    console.log(item);
  });

  return (
    <Div>
      <Title>Tải lên file Excel</Title>
      <FileInput
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        id="fileInput" // Liên kết id với label
      />

      <FileInputLabel htmlFor="fileInput">Chọn file</FileInputLabel>
      <FormContainer>
        {(excelData && (
          <div style={{ fontWeight: "bold" }}>
            Dữ liệu từ Excel: {excelData.length} tài khoản
          </div>
        )) || <ErrorAlert>Không có file nào được chọn!!</ErrorAlert>}
        {excelData && (
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <Th>Họ tên</Th>
                  <Th>Email</Th>
                  <Th>Mật khẩu</Th>
                  <Th>Sđt</Th>
                  <Th>Vai trò</Th>
                  {checkParent(excelData) && <Th>Học sinh</Th>}
                </tr>
              </thead>
              <tbody>
                {(excelData &&
                  customList?.map((item, index) => (
                    <tr key={index}>
                      <Td>{item.full_name}</Td>
                      <Td>{item.email}</Td>
                      <Td>{item.password}</Td>
                      <Td>{item.mobile}</Td>
                      <Td>{item.role}</Td>
                      {item.role === "parent" && <Td>{item.student}</Td>}
                    </tr>
                  ))) || <span>No files Choose</span>}
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
      {errorFields.length > 0 && (
        <div style={{ color: "red", marginTop: "10px" }}>
          <p style={{ fontWeight: "bold" }}>Có lỗi xảy ra:</p>
          <ul>
            {errorFields.map((errorField, index) => (
              <li key={index}>
                <p>
                  Email không đúng định dạng hoặc đã bị trùng:{" "}
                  {errorField.email}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {excelData && (
        <UploadButton onClick={importListUser}>
          <IoAdd />
          Lưu
        </UploadButton>
      )}
      <ToastCtn />
    </Div>
  );
};

export default UploadListUserXML;
