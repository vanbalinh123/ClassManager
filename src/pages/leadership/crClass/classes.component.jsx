import { Page, Title } from "../../../generalCss/shared.styles";
import FilterClasses from "./filterClass/filterClasses.component";
import ListClasses from "./listClasses/listClasses.component";
import AddNewClass from "./addNewClass/addNewClass.component";

import { Content } from "./classes.styles";

const CreateClasses = () => {

    return (
        <Page>
            <Title>Class Manager</Title>
            <FilterClasses />
            <Content>
                <ListClasses>List Class</ListClasses>
                <AddNewClass>Add Class</AddNewClass>
            </Content>
        </Page>
    )
}

export default CreateClasses;