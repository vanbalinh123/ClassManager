import {
  Left,
  DivInputs,
  Item,
  Key,
  DivInput,
  Input,
  MessageErorrs,
} from "./leftLayout.styles";

const LeftLayout = ({ register, errors }) => {
  return (
    <Left>
      <DivInputs>
        <Item>
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
        {errors.name && <MessageErorrs>{errors.name.message}</MessageErorrs>}
        <Item>
          <Key>Teacher code</Key>
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
          <Key>Class code</Key>
          <DivInput>
            <Input
              type="text"
              placeholder="Class code..."
              hasError={!!errors.classCode}
              {...register("classCode", {
                required: "Class Code is required!",
              })}
            />
          </DivInput>
        </Item>
        {errors.classCode && (
          <MessageErorrs>{errors.classCode.message}</MessageErorrs>
        )}
        <Item>
          <Key>Number of sessions/courses</Key>
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
          <Key>Number of sessions/week</Key>
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
          <Key>Start day</Key>
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
          <Key>Room</Key>
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
