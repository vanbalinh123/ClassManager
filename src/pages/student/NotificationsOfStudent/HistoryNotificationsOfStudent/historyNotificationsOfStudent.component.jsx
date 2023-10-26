import { useNavigate } from "react-router-dom";
import {IoAddSharp} from "react-icons/io5";

import FilterNotificationsOfStudent from './filterNotificationsOfStudent/filterNotificationsOfStudent.component';
import ListNotificationsOfStudent from './listNotificationsOfStudent/listNotificationsOfStudent.component';
import { Page, Title } from "../../../../generalCss/shared.styles";


const HistoryNotificationStudent = () => {
    const navigate = useNavigate();
  
    return (
      <Page>
        <Title>Notifications History</Title>
        <FilterNotificationsOfStudent />
        <ListNotificationsOfStudent />
      </Page>
    );
  };
  
  export default HistoryNotificationStudent;