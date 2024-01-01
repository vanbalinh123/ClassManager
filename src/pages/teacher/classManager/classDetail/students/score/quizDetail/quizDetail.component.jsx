import { useState, useEffect } from "react";
import { CiSaveUp2 } from "react-icons/ci";
import { useParams } from "react-router-dom";
import { useDetailTestQuery } from "../../../../../../../redux/api/teacher/test-api";
import { useInforClassQuery } from "../../../../../../../redux/api/teacher/class-information-api";
import { useListStudentsQuery } from "../../../../../../../redux/api/leader/list-users-api.slice";
import { useUpdateTestMutation } from "../../../../../../../redux/api/teacher/test-api";

import {
  Div,
  Span,
  Input,
  DivBtn,
  Btn,
} from "./quizDetail.styles";

import {
  TableWrapper,
  Table,
  Th,
  Td,
} from "../../../../../../../generalCss/table.styles";

import {
  toastError,
  toastSuccess,
  ToastCtn,
  toastWarn,
} from "../../../../../../../components/toast/toast";

const QuizDetail = () => {
  const { classCode, idSession, idTest } = useParams();
  const [scores, setScores] = useState([]);
  const { data: detailTest } = useDetailTestQuery(idTest);
  const { data: classInfor } = useInforClassQuery(classCode);
  const { data: listStudent } = useListStudentsQuery();
  const [updateTest] = useUpdateTestMutation();
  const listStudentsCode = classInfor?.students;

  useEffect(() => {
    if (detailTest?.scores.length === 0) {
      setScores([]);
    } else {
      setScores(detailTest?.scores);
    }
  }, [detailTest, idTest]);

  const findStudent = (userCode) => {
    return listStudent?.find((item) => item.usercode === userCode);
  };

  const handleScoreChange = (userCode, score) => {
    setScores((prevScores) => {
      const existingIndex = prevScores?.findIndex(
        (item) => item.student === userCode
      );

      if (existingIndex !== -1) {
        const newScores = [...prevScores];
        newScores[existingIndex] = {
          student: userCode,
          score: score,
          test_and_quiz: idTest,
        };
        return newScores;
      } else {
        return [
          ...prevScores,
          {
            student: userCode,
            score: score,
            test_and_quiz: idTest,
          },
        ];
      }
    });
  };

  const handleSubmitScores = async () => {
    // if (scores.length !== listStudentsCode.length)
    //   return toastError("Not enough students have been enrolled!");

    const invalidScores = scores?.find(
      (item) => Number(item.score) < 0 || Number(item.score) > 10
    );

    if (invalidScores) {
      toastWarn("Scores must be greater than 0 and less than 10!");
      return;
    }

    const data = {
      id: detailTest.id,
      class_info: detailTest.class_info,
      quiz_name: detailTest.quiz_name,
      scores: scores,
    };

    try {
      const response = await updateTest(data);
      toastSuccess("Add score successfully!!");
    } catch (err) {
      toastError("Error");
    }
  };

  const handleUpdateScores = async () => {
    // if (scores.length !== listStudentsCode.length)
    //   return toastError("Not enough students have been enrolled!");

    const invalidScores = scores.find(
      (item) =>
        isNaN(Number(item.score)) ||
        Number(item.score) < 0 ||
        Number(item.score) > 10
    );

    if (invalidScores) {
      toastWarn("Scores must be valid numbers between 0 and 10!");
      return;
    }

    const data = {
      id: detailTest.id,
      class_info: detailTest.class_info,
      quiz_name: detailTest.quiz_name,
      scores: scores,
    };

    try {
      const response = await updateTest(data);
      toastSuccess("Score update successful!!");
    } catch (err) {
      toastError("Error");
    }
  };

  return (
    <Div>
      <Span>{detailTest?.quiz_name}</Span>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>STT</Th>
              <Th>Mã học sinh</Th>
              <Th>Tên học sinh</Th>
              <Th>Điểm</Th>
            </tr>
          </thead>
          <tbody>
            {listStudentsCode?.map((item, index) => {
              const studentScore = scores?.find(
                (score) => score.student === item
              );
              return (
                <tr key={index}>
                  <Td style={{ flex: 0.5 }}>{index + 1}</Td>
                  <Td>{item}</Td>
                  <Td>{findStudent(item).full_name}</Td>
                  <Td style={{ flex: 0.5 }}>
                    <Input
                      type="number"
                      step="0.1"
                      value={studentScore ? studentScore.score : ""}
                      onChange={(e) => handleScoreChange(item, e.target.value)}
                    />
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </TableWrapper>
      <DivBtn>
        {(detailTest?.scores.length === 0 && (
          <Btn onClick={handleSubmitScores}>
            <CiSaveUp2 size="15px" />
            Lưu
          </Btn>
        )) || (
          <Btn onClick={handleUpdateScores}>
            <CiSaveUp2 size="15px" />
            Cập nhật
          </Btn>
        )}
      </DivBtn>
      <ToastCtn />
    </Div>
  );
};

export default QuizDetail;
