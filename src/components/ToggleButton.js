import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { useAppDispatch } from "../store";
import userSlice from "../slice/user";
import swal from "sweetalert";
export default function ToggleButton(props) {
  const [isActive, setIsActive] = useState(props.isActive);
  const dispatch = useAppDispatch();
  const accesstoken = useSelector((state) => state.user.accesstoken);
  const onClick = props.onClick;
  const storyno = props.storyNo;
  useEffect(() => {});
  const getModalInfo = async (storyno, show) => {
    try {
      await axios.post(
        `${"http://localhost:2500"}/admin/story/show`,
        { storyno, show },
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
          withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
        }
      );
    } catch (error) {
      const response = await axios.get(
        `${"http://localhost:2500"}/admin/refresh`,
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
          withCredentials: true,
        }
      );
      if (response.data.popdata.poptext) {
        swal(response.data.popdata.poptext, { icon: "error" });
        return;
      }
      const newAct = response.data.data.Authorization;
      localStorage.setItem("accessToken", newAct);
      dispatch(
        userSlice.actions.updateAccessToken({
          Authorization: localStorage.getItem("accessToken"),
        })
      );
      await axios.post(
        `${"http://localhost:2500"}/admin/story/show`,
        { storyno, show },
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
          withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
        }
      );
    }
  };
  const handleToggle = () => {
    setIsActive(!isActive);
    getModalInfo(+storyno, Number(!isActive));
    onClick();
  };
  return (
    <Toggle
      onClick={handleToggle} // 전달받은 onClick 핸들러 함수 실행
      isActive={isActive}
    ></Toggle>
  );
}

const Toggle = styled.button`
  width: 50px;
  height: 30px;
  border-radius: 15px;
  border: none;
  background-color: #4674fe;
  position: relative;
  cursor: pointer;

  &:before {
    content: "";
    display: block;
    position: absolute;
    top: 2px;
    left: 2px;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background-color: #fff;
    transition: transform 0.3s ease-in-out;
  }

  &:active:before {
    transform: scale(0.3);
  }

  ${({ isActive }) =>
    !isActive &&
    css`
      &:before {
        transform: translateX(20px);
      }
      background-color: #888;
    `}
`;
