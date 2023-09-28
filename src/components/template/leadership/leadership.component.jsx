import RightLayout from "../rightLayout.component";
import SidebarLeader from "./sidebarLeader.component";

import {
  Page,
  Left,
  DivLogo,
  Logo,
} from "../page";

const TemplateLeader = () => {

  return (
    <Page>
      <Left>
        <DivLogo>
          <Logo src="/imgs/logo-template.png" alt="logo" />
        </DivLogo>
        <SidebarLeader />
      </Left>
      <RightLayout />
    </Page>
  );
};

export default TemplateLeader;
