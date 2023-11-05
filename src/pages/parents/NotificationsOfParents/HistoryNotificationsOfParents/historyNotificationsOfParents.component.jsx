import { useNavigate } from "react-router-dom";
import {IoAddSharp} from "react-icons/io5";

import FilterNotificationsOfParents from "./filterNotificationsOfParents/filterNotificationsOfParents.component";
import ListNotificationsOfParents from "./listNotificationsOfParents/listNotificationsOfParents.component";
import { Page, Title } from "../../../../generalCss/shared.styles";


const HistoryNotificationParents = () => {
    const navigate = useNavigate();
  
    return (
      <Page>
        <Title>Notifications History</Title>
        <FilterNotificationsOfParents />
        <ListNotificationsOfParents />
      </Page>
    );
  };
  
  export default HistoryNotificationParents;