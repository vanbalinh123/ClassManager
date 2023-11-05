import RightLayout from "../rightLayout.component";
import SidebarParents from "./sidebarParents.component";

import { Page, Left, DivLogo, Logo } from "../page";

const TemplateParents = () => {
  return (
    <Page>
      <Left>
        <DivLogo>
          <Logo src="/imgs/logo-login.png" alt="logo" />
        </DivLogo>
        <SidebarParents />
      </Left>
      <RightLayout />
    </Page>
  );
};

export default TemplateParents;
