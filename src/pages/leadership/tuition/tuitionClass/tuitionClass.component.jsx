import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useInforClassQuery } from "../../../../redux/api/teacher/class-information-api";
import { useListStudentsQuery } from "../../../../redux/api/leader/list-users-api.slice";
import { useListClassQuery } from "../../../../redux/api/leader/class-api.slice";
import { useUpdateInfoClassMutation } from "../../../../redux/api/teacher/class-information-api";
import {
  ToastCtn,
  toastSuccess,
  toastError,
} from "../../../../components/toast/toast";
import { RiSaveLine } from "react-icons/ri";
import {
  Page,
  Title,
  Header,
  TitleList,
  Section,
  DivItem,
  Item,
} from "../../../../generalCss/shared.styles";
import { ListST, Span, Input, DivBtn, Btn } from "./tuitionClass.styles";
import {
  TableWrapper,
  Table,
  Th,
  Td,
} from "../../../../generalCss/table.styles";

// ... (các import khác)

const TuitionClass = () => {
  const { idSession, classCode } = useParams();
  const { data: infoClass } = useInforClassQuery(classCode);
  const [updateInforClass] = useUpdateInfoClassMutation();
  const { data: listStudent } = useListStudentsQuery();
  const { data: listClass } = useListClassQuery();

  const findStudent = (userCode) => {
    return listStudent?.find((item) => item.usercode === userCode);
  };

  const findCost = () => {
    let cost = listClass?.find((item) => item.class_code === classCode)?.cost;
    return cost;
  };

  // State để lưu trữ thông tin thanh toán của mỗi học sinh

  const [paymentData, setPaymentData] = useState([]);

  useEffect(() => {
    if (infoClass) {
      const initialPaymentData = infoClass.students.map((student) => {
        const paymentInfo = infoClass.payment.find(
          (payment) => payment.student === student
        );
        return {
          student,
          payment: paymentInfo ? paymentInfo.Payment : false,
        };
      });
      setPaymentData(initialPaymentData);
    } else {
      setPaymentData([]);
    }
  }, [infoClass]);

  // Hàm xử lý khi giá trị của ô input thay đổi
  const handlePaymentChange = (index) => {
    setPaymentData((prevPaymentData) => {
      const updatedPaymentData = [...prevPaymentData];
      const student = infoClass?.students?.[index];
      if (student) {
        // Find the payment information, default to an object with Payment: false
        const existingPayment = infoClass?.payment?.find(
          (item) => item.student === student
        );

        // If existingPayment is undefined, default to an object with Payment: false
        const defaultPayment = { Payment: false };

        // Update the payment status
        updatedPaymentData[index].payment =
          !existingPayment?.Payment ?? defaultPayment.Payment;
      }

      return updatedPaymentData;
    });
  };

  // Hàm xử lý khi nhấn nút "Lưu"
  const handleSaveClick = async () => {
    try {
      // Lấy danh sách học sinh đã thanh toán
      const paidStudents = paymentData
        .filter((item) => item.payment)
        .map((item) => ({
          classInformation: classCode,
          Payment: true,
          date: new Date().toISOString().split("T")[0], // Lấy ngày hiện tại
          student: item.student,
        }));

      const data = {
        Teachers: infoClass.Teachers,
        class_info: infoClass.class_info,
        students: infoClass.students,
        payment: paidStudents,
      };

      await updateInforClass(data);

      toastSuccess("Lưu thành công");
    } catch (error) {
      toastError("Lỗi khi lưu dữ liệu");
      console.error(error);
    }
  };

  return (
    <Page>
      <Title>Học phí lớp {classCode}</Title>
      <ListST>
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>STT</Th>
                <Th>Mã học sinh</Th>
                <Th>Tên học sinh</Th>
                <Th>Học phí</Th>
                <Th>Đã thanh toán</Th>
              </tr>
            </thead>
            <tbody>
              {infoClass?.students.map((student, index) => {
                const paymentItem = paymentData?.find(
                  (item) => item.student === student
                ) || { payment: false };
                return (
                  <tr key={index}>
                    <Td style={{ flex: "0.5" }}>{index + 1}</Td>
                    <Td>{student}</Td>
                    <Td>{findStudent(student)?.full_name}</Td>
                    <Td>{findCost()}</Td>
                    <Td>
                      <Input
                        type="checkbox"
                        style={{ flex: "1" }}
                        checked={paymentItem?.payment}
                        onChange={() => handlePaymentChange(index)}
                      />
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </TableWrapper>
        <DivBtn>
          <Btn onClick={handleSaveClick}>
            <RiSaveLine size="15px" />
            Lưu
          </Btn>
        </DivBtn>
      </ListST>
      <ToastCtn />
    </Page>
  );
};

export default TuitionClass;
