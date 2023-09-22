import Infomations from "./Infomations/infomations.component"

import { Page, Title } from "../../../generalCss/shared.styles"
import { 
    TypeUser,
    Select,
    Option
} from "./createAccount.styles"

const CreateAccount = () => {
    return(
        <Page>
            <Title>Create Account</Title>
            <TypeUser>
                User Type:
                <Select>
                    <Option></Option>
                    <Option>Leadership</Option>
                    <Option>Teacher</Option>
                    <Option>Student</Option>
                </Select>
            </TypeUser>
            <Infomations />
        </Page>
    )
}

export default CreateAccount