import { Page, Title } from "../../../../generalCss/shared.styles";
import FilterClass from "./filterClass/filterClass.component";
import ListClassOfTeacher from "./listClass/listClass.component";

const ListClass = () => {

    return(
        <Page>
            <Title>List classes</Title>
            <FilterClass />
            <ListClassOfTeacher />
        </Page>
    )
}

export default ListClass