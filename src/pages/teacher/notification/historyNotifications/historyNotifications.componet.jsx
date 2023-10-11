import { useNavigate } from "react-router-dom";
import {IoAddSharp} from "react-icons/io5"


import FilterNotifications from "./filterNotifications/filterNotifications.component";
import ListNotifications from "./listNotifications/listNotifications.comonent";

import { Page, Title } from "../../../../generalCss/shared.styles";

import { DivBtn, Btn } from "./historyNotifications.styles";

const HistoryNotificationTeacher = () => {
  const navigate = useNavigate();

  return (
    <Page>
      <Title>Notifications History</Title>
      <DivBtn>
        <Btn
            onClick={() => navigate('/teacher/createNotification')}
        >
            <IoAddSharp size="15px" />
            Create
        </Btn>
      </DivBtn>
      <FilterNotifications />
      <ListNotifications />
    </Page>
  );
};

export default HistoryNotificationTeacher;
