import { useNavigate } from "react-router-dom";

import FilterNotifications from "./filterNotifications/filterNotifications.component";
import ListNotifications from "./listNotifications/listNotifications.component";

import { IoChevronBack } from "react-icons/io5";
import { Page, Title } from "../../../../generalCss/shared.styles";
import { DivBtn, Btn } from "./historyNotifications.styles";

const LeaderHistoryNotifications = () => {
    const navigate = useNavigate();

  return (
    <Page>
      <Title>Notifications History</Title>
      <FilterNotifications />
      <ListNotifications />
      <DivBtn>
        <Btn
            onClick={() => navigate('/leader/createNotification')}
        >
            <IoChevronBack size="15px" />
            Back
        </Btn>
      </DivBtn>
    </Page>
  );
};

export default LeaderHistoryNotifications;
