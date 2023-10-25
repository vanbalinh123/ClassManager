import RightLayout from "../rightLayout.component";
import SidebarStudent from "./sidebarStudent.component";

import { Page, Left, DivLogo, Logo } from "../page";

const TemplateStudent = () => {
  return (
    <Page>
      <Left>
        <DivLogo>
          <Logo src="/imgs/logo-login.png" alt="logo" />
        </DivLogo>
        <SidebarStudent />
      </Left>
      <RightLayout />
    </Page>
  );
};

export default TemplateStudent;
