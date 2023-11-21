import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import { useParams } from "react-router-dom";

import { toastSuccess } from "../../../components/toast/toast";
import { toastError } from "../../../components/toast/toast";
import { ToastCtn } from "../../../components/toast/toast";

import { calculateClassSchedule } from "./funcCalSche";
import { useCreateScheduleMutation } from "../../../redux/api/leader/schedule-api.slice";
import { useListSchedulesQuery } from "../../../redux/api/leader/schedule-api.slice";

import { Page, Title } from "../../../generalCss/shared.styles";
import LeftLayout from "./leftLayout/leftLayout.component";
import RightLayout from "./rightLayout/rightLayoout.component";

import { Form, Right, DivBtn, Btn } from "./schedule.styles";
import { useEffect } from "react";

const CreateSchedule = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();
  const { classCode: classCodeParam } = useParams();
  const sessionsPerWeek = Math.min(watch("week", 0), 7);
  const daysOfWeek = [];
  const [createSchedule] = useCreateScheduleMutation();
  const {data: listSchedule} = useListSchedulesQuery();
  let findSchedule = {};

  if (classCodeParam !== "new") {
    findSchedule = listSchedule?.find((item) => item.class_code === classCodeParam);
  }

  console.log(findSchedule)
  
  useEffect(() => {
    if(classCodeParam !== 'new') {
        setValue("teacherCode", findSchedule?.teacher_code);
        setValue("classCode", findSchedule?.class_code);
        setValue("course", findSchedule?.num_sessions_per_course);
        setValue("week", findSchedule?.num_sessions_per_week);
        setValue("startDate", findSchedule?.start_day);
        setValue("room", findSchedule?.class_sessions_set[0].room);
    }
  }, [])


  const onSubmit = async (data) => {
    await data.date.map((item) => {
      console.log(item);
      if (item.startTime !== "" || item.endTime !== "") {
        daysOfWeek.push(Number(item.day));
      }
    });

    const sessionDetails = data.date.map((item) => ({
      day: Number(item.day),
      startTime: String(item.startTime),
      endTime: String(item.endTime),
    }));


    const classSessions = await calculateClassSchedule(
      data.startDate,
      Number(data.course),
      Number(sessionsPerWeek),
      daysOfWeek,
      sessionDetails,
      data.room
    );

    console.log(classSessions)

    const dataSchedule = {
      teacher_code: data.teacherCode,
      class_code: data.classCode,
      num_sessions_per_course: Number(data.course),
      num_sessions_per_week: Number(data.week),
      start_day: data.startDate,
      class_sessions_set: classSessions,
    };

    if(classCodeParam === 'new') {
      const response = await createSchedule(dataSchedule);

      if (response.data) {
        toastSuccess(
          `Create a teaching schedule for ${data.classCode} successful`
        );
        setValue("teacherCode", "");
        setValue("course", "");
        setValue("week", "");
        setValue("startDate", "");
        setValue("room", "");
      } else {
        toastError("Error");
      }
    } else {
      console.log('cc')
    }


  };

  return (
    <Page>
      <Title>Create a teaching schedule</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <LeftLayout 
          register={register} 
          errors={errors} 
          classCodeParam={classCodeParam}
          findSchedule={findSchedule}
        />
        <Right>
          <RightLayout
            sessionsPerWeek={sessionsPerWeek}
            register={register}
            errors={errors}
            classCodeParam={classCodeParam}
            findSchedule={findSchedule}
          />
        </Right>
        <DivBtn>
          <Btn>
            <IoAdd size="15px" />
            Create
          </Btn>
        </DivBtn>
      </Form>
      <ToastCtn />
    </Page>
  );
};

export default CreateSchedule;
