import { useState } from "react";
import { useParams } from "react-router-dom";
import { useClassSessionQuery } from "../../../../../../../redux/api/leader/class-session.slice";
import { useUpdateClassSessionMutation } from "../../../../../../../redux/api/leader/class-session.slice";
import { GrLinkNext } from "react-icons/gr";
import { RiSaveLine } from "react-icons/ri";
import {
  DivReschedule,
  Old,
  New,
  Item,
  Span,
  Input,
  DivBtn,
  Btn,
} from "./reschedule.styles";
import generalStyles from "../../../../../../../generalCss/general.styles";
import { ToastCtn, toastError, toastSuccess, toastWarn } from "../../../../../../../components/toast/toast";

const Reschedule = () => {
  const { idSession } = useParams();
  const [newDay, setNewDay] = useState("");
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndTime, setNewEndTime] = useState("");
  const [newRoom, setNewRoom] = useState("");
  const { data: session } = useClassSessionQuery(Number(idSession));
  const [updateClassSession] = useUpdateClassSessionMutation();

  const handleSave = async () => {
    if(newDay === "" || newStartTime === "" || newEndTime === "" || newRoom === "") {
      return toastWarn('Cannot be left blank!!')
    }
    const data = {
      id: Number(idSession),
      day: newDay,
      start_time: newStartTime,
      end_time: newEndTime,
      room: newRoom
    }

    try {
      const response = updateClassSession(data);
      toastSuccess('Success!!')
    } catch(err) {
      toastError('Error!!')
    }
  };


  return (
    <DivReschedule>
      <Old>
        <Item>
          <Span style={{ color: `${generalStyles.bgc}`, fontWeight: "bold" }}>
            Day:
          </Span>
          <Span>{session?.day}</Span>
        </Item>
        <Item>
          <Span style={{ color: `${generalStyles.bgc}`, fontWeight: "bold" }}>
            Start time:
          </Span>
          <Span>{session?.start_time}</Span>
        </Item>
        <Item>
          <Span style={{ color: `${generalStyles.bgc}`, fontWeight: "bold" }}>
            End time:
          </Span>
          <Span>{session?.end_time}</Span>
        </Item>
        <Item>
          <Span style={{ color: `${generalStyles.bgc}`, fontWeight: "bold" }}>
            Room:
          </Span>
          <Span>{session?.room}</Span>
        </Item>
      </Old>
      <GrLinkNext size="40px" />
      <New>
        <Item>
          <Span style={{ color: `${generalStyles.bgc}`, fontWeight: "bold" }}>
            Day:
          </Span>
          <Input
            type="date"
            value={newDay}
            onChange={(e) => setNewDay(e.target.value)}
          />
        </Item>
        <Item>
          <Span style={{ color: `${generalStyles.bgc}`, fontWeight: "bold" }}>
            Start time:
          </Span>
          <Input
            type="time"
            value={newStartTime}
            onChange={(e) => setNewStartTime(e.target.value)}
          />
        </Item>
        <Item>
          <Span style={{ color: `${generalStyles.bgc}`, fontWeight: "bold" }}>
            End time:
          </Span>
          <Input
            type="time"
            value={newEndTime}
            onChange={(e) => setNewEndTime(e.target.value)}
          />
        </Item>
        <Item>
          <Span style={{ color: `${generalStyles.bgc}`, fontWeight: "bold" }}>
            Room:
          </Span>
          <Input
            type="text"
            value={newRoom}
            onChange={(e) => setNewRoom(e.target.value)}
          />
        </Item>
      </New>
      <DivBtn>
        <Btn onClick={handleSave}>
          <RiSaveLine size="15px" />
          Save
        </Btn>
      </DivBtn>
      <ToastCtn />
    </DivReschedule>
  );
};

export default Reschedule;
