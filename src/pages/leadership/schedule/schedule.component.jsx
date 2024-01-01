import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import { useParams } from "react-router-dom";

import { toastSuccess } from "../../../components/toast/toast";
import { toastError } from "../../../components/toast/toast";
import { ToastCtn } from "../../../components/toast/toast";
import { filterDays } from "./funcCalDayOfWeek";

import { calculateClassSchedule } from "./funcCalSche";
import { useCreateScheduleMutation } from "../../../redux/api/leader/schedule-api.slice";
import { useListSchedulesQuery } from "../../../redux/api/leader/schedule-api.slice";
import { useUpdateScheduleMutation } from "../../../redux/api/leader/schedule-api.slice";
import { useCreateInfoClassMutation } from "../../../redux/api/teacher/class-information-api";

import { Page, Title } from "../../../generalCss/shared.styles";
import LeftLayout from "./leftLayout/leftLayout.component";
import RightLayout from "./rightLayout/rightLayoout.component";
import UploadScheduleXml from "./uploadScheduleXml/uploadScheduleXml.component";

import { Form, Right, DivBtn, Btn } from "./schedule.styles";
import { useEffect } from "react";

const CreateSchedule = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const { classCode: classCodeParam } = useParams();
  const sessionsPerWeek = Math.min(watch("week", 0), 7);
  let daysOfWeek = [];
  const [createSchedule] = useCreateScheduleMutation();
  const [updateSchedule] = useUpdateScheduleMutation();
  const [createClassInfo] = useCreateInfoClassMutation();
  const { data: listSchedule } = useListSchedulesQuery();
  let findSchedule = {};
  let id;
  let clCodeNew = "";

  if (classCodeParam !== "new") {
    findSchedule = listSchedule?.find(
      (item) => item.class_code === classCodeParam
    );
    if (findSchedule === undefined) {
      clCodeNew = classCodeParam;
    } else {
      id = findSchedule.id;
    }
  }

  useEffect(() => {
    if (classCodeParam !== "new") {
      setValue("teacherCode", findSchedule?.teacher_code);
      if (clCodeNew === "") {
        setValue("classCode", findSchedule?.class_code);
      } else {
        setValue("classCode", clCodeNew);
      }

      setValue("course", findSchedule?.num_sessions_per_course);
      setValue("week", findSchedule?.num_sessions_per_week);
      setValue("startDate", findSchedule?.start_day);
      setValue("room", findSchedule?.class_sessions_set[0].room);
      if (clCodeNew === "") {
        const scheduleDetails = findSchedule?.class_sessions_set;
        console.log(scheduleDetails);
        const totalSessionsPerWeek = findSchedule?.num_sessions_per_week;
        const listDayOfWeekToUpdate = filterDays(
          scheduleDetails,
          totalSessionsPerWeek
        );
        console.log(listDayOfWeekToUpdate);
        listDayOfWeekToUpdate?.forEach((session, index) => {
          setValue(`date[${index}].room`, session.room);
          setValue(`date[${index}].startTime`, session.startTime);
          setValue(`date[${index}].endTime`, session.endTime);
          setValue(`date[${index}].day`, session.dayOfWeek);
        });
      }
    } else {
      setValue("teacherCode", "");
      setValue("course", "");
      setValue("week", "");
      setValue("startDate", "");
      setValue("room", "");
    }
  }, [classCodeParam]);

  const onSubmit = async (data) => {
    await data.date.map((item) => {
      if (item.startTime !== "" || item.endTime !== "") {
        daysOfWeek.push(Number(item.day));
      }
    });

    const sessionDetails = data.date.map((item) => ({
      day: Number(item.day),
      startTime: String(item.startTime),
      endTime: String(item.endTime),
    }));

    data.date.map((item) => {
      return console.log(item);
    });

    console.log(daysOfWeek.sort());

    const classSessions = await calculateClassSchedule(
      data.startDate,
      Number(data.course),
      Number(sessionsPerWeek),
      daysOfWeek.sort(),
      sessionDetails,
      data.room
    );

    console.log(classSessions);

    if (classCodeParam === "new") {
      const dataSchedule = {
        teacher_code: data.teacherCode,
        class_code: data.classCode,
        num_sessions_per_course: Number(data.course),
        num_sessions_per_week: Number(data.week),
        start_day: data.startDate,
        class_sessions_set: classSessions,
      };
      const response = await createSchedule(dataSchedule);
      const classInfo = {
        class_info: data.classCode,
        Teachers: data.teacherCode,
        students: [],
      };

      await createClassInfo(classInfo);

      if (response.data) {
        toastSuccess(`Tạo lịch dạy cho lớp ${data.classCode} thành công`);
        setValue("teacherCode", "");
        setValue("course", "");
        setValue("week", "");
        setValue("startDate", "");
        setValue("room", "");
        navigate("/leader/class");
      } else {
        toastError("Đã xảy ra lỗi!!");
      }
    } else {
      if (clCodeNew === "") {
        const dataSchedule = {
          id: id,
          teacher_code: data.teacherCode,
          class_code: data.classCode,
          num_sessions_per_course: Number(data.course),
          num_sessions_per_week: Number(data.week),
          start_day: data.startDate,
          class_sessions_set: classSessions,
        };

        const response = await updateSchedule(dataSchedule);

        if (response.data) {
          toastSuccess(
            `Update a teaching schedule for ${data.classCode} successful`
          );
          setValue("teacherCode", "");
          setValue("course", "");
          setValue("week", "");
          setValue("startDate", "");
          setValue("room", "");
          navigate("/leader/class");
        } else {
          toastError("Error");
        }
      } else {
        const dataSchedule = {
          teacher_code: data.teacherCode,
          class_code: data.classCode,
          num_sessions_per_course: Number(data.course),
          num_sessions_per_week: Number(data.week),
          start_day: data.startDate,
          class_sessions_set: classSessions,
        };
        const response = await createSchedule(dataSchedule);
        const classInfo = {
          class_info: data.classCode,
          Teachers: data.teacherCode,
          students: [],
        };
        await createClassInfo(classInfo);

        if (response.data) {
          toastSuccess(
            `Create a teaching schedule for ${data.classCode} successful`
          );
          setValue("teacherCode", "");
          setValue("course", "");
          setValue("week", "");
          setValue("startDate", "");
          setValue("room", "");
          navigate("/leader/class");
        } else {
          toastError("Error");
        }
      }
    }
    daysOfWeek = [];
  };

  return (
    <Page>
      {(classCodeParam === "new" && <Title>TẠO LỊCH DẠY</Title>) ||
        (clCodeNew === "" && (
          <Title>CẬP NHẬT LỊCH DẠY {classCodeParam}</Title>
        )) || <Title>TẠO LỊCH DẠY</Title>}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <LeftLayout
          register={register}
          errors={errors}
          classCodeParam={classCodeParam}
          findSchedule={findSchedule}
          clCodeNew={clCodeNew}
        />
        <Right>
          <RightLayout
            sessionsPerWeek={sessionsPerWeek}
            register={register}
            errors={errors}
            clCodeNew={clCodeNew}
          />
        </Right>
        <DivBtn>
          {(classCodeParam === "new" && (
            <Btn>
              <IoAdd size="15px" />
              Lưu
            </Btn>
          )) ||
            (clCodeNew === "" && (
              <Btn>
                <IoAdd size="15px" />
                Cập nhật
              </Btn>
            )) || (
              <Btn>
                <IoAdd size="15px" />
                Lưu
              </Btn>
            )}
        </DivBtn>
      </Form>
      {classCodeParam === "new" && <UploadScheduleXml />}
      <ToastCtn />
    </Page>
  );
};

export default CreateSchedule;
