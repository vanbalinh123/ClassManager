import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { MdOutlineNavigateNext } from "react-icons/md";
import { BsSend } from "react-icons/bs";

import { Page, Title } from "../../../../generalCss/shared.styles";


import { 
    Form,
    TitleNoti,
    ContentNoti, 
    DivHis,
    BtnHis,
    DivRole,
    Select,
    Option,
    Span,
    DivInput,
    Input,
    Textarea,
    DivTextarea,
    DivSend,
    BtnSend
} from "./createNotification.styles";

const CreateNotification = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const onSubmit = async (data) => {
        console.log(data);
      };

    return(
        <Page>
            <Title>Create Notification</Title>
            <DivHis>
                <BtnHis
                    onClick={() => navigate('/leader/historyNotifications')}
                >
                    History
                    <MdOutlineNavigateNext size="15px"/>
                </BtnHis>
            </DivHis>
            <Form
                onSubmit={handleSubmit(onSubmit)}
            >
                <DivRole>
                    Send to:
                    <Select>
                        <Option>All</Option>
                        <Option>Teacher</Option>
                        <Option>Student</Option>
                    </Select>
                </DivRole>
                <TitleNoti>
                    <Span>Title</Span>
                    <DivInput>
                        <Input 
                        type="text"
                        placeholder="Title..."
                        hasError={!!errors.title}
                        {...register("title", {
                          required: "Title is required!",
                        })}
                        />
                    </DivInput>
                </TitleNoti>
                <ContentNoti>
                    <Span>Content</Span>
                    <DivTextarea>
                        <Textarea 
                            type="text"
                            placeholder="Content..."
                            hasError={!!errors.content}
                            {...register("content", {
                              required: "Content is required!",
                            })}
                        />
                    </DivTextarea>
                </ContentNoti>
                <DivSend>
                    <BtnSend>
                        <BsSend size='15px'/>
                        Send
                    </BtnSend>
                </DivSend>
            </Form>
        </Page>
    )
}

export default CreateNotification