import {CiSaveUp2} from 'react-icons/ci'
import {
    Div,
    Header,
    TitleList,
    Section,
    DivItem,
    Item,
    Span,
    Input,
    DivBtn,
    Btn
} from "./quizDetail.styles";

const QuizDetail = () => {

    return (
        <Div>
            <Span>Bai kiem tra so 1</Span>
            <Header>
                <TitleList style={{ flex: 0.5 }}>Index</TitleList>
                <TitleList>Student Code</TitleList>
                <TitleList>Student Name</TitleList>
                <TitleList style={{ flex: 0.5 }}>Score</TitleList>
            </Header>
            <Section>
                <DivItem>
                    <Item style={{ flex: 0.5 }}>1</Item>
                    <Item>HS123</Item>
                    <Item>Van Ba Linh</Item>
                    <Item style={{ flex: 0.5 }}>
                        <Input 
                            min={0}
                            type="number"
                        />
                    </Item>
                </DivItem>
                <DivItem>
                    <Item style={{ flex: 0.5 }}>2</Item>
                    <Item>HS123</Item>
                    <Item>Van Ba Linh</Item>
                    <Item style={{ flex: 0.5 }}>
                        <Input 
                            min={0}
                            type="number"
                        />
                    </Item>
                </DivItem>
                <DivItem>
                    <Item style={{ flex: 0.5 }}>3</Item>
                    <Item>HS123</Item>
                    <Item>Van Ba Linh</Item>
                    <Item style={{ flex: 0.5 }}>
                        <Input 
                            min={0}
                            type="number"
                        />
                    </Item>
                </DivItem>
                <DivItem>
                    <Item style={{ flex: 0.5 }}>3</Item>
                    <Item>HS123</Item>
                    <Item>Van Ba Linh</Item>
                    <Item style={{ flex: 0.5 }}>
                        <Input 
                            min={0}
                            type="number"
                        />
                    </Item>
                </DivItem>
                <DivItem>
                    <Item style={{ flex: 0.5 }}>3</Item>
                    <Item>HS123</Item>
                    <Item>Van Ba Linh</Item>
                    <Item style={{ flex: 0.5 }}>
                        <Input 
                            min={0}
                            type="number"
                        />
                    </Item>
                </DivItem>
                <DivItem>
                    <Item style={{ flex: 0.5 }}>3</Item>
                    <Item>HS123</Item>
                    <Item>Van Ba Linh</Item>
                    <Item style={{ flex: 0.5 }}>
                        <Input 
                            min={0}
                            type="number"
                        />
                    </Item>
                </DivItem>
                <DivItem>
                    <Item style={{ flex: 0.5 }}>3</Item>
                    <Item>HS123</Item>
                    <Item>Van Ba Linh</Item>
                    <Item style={{ flex: 0.5 }}>
                        <Input 
                            min={0}
                            type="number"
                        />
                    </Item>
                </DivItem>
                <DivItem>
                    <Item style={{ flex: 0.5 }}>3</Item>
                    <Item>HS123</Item>
                    <Item>Van Ba Linh</Item>
                    <Item style={{ flex: 0.5 }}>
                        <Input 
                            min={0}
                            type="number"
                        />
                    </Item>
                </DivItem>
                <DivItem>
                    <Item style={{ flex: 0.5 }}>3</Item>
                    <Item>HS123</Item>
                    <Item>Van Ba Linh</Item>
                    <Item style={{ flex: 0.5 }}>
                        <Input 
                            min={0}
                            type="number"
                        />
                    </Item>
                </DivItem>
            </Section>
            <DivBtn>
                <Btn>
                    <CiSaveUp2 size='15px' />
                    Save
                </Btn>
            </DivBtn>
        </Div>
    )
}

export default QuizDetail;