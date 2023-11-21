import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineNavigateNext } from "react-icons/md";
import { BsSend } from "react-icons/bs";
import { useCreateNotiAdminMutation } from "../../../../redux/api/leader/admin-notifications.slice";
import {
  toastSuccess,
  toastError,
  ToastCtn,
} from "../../../../components/toast/toast";
import { Page, Title } from "../../../../generalCss/shared.styles";

import {
  Form,
  TitleNoti,
  ContentNoti,
  DivHis,
  BtnHis,
  DivRole,
  Select,
  Option,
  Span,
  DivInput,
  Input,
  Textarea,
  DivTextarea,
  DivSend,
  BtnSend,
} from "./createNotification.styles";

const CreateNotification = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [createNoti] = useCreateNotiAdminMutation();

  const [selectedValue, setSelectedValue] = useState("All");
  const userCode = JSON.parse(localStorage.getItem("user_code"));

  const handleSelectChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
  };

  const onSubmit = async (data) => {
    if (selectedValue === "All") {
      const dataTeacher = {
        usercode: userCode,
        title: data.title,
        content: data.content,
        role: "teacher",
      };
      const dataStudent = {
        usercode: userCode,
        title: data.title,
        content: data.content,
        role: "student",
      };
      const dataParents = {
        usercode: userCode,
        title: data.title,
        content: data.content,
        role: "parent",
      };

      await createNoti(dataTeacher);
      await createNoti(dataStudent);
      await createNoti(dataParents);
      setValue("title", "");
      setValue("content", "");
      setSelectedValue("All");
      toastSuccess(`Create Notifications successful`);
    } else {
      const dataRes = {
        usercode: userCode,
        title: data.title,
        content: data.content,
        role: selectedValue.toLowerCase(),
      };

      const response = await createNoti(dataRes);

      if (response.data) {
        setValue("title", "");
        setValue("content", "");
        setSelectedValue("All");
        toastSuccess(`Create Notifications successful`);
      } else {
        toastError(`Create Notifications fail, try again!!`);
      }
    }
  };

  return (
    <Page>
      <Title>Create Notification</Title>
      <DivHis>
        <BtnHis onClick={() => navigate("/leader/historyNotifications")}>
          History
          <MdOutlineNavigateNext size="15px" />
        </BtnHis>
      </DivHis>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <DivRole>
          Send to:
          <Select value={selectedValue} onChange={handleSelectChange}>
            <Option value="All">All</Option>
            <Option value="Teacher">Teacher</Option>
            <Option value="Student">Student</Option>
            <Option value="Parents">Parents</Option>
          </Select>
        </DivRole>
        <TitleNoti>
          <Span>Title</Span>
          <DivInput>
            <Input
              type="text"
              placeholder="Title..."
              hasError={!!errors.title}
              {...register("title", {
                required: "Title is required!",
              })}
            />
          </DivInput>
        </TitleNoti>
        <ContentNoti>
          <Span>Content</Span>
          <DivTextarea>
            <Textarea
              type="text"
              placeholder="Content..."
              hasError={!!errors.content}
              {...register("content", {
                required: "Content is required!",
              })}
            />
          </DivTextarea>
        </ContentNoti>
        <DivSend>
          <BtnSend>
            <BsSend size="15px" />
            Send
          </BtnSend>
        </DivSend>
      </Form>
      <ToastCtn />
    </Page>
  );
};

export default CreateNotification;
