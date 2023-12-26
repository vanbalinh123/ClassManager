import { Page, Title } from "../../../generalCss/shared.styles";
import { Div, DivChart } from "./dashboard.styles";

import ChartClass from "./dbClass/dbClass.component";
import ChartScore from "./dbScore/dbScore.component";
import ChartAbsent from "./dbAbsent/dbAbsent.component";
import ChartTuition from "./dbTuition/dbTuition.component";

const DashBoard = () => {
  return (
    <Page>
      <Title>Biểu đồ tổng quát</Title>
      <Div>
        <DivChart>
            <ChartTuition />
        </DivChart>
        <DivChart>
            <ChartClass />
        </DivChart>
        <DivChart>
          <ChartScore />
        </DivChart>
        <DivChart>
          <ChartAbsent />
        </DivChart>
      </Div>
    </Page>
  );
};

export default DashBoard;
