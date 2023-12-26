import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";

import { Page, Title } from "../../../../generalCss/shared.styles";
import { Choose, Select, Option, Content } from "./classDetail.styles";

const ClassDetail = () => {
    const [choose, setChoose] = useState('class');
    const {classCode} = useParams();

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
            <Title>Chi tiết lớp học {classCode}</Title>
            <Choose>
                <Select 
                    value={choose} 
                    onChange={(e) => setChoose(e.target.value)}
                >
                    <Option value='class'>Lớp học</Option>
                    <Option value='students'>Học sinh</Option>
                </Select>
            </Choose>
            <Content>
                <Outlet />
            </Content>
        </Page>
    )
}

export default ClassDetail;