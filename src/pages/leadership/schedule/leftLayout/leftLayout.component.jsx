import { useEffect, useState } from "react";
import { useListSchedulesQuery } from "../../../../redux/api/leader/schedule-api.slice";
import { useListClassQuery } from "../../../../redux/api/leader/class-api.slice";
import { useParams } from "react-router-dom";
import {
  Left,
  DivInputs,
  Item,
  Key,
  DivInput,
  Input,
  Select,
  Option,
  MessageErorrs,
} from "./leftLayout.styles";

const LeftLayout = ({
  register,
  errors,
  findSchedule,
  classCodeParam,
  clCodeNew,
}) => {
  const { data: listSchedules } = useListSchedulesQuery();
  const { data: listClasses } = useListClassQuery();

  const uniqueClassCodes = [];

  listSchedules?.forEach((itemSche) => {
    if (!uniqueClassCodes.includes(itemSche.class_code)) {
      uniqueClassCodes.push(itemSche.class_code);
    }
  });

  const result = listClasses?.filter(
    (item) => !uniqueClassCodes.includes(item.class_code)
  );

  return (
    <Left>
      <DivInputs>
        {/* <Item>
          <Key>Teacher's Name</Key>
          <DivInput>
            <Input
              type="text"
              placeholder="Teacher's Name..."
              hasError={!!errors.name}
              {...register("name", {
                required: "Teacher's Name is required!",
              })}
            />
          </DivInput>
        </Item>
        {errors.name && <MessageErorrs>{errors.name.message}</MessageErorrs>} */}
        <Item>
          <Key>Mã giáo viên</Key>
          <DivInput>
            <Input
              type="text"
              placeholder="Teacher code..."
              hasError={!!errors.teacherCode}
              {...register("teacherCode", {
                required: "Teacher's Code is required!",
              })}
            />
          </DivInput>
        </Item>
        {errors.teacherCode && (
          <MessageErorrs>{errors.teacherCode.message}</MessageErorrs>
        )}
        <Item>
          <Key>Mã lớp</Key>
          <DivInput>
            {/* <Input
              type="text"
              placeholder="Class code..."
              hasError={!!errors.classCode}
              {...register("classCode", {
                required: "Class Code is required!",
              })}
            /> */}
            <Select
              {...register("classCode", {
                required: "Class Code is required",
              })}
            >
              {/* {classCodeParam === 'new' 
                && result?.map((item, index) => (
                  <Option key={index}>{item.class_code}</Option>
                )) || <Option>{findSchedule?.class_code}</Option>
              } */}
              {(classCodeParam === "new" &&
                result?.map((item, index) => (
                  <Option key={index}>{item.class_code}</Option>
                ))) ||
                (clCodeNew === '' && (
                  <Option>{findSchedule?.class_code}</Option>
                )) || <Option>{clCodeNew}</Option>}
            </Select>
          </DivInput>
        </Item>
        {errors.classCode && (
          <MessageErorrs>{errors.classCode.message}</MessageErorrs>
        )}
        <Item>
          <Key>Tổng số buổi học/khoá</Key>
          <DivInput>
            <Input
              type="number"
              placeholder="Number of sessions/courses..."
              hasError={!!errors.course}
              {...register("course", {
                required: "Course is required!",
              })}
            />
          </DivInput>
        </Item>
        {errors.course && (
          <MessageErorrs>{errors.course.message}</MessageErorrs>
        )}
        <Item>
          <Key>Tống số buổi học/tuần</Key>
          <DivInput>
            <Input
              type="number"
              placeholder="Number of sessions/week..."
              hasError={!!errors.week}
              {...register("week", {
                required: "Week is required!",
              })}
            />
          </DivInput>
        </Item>
        {errors.week && <MessageErorrs>{errors.week.message}</MessageErorrs>}
        <Item>
          <Key>Ngày bắt đầu</Key>
          <DivInput>
            <Input
              type="date"
              placeholder="Start day..."
              hasError={!!errors.startDate}
              {...register("startDate", {
                required: "Start date is required!",
              })}
            />
          </DivInput>
        </Item>
        {errors.startDate && (
          <MessageErorrs>{errors.startDate.message}</MessageErorrs>
        )}
        <Item>
          <Key>Phòng học</Key>
          <DivInput>
            <Input
              type="text"
              placeholder="Room..."
              hasError={!!errors.room}
              {...register("room", {
                required: "Room is required!",
              })}
            />
          </DivInput>
        </Item>
        {errors.room && <MessageErorrs>{errors.room.message}</MessageErorrs>}
      </DivInputs>
    </Left>
  );
};

export default LeftLayout;
