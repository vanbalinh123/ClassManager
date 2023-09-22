import { useNavigate } from "react-router-dom";

import { ListClass } from "./listClasses.styles";
import { 
  Header,
  TitleList,
  Section,
  DivItem,
  Item
} from "../../../../generalCss/shared.styles";

const ListClasses = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/leader/createSchedule')
  }

  return (
    <ListClass>
      <Header>
        <TitleList>Class Code</TitleList>
        <TitleList>Class Name</TitleList>
        <TitleList>Teacher Name</TitleList>
        <TitleList>Course</TitleList>
      </Header>
      <Section>
        <DivItem
          onClick={() => handleClick()}
        >
          <Item>TI123</Item>
          <Item>Toiec Basic</Item>
          <Item>Van Ba Linh</Item>
          <Item>27</Item>
        </DivItem>
        <DivItem>
          <Item>TI123</Item>
          <Item>Toiec Basic</Item>
          <Item>Van Ba Linh</Item>
          <Item>27</Item>
        </DivItem>
        <DivItem>
          <Item>TI123</Item>
          <Item>Toiec Basic</Item>
          <Item>Van Ba Linh</Item>
          <Item>27</Item>
        </DivItem>
        <DivItem>
          <Item>TI123</Item>
          <Item>Toiec Basic</Item>
          <Item>Van Ba Linh</Item>
          <Item>27</Item>
        </DivItem>
        <DivItem>
          <Item>TI123</Item>
          <Item>Toiec Basic</Item>
          <Item>Van Ba Linh</Item>
          <Item>27</Item>
        </DivItem>
      </Section>
    </ListClass>
  );
};

export default ListClasses;
