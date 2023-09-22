import { useForm } from "react-hook-form";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";


import { Page, Title } from "../../../generalCss/shared.styles";
import LeftLayout from "./leftLayout/leftLayout.component";
import RightLayout from "./rightLayout/rightLayoout.component";

import { Form, Right, DivBtn, Btn } from "./schedule.styles";

const CreateSchedule = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const sessionsPerWeek = Math.min(watch("week", 0), 7);

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <Page>
      <Title>Create a teaching schedule</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <LeftLayout 
          register={register} 
          errors={errors} />
        <Right>
          <RightLayout
            sessionsPerWeek={sessionsPerWeek}
            register={register}
            errors={errors}
          />
        </Right>
        <DivBtn>
          <Btn>
            <IoAdd size="15px"/>
            Create
          </Btn>
        </DivBtn>
      </Form>
    </Page>
  );
};

export default CreateSchedule;
