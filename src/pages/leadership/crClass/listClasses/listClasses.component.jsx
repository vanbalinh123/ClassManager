import { useNavigate } from "react-router-dom";

import { ListClass } from "./listClasses.styles";
import { 
  Header,
  TitleList,
  Section,
  DivItem,
  Item
} from "../../../../generalCss/shared.styles";

const ListClasses = ({listClasses}) => {
  const navigate = useNavigate();
  console.log(listClasses)

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
        {listClasses?.map(item => (
          <DivItem
          onClick={() => handleClick()}
        >
          <Item>{item.class_code}</Item>
          <Item>{item.class_name}</Item>
          <Item>Van Ba Linh</Item>
          <Item>{item.course}</Item>
        </DivItem>
        ))}
      </Section>
    </ListClass>
  );
};

export default ListClasses;
