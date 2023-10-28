import { useListClassQuery } from "../../../redux/api/leader/class-api.slice";

import { Page, Title } from "../../../generalCss/shared.styles";
import FilterClasses from "./filterClass/filterClasses.component";
import ListClasses from "./listClasses/listClasses.component";
import AddNewClass from "./addNewClass/addNewClass.component";

import { Content } from "./classes.styles";

const CreateClasses = () => {
    const {data: listClasses} = useListClassQuery()

    return (
        <Page>
            <Title>Class Manager</Title>
            <FilterClasses />
            <Content>
                <ListClasses
                    listClasses={listClasses}
                >
                    List Class
                </ListClasses>
                <AddNewClass>Add Class</AddNewClass>
            </Content>
        </Page>
    )
}

export default CreateClasses;