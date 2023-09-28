import RightLayout from "../rightLayout.component";
import SidebarTeacher from "./sidebarTeacher.component";

import {
  Page,
  Left,
  DivLogo,
  Logo,
} from "../page";

const TemplateTeacher = () => {

  return (
    <Page>
      <Left>
        <DivLogo>
          <Logo src="/imgs/logo-template.png" alt="logo" />
        </DivLogo>
        <SidebarTeacher />
      </Left>
      <RightLayout />
    </Page>
  );
};

export default TemplateTeacher;
