import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

import { useCreateClassMutation } from "../../../../../redux/api/leader/class-api.slice";
import { useListClassQuery } from "../../../../../redux/api/leader/class-api.slice";
import { IoAdd } from "react-icons/io5";
import Pagination from "../../../../../components/paginate/paginate";

import {
  ToastCtn,
  toastError,
  toastSuccess,
} from "../../../../../components/toast/toast";

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
  const { data: listClasses } = useListClassQuery();
  const [errorFields, setErrorFields] = useState([]);

  useEffect(() => {
    setErrorFields([]);
  }, [excelData]);

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
    const errors = [];

    for (const item of excelData || []) {
      if (
        item.class_code === undefined ||
        item.class_name === undefined ||
        item.course === undefined ||
        item.cost === undefined
      ) {
        return toastError("Dữ liệu excel không đúng!!");
      }

      const isClassCodeExist = listClasses?.some(
        (cls) => cls.class_code === item.class_code
      );

      if (!/^\d+$/.test(item.cost)) {
        errors.push({
          class_code: item.class_code,
          error: `Lớp học có mã ${item.class_code} có giá trị học phí không hợp lệ. Dữ liệu không được thêm.`,
        });
        continue; 
      }

      if (!isClassCodeExist) {
        const dulieu = {
          class_code: item.class_code,
          class_name: item.class_name,
          course: item.course,
          cost: item.cost,
        };

        try {
          let response = await createClass(dulieu);
          toastSuccess("Tất cả dữ liệu đã được thêm !!");
        } catch (error) {
          toastError("Đã xảy ra lỗi khi thêm dữ liệu!!!");
          errors.push({
            class_code: item.class_code,
            error: error.message || "Đã xảy ra lỗi khi thêm dữ liệu.",
          });
        }
      } else {
        errors.push({
          class_code: item.class_code,
          error: `Lớp học có mã ${item.class_code} đã tồn tại. Dữ liệu không được thêm.`,
        });
      }
    }

    setErrorFields(errors);
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
      <Title>Tải lên file Excel</Title>
      <FileInput
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        id="fileInput"
      />
      <FileInputLabel htmlFor="fileInput">Chọn File</FileInputLabel>

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
      {errorFields.length > 0 && (
        <div style={{ color: "red", marginTop: "10px" }}>
          <p style={{ fontWeight: "bold" }}>Có lỗi xảy ra:</p>
          <ul>
            {errorFields.map((errorField, index) => (
              <li key={index}>
                <p>Mã lớp: {errorField.class_code}</p>
                <p>Lỗi: {errorField.error}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {excelData && (
        <UploadButton onClick={importListUSer}>
          <IoAdd />
          Lưu
        </UploadButton>
      )}
      <ToastCtn />
    </Div>
  );
};

export default UploadClassXML;
