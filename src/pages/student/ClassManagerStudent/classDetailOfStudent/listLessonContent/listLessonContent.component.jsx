import { useState } from "react";

import DetailLessonContent from "./detailLessonContent/detailLessonContent.component";

import { 
    Div,
    Title,
    List,
    Item,
    Date,
    Notificate,
} from "./listLessonCotent.styles"

const ListLessonContent = () => {
    const [check, setCheck] = useState(false)

    const handleItemClick = () => {
        setCheck(true)
    }

    return (
        <Div>
            {check === true && 
                <DetailLessonContent 
                    setCheck = {setCheck}
                />
            }
            
            <Title>List of lesson content</Title>
            <List>
                <Item
                    onClick={() => handleItemClick()}
                >
                    <Date>26/10/2023</Date>
                    <Notificate>
                        Hom nay chung ta hoc ve su hinh thanh cua abcxyzHom nay chung ta hoc ve su hinh thanh cua abcxyzHom nay chung ta hoc ve su hinh thanh cua abcxyzHom nay chung ta hoc ve su hinh thanh cua abcxyzHom nay chung ta hoc ve su hinh thanh cua abcxyzHom nay chung ta hoc ve su hinh thanh cua abcxyz
                    </Notificate>
                </Item>
                <Item>
                    <Date>26/10/2023</Date>
                    <Notificate>
                        Hom nay chung ta hoc ve su hinh thanh cua abcxyzHom nay chung ta hoc ve su hinh thanh cua abcxyzHom nay chung ta hoc ve su hinh thanh cua abcxyzHom nay chung ta hoc ve su hinh thanh cua abcxyzHom nay chung ta hoc ve su hinh thanh cua abcxyzHom nay chung ta hoc ve su hinh thanh cua abcxyz
                    </Notificate>
                </Item>
                <Item>
                    <Date>26/10/2023</Date>
                    <Notificate>
                        Hom nay chung ta hoc ve su hinh thanh cua abcxyzHom nay chung ta hoc ve su hinh thanh cua abcxyzHom nay chung ta hoc ve su hinh thanh cua abcxyzHom nay chung ta hoc ve su hinh thanh cua abcxyzHom nay chung ta hoc ve su hinh thanh cua abcxyzHom nay chung ta hoc ve su hinh thanh cua abcxyz
                    </Notificate>
                </Item>
                <Item>
                    <Date>26/10/2023</Date>
                    <Notificate>
                        Hom nay chung ta hoc ve su hinh thanh cua abcxyzHom nay chung ta hoc ve su hinh thanh cua abcxyzHom nay chung ta hoc ve su hinh thanh cua abcxyzHom nay chung ta hoc ve su hinh thanh cua abcxyzHom nay chung ta hoc ve su hinh thanh cua abcxyzHom nay chung ta hoc ve su hinh thanh cua abcxyz
                    </Notificate>
                </Item>
                <Item>
                    <Date>26/10/2023</Date>
                    <Notificate>
                        Hom nay chung ta hoc ve su hinh thanh cua abcxyzHom nay chung ta hoc ve su hinh thanh cua abcxyzHom nay chung ta hoc ve su hinh thanh cua abcxyzHom nay chung ta hoc ve su hinh thanh cua abcxyzHom nay chung ta hoc ve su hinh thanh cua abcxyzHom nay chung ta hoc ve su hinh thanh cua abcxyz
                    </Notificate>
                </Item>
                <Item>
                    <Date>26/10/2023</Date>
                    <Notificate>
                        Hom nay chung ta hoc ve su hinh thanh cua abcxyzHom nay chung ta hoc ve su hinh thanh cua abcxyzHom nay chung ta hoc ve su hinh thanh cua abcxyzHom nay chung ta hoc ve su hinh thanh cua abcxyzHom nay chung ta hoc ve su hinh thanh cua abcxyzHom nay chung ta hoc ve su hinh thanh cua abcxyz
                    </Notificate>
                </Item>
            </List>
        </Div>
    )
}

export default ListLessonContent