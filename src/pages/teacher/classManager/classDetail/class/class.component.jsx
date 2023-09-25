import { Outlet } from "react-router-dom";
import { ListClass } from "./class.styles";

const Class = () => {
  return (
    <ListClass>
        <Outlet />
    </ListClass>
  );
};

export default Class;
