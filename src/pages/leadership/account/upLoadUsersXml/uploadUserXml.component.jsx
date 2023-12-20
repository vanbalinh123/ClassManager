import { useState } from "react";
import * as XLSX from "xlsx";

import { useCreateAdminMutation } from "../../../../redux/api/leader/createAccount.slice";
import { useCreateTeacherMutation } from "../../../../redux/api/leader/createAccount.slice";
import { useCreateStudentMutation } from "../../../../redux/api/leader/createAccount.slice";
import Pagination from "../../../../components/paginate/paginate";

import { List } from "./uploadUserXml";
import {
  Header,
  TitleList,
  Section,
  DivItem,
  Item,
} from "../../../../generalCss/shared.styles";

const UploadListUserXML = () => {
  const [excelData, setExcelData] = useState(null);
  const [createAdmin] = useCreateAdminMutation();
  const [createTeacher] = useCreateTeacherMutation();
  const [createStudent] = useCreateStudentMutation();

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
    for (const item of excelData || []) {
      const dulieu = {
        full_name: item.full_name,
        email: item.email,
        password: item.password,
        mobile: item.mobile,
        role: item.role.toLowerCase(),
      };

      let response = null;
      console.log(dulieu)
      if (item.role === "Admin") {
        console.log(item.role)
        dulieu.classes = [];
        response = await createAdmin(dulieu);
      } else if (item.role === "Teacher") {
        console.log(item.role)
        dulieu.classes = [];
        response = await createTeacher(dulieu);
      } else if (item.role === "Student") {
        console.log(item.role)
        dulieu.address = "ABC";
        response = await createStudent(dulieu);
      } 

      // Bổ sung phần xử lý sau khi có response
      if (response) {
        const responseData = response.data; // Điều chỉnh tùy thuộc vào API trả về gì
        console.log(response);
      }
    }
  };

  console.log(excelData)

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
    <div>
      <input 
        type="file" 
        accept=".xlsx, .xls" 
        onChange={handleFileChange} 
      />
      <button onClick={importListUSer}>Upload</button>
      {excelData
      && <h3>Datas from Excel: {excelData.length} users</h3>
      || <h3>Datas from Excel:</h3>
      }
      
      <List>
        <Header>
          <TitleList>Full Name</TitleList>
          <TitleList>Email</TitleList>
          <TitleList>Password</TitleList>
          <TitleList>Phone</TitleList>
          <TitleList>Role</TitleList>
        </Header>
        <Section>
          {(excelData &&
            customList?.map((item, index) => (
              <DivItem key={index}>
                <Item>{item.full_name}</Item>
                <Item>{item.email}</Item>
                <Item>{item.password}</Item>
                <Item>{item.mobile}</Item>
                <Item>{item.role}</Item>
              </DivItem>
            ))) || <span>No files Choose</span>}
        </Section>
        {excelData && (
          <Pagination
            totalPages={totalPages}
            handlePageClick={handlePageClick}
          />
        )}
      </List>
    </div>
  );
};

export default UploadListUserXML;
