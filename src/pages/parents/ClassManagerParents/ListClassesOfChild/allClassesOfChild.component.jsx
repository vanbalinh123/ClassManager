import { Title, Page } from "../../../../generalCss/shared.styles";
import FilterClassesOfChild from "./filterClass/filterClassOfChild.component";
import ListClassOfChild from "./listClasses/listClassesOfChild.component";

const ListClassesChild = () => {

    return(
        <Page>
            <Title>List classes</Title>
            <FilterClassesOfChild />
            <ListClassOfChild />
        </Page>
    )
}

export default ListClassesChild;