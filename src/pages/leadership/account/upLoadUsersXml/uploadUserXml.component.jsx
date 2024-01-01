import { useState } from "react";
import * as XLSX from "xlsx";
import { IoAdd } from "react-icons/io5";

import { useCreateAdminMutation } from "../../../../redux/api/leader/createAccount.slice";
import { useCreateTeacherMutation } from "../../../../redux/api/leader/createAccount.slice";
import { useCreateStudentMutation } from "../../../../redux/api/leader/createAccount.slice";
import { useCreateParentsMutation } from "../../../../redux/api/leader/createAccount.slice";

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
  const [createAdmin] = useCreateAdminMutation();
  const [createTeacher] = useCreateTeacherMutation();
  const [createStudent] = useCreateStudentMutation();
  const [createParent] = useCreateParentsMutation();

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

  console.log(excelData);

  const importListUSer = async () => {
    let successCount = 0;
    let allRequestsSuccess = true;
    let failedEmail = null; // Thêm biến để theo dõi email gây lỗi

    for (const item of excelData || []) {
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

      let response = null;

      try {
        if (item.role === "admin") {
          response = await createAdmin(dulieu);
        } else if (item.role === "teacher") {
          response = await createTeacher(dulieu);
        } else if (item.role === "student") {
          response = await createStudent(dulieu);
        } else if (item.role === "parent") {
          console.log(dulieu);
          response = await createParent(dulieu);
        }

        if (response) {
          const responseData = response.data;
          console.log(response);
          successCount++;
        }
      } catch (error) {
        // Xử lý lỗi nếu cần
        console.error("Error:", error);

        // Gán email đang gây lỗi
        failedEmail = dulieu.email;

        allRequestsSuccess = false; // Đánh dấu là có ít nhất một yêu cầu thất bại
        break; // Dừng vòng lặp khi gặp lỗi
      }
    }

    if (allRequestsSuccess) {
      // Hiển thị alert thành công
      alert("All requests were successful!");
    } else {
      // Hiển thị alert thất bại và email gây lỗi
      alert(
        `Some requests failed. Please check the data and try again. Failed email: ${failedEmail}`
      );
    }
  };
  console.log(excelData);

  const checkParent = (excelData) => {
    return excelData?.some((item) => item.role === "parent");
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

  console.log(checkParent())

  return (
    <Div>
      <Title>Tải lên file Execl</Title>
      <FileInput
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        id="fileInput" // Liên kết id với label
      />
      <FileInputLabel htmlFor="fileInput">Chọn file</FileInputLabel>
      {/* <button onClick={importListUSer}>Upload</button> */}
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
      {excelData && (
        <UploadButton onClick={importListUSer}>
          <IoAdd />
          Lưu
        </UploadButton>
      )}
    </Div>
  );
};

export default UploadListUserXML;
