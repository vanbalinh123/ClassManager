import { useNavigate } from "react-router-dom";

import { ListClass } from "./listClassesOfStudent.styles";
import { 
    Header,
    TitleList,
    Section,
    DivItem,
    Item
} from "../../../../../generalCss/shared.styles";

const ListClassOfStudent = () => {
    const navigate = useNavigate();
  
    const handleItemClick = () => {
      navigate('/teacher/listClasses/classDetail')
    }
  
    return (
      <ListClass>
        <Header>
          <TitleList>Class Code</TitleList>
          <TitleList>Class Name</TitleList>
          <TitleList>Course</TitleList>
        </Header>
        <Section>
          <DivItem
            onClick={() => handleItemClick()}
          >
            <Item>TI123</Item>
            <Item>Toiec Basic</Item>
            <Item>27</Item>
          </DivItem>
          <DivItem>
            <Item>TI123</Item>
            <Item>Toiec Basic</Item>
            <Item>27</Item>
          </DivItem>
          <DivItem>
            <Item>TI123</Item>
            <Item>Toiec Basic</Item>
            <Item>27</Item>
          </DivItem>
          <DivItem>
            <Item>TI123</Item>
            <Item>Toiec Basic</Item>
            <Item>27</Item>
          </DivItem>
          <DivItem>
            <Item>TI123</Item>
            <Item>Toiec Basic</Item>
            <Item>27</Item>
          </DivItem>
        </Section>
      </ListClass>
    );
  };
  
  export default ListClassOfStudent;
  