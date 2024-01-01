import { useState } from "react";

import DetailLessonContent from "./detailLessonContent/detailLessonContent.component";

import {
  Div,
  Title,
  List,
  Item,
  Date,
  Notificate,
} from "./listLessonCotent.styles";

const ListLessonContent = ({ thisLessonContent }) => {
  const [check, setCheck] = useState(false);
  const [detail, setDetail] = useState(null);
  const handleItemClick = (item) => {
    setDetail(item)
    setCheck(true);
  };

  const thisLessonContentReverse = thisLessonContent?.reverse();


  return (
    <Div>
      {check === true && <DetailLessonContent 
        setCheck={setCheck} 
        detail={detail}
    />}

      <Title>Danh sách nội dung các buổi học</Title>
      <List>
        {(thisLessonContent?.length > 0 &&
          thisLessonContentReverse?.reverse().map((item, index) => {
            return (
              <Item key={index} onClick={() => handleItemClick(item)}>
                <Date>{item.session_day}</Date>
                <Notificate>{item.content}</Notificate>
              </Item>
            );
          })) || (
          <Item>
            {/* <Date></Date> */}
            <Notificate>Chưa có buổi học nào diễn ra!!!</Notificate>
          </Item>
        )}
      </List>
    </Div>
  );
};

export default ListLessonContent;
