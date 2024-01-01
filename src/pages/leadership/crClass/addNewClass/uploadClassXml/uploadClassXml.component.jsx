import { useState } from "react";
import * as XLSX from "xlsx";

import { useCreateClassMutation } from "../../../../../redux/api/leader/class-api.slice";
import { IoAdd } from "react-icons/io5";
import Pagination from "../../../../../components/paginate/paginate";
import {
  TableWrapper,
  Table,
  Th,
  Td,
} from "../../../../../generalCss/table.styles";

import {
  Div,
  Title,
  FileInput,
  FileInputLabel,
  UploadButton,
  FormContainer,
  ErrorAlert,
} from "./uploadClassXml.styles";

const UploadClassXML = () => {
  const [excelData, setExcelData] = useState(null);
  const [createClass] = useCreateClassMutation();

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

  const importListUSer = async () => {
    for (const item of excelData || []) {
      const dulieu = {
        class_code: item.class_code,
        class_name: item.class_name,
        course: item.course,
        cost: item.cost,
      };

      console.log(dulieu);
      try {
        let response = await createClass(dulieu);
        alert("oke");
      } catch (error) {
        alert(error);
      }
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

  return (
    <Div>
      <Title>Tải lên file Execl</Title>
      <FileInput
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        id="fileInput" // Liên kết id với label
      />
      <FileInputLabel htmlFor="fileInput">Choose File</FileInputLabel>

      <FormContainer>
        {(excelData && (
          <div style={{ fontWeight: "bold" }}>
            Dữ liệu từ Excel: {excelData.length} lớp học
          </div>
        )) || <ErrorAlert>Không có file nào được chọn!!</ErrorAlert>}

        {excelData && (
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <Th>Mã lớp</Th>
                  <Th>Tên lớp</Th>
                  <Th>Khoá</Th>
                  <Th>Học phí</Th>
                </tr>
              </thead>
              <tbody>
                {excelData &&
                  customList?.map((item, index) => (
                    <tr key={index}>
                      <Td>{item.class_code}</Td>
                      <Td>{item.class_name}</Td>
                      <Td>{item.course}</Td>
                      <Td>{item.cost}</Td>
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
      {excelData && <UploadButton onClick={importListUSer}>
        <IoAdd />Lưu
      </UploadButton>}
    </Div>
  );
};

export default UploadClassXML;
