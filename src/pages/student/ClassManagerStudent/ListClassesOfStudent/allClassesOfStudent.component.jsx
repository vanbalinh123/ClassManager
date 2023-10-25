import { Title, Page } from "../../../../generalCss/shared.styles";
import FilterClassesOfStudent from "./filterClass/filterClassesOfStudent.component";
import ListClassOfStudent from "./listClasses/listClassesOfStudent.component";

const ListClassesStudent = () => {

    return(
        <Page>
            <Title>List classes</Title>
            <FilterClassesOfStudent />
            <ListClassOfStudent />
        </Page>
    )
}

export default ListClassesStudent;