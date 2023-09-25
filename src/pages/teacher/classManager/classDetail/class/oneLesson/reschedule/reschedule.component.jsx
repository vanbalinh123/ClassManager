import { GrLinkNext } from "react-icons/gr";
import { RiSaveLine } from "react-icons/ri";
import { DivReschedule, Old, New, Item, Span, Input, DivBtn, Btn } from "./reschedule.styles";
import generalStyles from "../../../../../../../generalCss/general.styles";

const Reschedule = () => {
  return (
    <DivReschedule>
      <Old>
        <Item>
          <Span style={{color: `${generalStyles.bgc}`, fontWeight: 'bold'}}>Day:</Span>
          <Span>22/10/2023</Span>
        </Item>
        <Item>
          <Span style={{color: `${generalStyles.bgc}`, fontWeight: 'bold'}}>Start time:</Span>
          <Span>7:00</Span>
        </Item>
        <Item>
          <Span style={{color: `${generalStyles.bgc}`, fontWeight: 'bold'}}>End time:</Span>
          <Span>9:00</Span>
        </Item>
        <Item>
          <Span style={{color: `${generalStyles.bgc}`, fontWeight: 'bold'}}>Room:</Span>
          <Span>P201</Span>
        </Item>
      </Old>
      <GrLinkNext size="40px" />
      <New>
        <Item>
          <Span style={{color: `${generalStyles.bgc}`, fontWeight: 'bold'}}>Day:</Span>
          <Input type="date" />
        </Item>
        <Item>
          <Span style={{color: `${generalStyles.bgc}`, fontWeight: 'bold'}}>Start time:</Span>
          <Input type="time" />
        </Item>
        <Item>
          <Span style={{color: `${generalStyles.bgc}`, fontWeight: 'bold'}}>End time:</Span>
          <Input type="time" />
        </Item>
        <Item>
          <Span style={{color: `${generalStyles.bgc}`, fontWeight: 'bold'}}>Room:</Span>
          <Input type='text' />
        </Item>
      </New>
      <DivBtn>
        <Btn>
            <RiSaveLine size="15px" />
            Save
        </Btn>
      </DivBtn>
    </DivReschedule>
  );
};

export default Reschedule;
