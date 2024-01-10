import React from "react";
import "../Semantic/Header.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import userSlice from "../../slice/user";
import { useAppDispatch } from "../../store";
import swal from "sweetalert";
export default function Header() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector((state) => state.user.name);
  const accesstoken = useSelector((state) => state.user.accesstoken);
  const navigation = useNavigate();
  const handleLogOut = async () => {
    dispatch(
      userSlice.actions.setUser({
        name: "",
        accesstoken: "",
      })
    );
    localStorage.clear();
    navigation("/login");
    const response = await axios.get(
      `${"http://localhost:2005"}/admin/logout`,
      {
        headers: {
          accesstoken: accesstoken,
        },
        withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
      }
    );
    if (response.data.popdata.poptext) {
      swal(response.data.popdata.poptext, { icon: "error" });
    }
  };
  return (
    <header className="Header">
      <div className="Header-contatier">
        <div className="Header-item">
          <div>{isLoggedIn}</div>
        </div>

        <div className="Header-item">
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleLogOut();
            }}
          >
            로그아웃
          </div>
        </div>
      </div>
    </header>
  );
}
