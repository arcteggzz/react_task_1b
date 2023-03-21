import React from "react";
import person_icon from "../../assets/person_icon.png";
import { AuthContext } from "../../authContext";

const AdminNavbar = () => {
  const { dispatch } = React.useContext(AuthContext);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <>
      <div className="w-full flex justify-between items-center  py-[25px]">
        <h1 className="text-[48px] text-white font-extrabold">APP</h1>
        <button
          className="bg-[#9BFF00] flex gap-[10px] px-[24px] py-[14px] rounded-[40px]"
          onClick={handleLogout}
        >
          <img src={person_icon} alt="" />
          <p className="text-[16px] font-thin">Logout</p>
        </button>
      </div>
    </>
  );
};

export default AdminNavbar;
