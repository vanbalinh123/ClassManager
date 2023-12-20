import { useState, useEffect } from "react";
import { CiSaveUp2 } from "react-icons/ci";
import { useParams } from "react-router-dom";
import { useDetailTestQuery } from "../../../../../../../redux/api/teacher/test-api";
import { useInforClassQuery } from "../../../../../../../redux/api/teacher/class-information-api";
import { useListStudentsQuery } from "../../../../../../../redux/api/leader/list-users-api.slice";
import { useUpdateTestMutation } from "../../../../../../../redux/api/teacher/test-api";

import {
  Div,
  Header,
  TitleList,
  Section,
  DivItem,
  Item,
  Span,
  Input,
  DivBtn,
  Btn,
} from "./quizDetail.styles";
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
          score: Number(score),
          test_and_quiz: Number(idTest),
        };
        return newScores;
      } else {
        return [
          ...prevScores,
          {
            student: userCode,
            score: Number(score),
            test_and_quiz: Number(idTest),
          },
        ];
      }
    });
  };

  const handleSubmitScores = async () => {
    console.log(scores.length)
      console.log(listStudentsCode.length)
    if (scores.length !== listStudentsCode.length)
      return toastError("Not enough students have been enrolled!");

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
    if (scores.length !== listStudentsCode.length)
      return toastError("Not enough students have been enrolled!");

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
      toastSuccess("Score update successful!!");
    } catch (err) {
      toastError("Error");
    }
  };

  return (
    <Div>
      <Span>{detailTest?.quiz_name}</Span>
      <Header>
        <TitleList style={{ flex: 0.5 }}>Index</TitleList>
        <TitleList>Student Code</TitleList>
        <TitleList>Student Name</TitleList>
        <TitleList style={{ flex: 0.5 }}>Score</TitleList>
      </Header>
      <Section>
        {listStudentsCode?.map((item, index) => {
          const studentScore = scores?.find((score) => score.student === item);
          return (
            <DivItem key={index}>
              <Item style={{ flex: 0.5 }}>{index + 1}</Item>
              <Item>{item}</Item>
              <Item>{findStudent(item).full_name}</Item>
              <Item style={{ flex: 0.5 }}>
                <Input
                  min={0}
                  max={10}
                  type="number"
                  value={studentScore ? studentScore.score : ""}
                  onChange={(e) => handleScoreChange(item, e.target.value)}
                />
              </Item>
            </DivItem>
          );
        })}
      </Section>
      <DivBtn>
        {(detailTest?.scores.length === 0 && (
          <Btn onClick={handleSubmitScores}>
            <CiSaveUp2 size="15px" />
            Save
          </Btn>
        )) || (
          <Btn onClick={handleUpdateScores}>
            <CiSaveUp2 size="15px" />
            Update
          </Btn>
        )}
      </DivBtn>
      <ToastCtn />
    </Div>
  );
};

export default QuizDetail;
