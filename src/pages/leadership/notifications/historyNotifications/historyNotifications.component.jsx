import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useListNotiAdminQuery } from "../../../../redux/api/leader/admin-notifications.slice";
import ListNotifications from "./listNotifications/listNotifications.component";
import SearchContainer from "../../../../components/search/search";
import { IoChevronBack } from "react-icons/io5";
import { Page, Title } from "../../../../generalCss/shared.styles";
import { DivBtn, Btn } from "./historyNotifications.styles";

const LeaderHistoryNotifications = () => {
    const navigate = useNavigate();
    const [valueSearch, setValueSearch] = useState("");
    
    const { data: listNotiAdmins } = useListNotiAdminQuery({
      search: `${valueSearch}`,
    });

    const userCode = JSON.parse(localStorage.getItem("user_code"));
  const listNotificationsAdmin = listNotiAdmins?.filter((item) => item.usercode === userCode);
    
  return (
    <Page>
      <Title>Lịch sử thông báo</Title>
      {/* <FilterNotifications /> */}
      <SearchContainer 
        setValueSearch={setValueSearch}
        placeholder='Tiêu đề, nội dung, ngày...'
        type='text'
      />
      <ListNotifications 
        listNotificationsAdmin={listNotificationsAdmin}
      />
      {/* <DivBtn>
        <Btn
            onClick={() => navigate('/leader/createNotification')}
        >
            <IoChevronBack size="15px" />
            Back
        </Btn>
      </DivBtn> */}
    </Page>
  );
};

export default LeaderHistoryNotifications;
