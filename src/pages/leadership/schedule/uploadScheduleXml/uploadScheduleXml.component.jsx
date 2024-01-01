import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { calculateClassSchedule } from "../funcCalSche";
import { IoAdd } from "react-icons/io5";
import { useCreateScheduleMutation } from "../../../../redux/api/leader/schedule-api.slice";
import { useCreateInfoClassMutation } from "../../../../redux/api/teacher/class-information-api";

import { ToastCtn, toastSuccess, toastError } from "../../../../components/toast/toast";
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
} from "./uploadScheduleXml.styles";

const convertTime = (timeString) => {
  const formattedTimeString = timeString.replace("h", ":");
  return formattedTimeString;
};

const formatDate = (excelDate) => {
  const jsDate = new Date((excelDate - (25567 + 1)) * 86400 * 1000); // Convert Excel date to JavaScript date
  const year = jsDate.getFullYear();
  const month = (jsDate.getMonth() + 1).toString().padStart(2, "0");
  const day = jsDate.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatSessionsPerWeek = (sessionsPerWeek) => {
  return sessionsPerWeek ? sessionsPerWeek.split(",").map(Number) : [];
};

const mapDayToString = (dayValue) => {
  const daysOfWeek = [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
  ];
  return daysOfWeek[dayValue];
};

const UploadScheduleXml = () => {
  const navigate = useNavigate()
  const [excelData, setExcelData] = useState(null);
  const [result, setResult] = useState([]);
  const [createSchedule] = useCreateScheduleMutation();
  const [createClassInfo] = useCreateInfoClassMutation();

  const calculateResults = (excelData) => {
    let result = [];
    excelData.forEach((item) => {
      const b = calculateClassSchedule(
        item.startDate,
        item.course,
        item.week,
        item.sessionsPerWeek.sort(),
        item.date,
        item.room
      );

      result.push(b);
    });

    return result;
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryString = event.target.result;
      const workbook = XLSX.read(binaryString, { type: "binary" });

      // Assuming the first sheet contains the data
      const sheetData = XLSX.utils.sheet_to_json(
        workbook.Sheets[workbook.SheetNames[0]]
      );

      const formattedData = sheetData.map((session) => {
        const daysOfWeek = session.daysOfWeek
          ? session.daysOfWeek.split(",").map(Number)
          : [];
        const daySessions = [];

        for (let i = 1; i <= 7; i++) {
          const dayKey = `day ${i}`;
          const startTimeKey = `startTime ${dayKey}`;
          const endTimeKey = `endTime ${dayKey}`;

          if (daysOfWeek.includes(i)) {
            daySessions.push({
              day: i % 7,
              startTime: convertTime(session[startTimeKey]),
              endTime: convertTime(session[endTimeKey]),
            });
          }
        }

        return {
          teacherCode: session.teacher_code,
          classCode: session.class_code,
          course: session.num_sessions_per_course,
          week: session.num_sessions_per_week,
          startDate: formatDate(session.start_day),
          sessionsPerWeek: formatSessionsPerWeek(session.daysOfWeek),
          room: session.room,
          date: daySessions,
        };
      });

      setExcelData(formattedData);
    };

    reader.readAsBinaryString(file);
  };

  console.log(excelData);

  useEffect(() => {
    if (excelData !== null) {
      setResult(calculateResults(excelData));
    }
  }, [excelData]);

  const importListSchedule = async () => {
    for (let index = 0; index < excelData.length; index++) {
      const item = excelData[index];
      const dulieu = {
        teacher_code: item.teacherCode,
        class_code: item.classCode,
        num_sessions_per_course: item.course,
        num_sessions_per_week: item.week,
        start_day: item.startDate,
        class_sessions_set: result[index],
      };
  
      try {
        const response = await createSchedule(dulieu);
        const classInfo = {
          class_info:  item.classCode,
          Teachers: item.teacherCode,
          students: [],
        };
        const response2  = await createClassInfo(classInfo);
        if (response.data && response2.data) {
          toastSuccess(
            `Tạo lịch dạy cho lớp ${item.classCode} thành công`
          );
        } else {
          toastError("Đã xảy ra lỗi!!");
        }

      } catch (error) {
        toastError("Đã xảy ra lỗi!!");
        toastError(error);
      }
    }
  }

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
            Dữ liệu từ Excel: {excelData.length} lịch dạy
          </div>
        )) || <ErrorAlert>Không có file nào được chọn!!</ErrorAlert>}
        {excelData && (
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <Th>Mã lớp</Th>
                  <Th>Mã GV</Th>
                  <Th>Tổng</Th>
                  <Th>Tuần</Th>
                  <Th>Ngày bắt đầu</Th>
                  <Th>Phòng</Th>
                  <Th>Ngày trong tuần</Th>
                  <Th>Các buổi trong tuần</Th>
                </tr>
              </thead>
              <tbody>
                {(excelData &&
                  customList?.map((item, index) => (
                    <tr key={index}>
                      <Td>{item.classCode}</Td>
                      <Td>{item.teacherCode}</Td>
                      <Td>{item.course} buổi</Td>
                      <Td>{item.week} buổi</Td>
                      <Td>{item.startDate}</Td>
                      <Td>{item.room}</Td>
                      <Td>
                        {item.sessionsPerWeek.map((dayValue, index) => {
                          let dau = "";
                          if (index < item.sessionsPerWeek.length - 1) {
                            dau = " ,";
                          }
                          return mapDayToString(dayValue) + dau;
                        })}
                      </Td>
                      <Td nowrap={true}>
                        {item.date.map((session, index) => (
                          <span key={index}>
                            {`Buổi ${index + 1}: ${mapDayToString(
                              session.day
                            )} (${session.startTime}-${session.endTime})`}
                            {index < item.date.length - 1 && ", "}
                          </span>
                        ))}
                      </Td>
                    </tr>
                  ))) || <span>Không có file nào được chọn</span>}
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
      {excelData && <UploadButton onClick={importListSchedule}>
        <IoAdd />Lưu
      </UploadButton>}
      <ToastCtn />
    </Div>
  );
};

export default UploadScheduleXml;
