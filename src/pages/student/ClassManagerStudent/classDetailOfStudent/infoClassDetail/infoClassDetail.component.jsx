import {BiUserX} from 'react-icons/bi'

import { 
    Div,
    Title,
    Content,
    Info,
    Span,
    Data,
    TotalAbsent,
    DetailAbsent,
    DateAbsent
} from "./infoClassDetail.styles"

const InforClassDetail = () => {

    return(
        <Div>
            <Title>Learning outcomes</Title>
            <Content>
                <Info>
                    <Span>Student Name:</Span>
                    <Data>Van Ba Linh</Data>
                </Info>
                <Info>
                    <Span>Class Name:</Span>
                    <Data>Toiec basic for yu</Data>
                </Info>
                <Info>
                    <Span>Class Code:</Span>
                    <Data>TI123</Data>
                </Info>
                <Info>
                    <Span>Total Absent:</Span>
                    <Data>
                        <TotalAbsent>2</TotalAbsent>
                        <DetailAbsent>
                            <DateAbsent>
                                <BiUserX color='red'/>
                                08/01/2023
                            </DateAbsent>
                            <DateAbsent>
                                <BiUserX color='red'/>
                                20/01/2023
                            </DateAbsent>
                        </DetailAbsent>
                    </Data>
                </Info>
                <Info>
                    <Span>First Test:</Span>
                    <Data>8</Data>
                </Info>
                <Info>
                    <Span>Second Test:</Span>
                    <Data>9</Data>
                </Info>
            </Content>
        </Div>
    )
}

export default InforClassDetail;