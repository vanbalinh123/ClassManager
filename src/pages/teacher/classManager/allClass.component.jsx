import { Page, Title } from "../../../generalCss/shared.styles";
import FilterClass from "./componentAllClass/filterClass/filterClass.component";
import ListClassOfTeacher from "./componentAllClass/listClass/listClass.component";
import { Outlet } from "react-router-dom";


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