import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import { toast } from "react-toastify";

import { calculateClassSchedule } from "./funcCalSche";
import { useCreateScheduleMutation } from "../../../redux/api/leader/schedule-api.slice";

import { Page, Title } from "../../../generalCss/shared.styles";
import LeftLayout from "./leftLayout/leftLayout.component";
import RightLayout from "./rightLayout/rightLayoout.component";

import { Form, Right, DivBtn, Btn } from "./schedule.styles";

const CreateSchedule = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const sessionsPerWeek = Math.min(watch("week", 0), 7);
  const [createSchedule] = useCreateScheduleMutation();
  const daysOfWeek = [];
  const startTime = {
    hour: 0,
    minute: 0,
  };
  const endTime = {
    hour: 0,
    minute: 0,
  };

  const onSubmit = async (data) => {
    await data.date.map((item) => {
      daysOfWeek.push(Number(item.day));
      const [hourSt, minuteSt] = item.startTime.split(":").map(Number);
      startTime.hour = hourSt;
      startTime.minute = minuteSt;

      const [hourE, minuteE] = item.endTime.split(":").map(Number);
      endTime.hour = hourE;
      endTime.minute = minuteE;
    });

    const class_sessions = await calculateClassSchedule(
      data.startDate,
      Number(data.course),
      Number(data.week),
      daysOfWeek,
      startTime,
      endTime,
      data.room
    );

    const formattedClassSessions = await class_sessions.map((session) => {
      const formattedSession = {
        day: session.date.toISOString().split("T")[0],
        start_time: session.startTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        end_time: session.endTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        room: session.room,
      };
      return formattedSession;
    });

    const dataSchedule = {
      teacher_code: data.teacherCode,
      class_code: data.classCode,
      num_sessions_per_course: data.course,
      num_sessions_per_week: data.week,
      start_day: data.startDate,
      class_sessions: formattedClassSessions,
    };

    const response = await createSchedule(dataSchedule);
    console.log(response);
    alert("oke");
    // toast.success('Thành công!')
    // navigate("/leader/createClasses")
  };

  return (
    <Page>
      <Title>Create a teaching schedule</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <LeftLayout register={register} errors={errors} />
        <Right>
          <RightLayout
            sessionsPerWeek={sessionsPerWeek}
            register={register}
            errors={errors}
          />
        </Right>
        <DivBtn>
          <Btn>
            <IoAdd size="15px" />
            Create
          </Btn>
        </DivBtn>
      </Form>
    </Page>
  );
};

export default CreateSchedule;
