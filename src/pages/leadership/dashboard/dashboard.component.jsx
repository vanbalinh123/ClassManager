import { Page, Title } from "../../../generalCss/shared.styles";
import { Div, DivChart } from "./dashboard.styles";

import TopProduct from "./dbClass/dbClass.component";

const DashBoard = () => {
  return (
    <Page>
      <Title>Dashboard</Title>
      <Div>
        <DivChart>
            <TopProduct />
        </DivChart>
        <DivChart>cc2</DivChart>
      </Div>
      <Div>
        <DivChart>cc3</DivChart>
        <DivChart>cc4</DivChart>
      </Div>
    </Page>
  );
};

export default DashBoard;
