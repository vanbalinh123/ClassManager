import {
  Item2,
  Key2,
  Date,
  Option,
  DivTime,
  InputTime,
  MessageErorrs,
} from "./rightLayout.styles";

const RightLayout = ({ sessionsPerWeek, register, errors }) => {
  const items = [];

  for (let i = 0; i < sessionsPerWeek; i++) {
    const date = `date[${i}]`;
    items.push(
      <Item2 key={i}>
        <Key2>Day {i + 1}</Key2>
        <Date {...register(`${date}.day`)}>
          <Option value={1}>Monday</Option>
          <Option value={2}>Tuesday</Option>
          <Option value={3}>Wednesday</Option>
          <Option value={4}>Thursday</Option>
          <Option value={5}>Friday</Option>
          <Option value={6}>Saturday</Option>
          <Option value={0}>Sunday</Option>
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
