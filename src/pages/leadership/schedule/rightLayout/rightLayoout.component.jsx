import { useEffect } from "react";
import {
  Item2,
  Key2,
  Date,
  Option,
  DivTime,
  InputTime,
  MessageErorrs,
} from "./rightLayout.styles";

const RightLayout = ({
  sessionsPerWeek,
  register,
  clCodeNew
}) => {
  const items = [];


  for (let i = 0; i < sessionsPerWeek; i++) {
    const date = `date[${i}]`;
    items.push(
      <Item2 key={i}>
        <Key2>Day {i + 1}</Key2>
        <Date {...register(`${date}.day`)}>
          <Option value={1}>Thứ hai</Option>
          <Option value={2}>Thứ ba</Option>
          <Option value={3}>Thứ 4</Option>
          <Option value={4}>Thứ 5</Option>
          <Option value={5}>Thứ 6</Option>
          <Option value={6}>Thứ 7</Option>
          <Option value={0}>Chủ nhật</Option>
        </Date>
        <DivTime>
          <InputTime
            type="time"
            // hasError={!!errors.date?.startTime}
            {...register(`${date}.startTime`, {
              required: "Start time is required!",
            })}
          />
        </DivTime>
        <DivTime>
          <InputTime
            type="time"
            {...register(`${date}.endTime`, {
              required: "End time is required!",
            })}
          />
        </DivTime>
        {/* {errors?.date[i]?.startTime && (
          <MessageErorrs>{errors?.date[i]?.startTime.message}</MessageErorrs>
        )} */}
      </Item2>
    );
  }
  return items;
};

export default RightLayout;
