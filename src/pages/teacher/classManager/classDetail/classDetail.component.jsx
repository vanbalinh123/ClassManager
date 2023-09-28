import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { Page, Title } from "../../../../generalCss/shared.styles";
import { Choose, Select, Option, Content } from "./classDetail.styles";

const ClassDetail = () => {
    const [choose, setChoose] = useState('class')
    const navigate = useNavigate();

    useEffect(() => {
        if (choose === 'class') {
          navigate('listLesson')
        } else if (choose === 'students'){
            navigate('listStudents')
        }
      }, [choose]);

    return(
        <Page>
            <Title>Class Detail TI123 Toeic Basic</Title>
            <Choose>
                <Select 
                    value={choose} 
                    onChange={(e) => setChoose(e.target.value)}
                >
                    <Option value='class'>Class</Option>
                    <Option value='students'>Student</Option>
                </Select>
            </Choose>
            <Content>
                <Outlet />
            </Content>
        </Page>
    )
}

export default ClassDetail;