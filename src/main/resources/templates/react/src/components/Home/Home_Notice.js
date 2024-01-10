import React, { useEffect, useState } from "react";
import styles from "./Home_Post.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";
import swal from "sweetalert";
import userSlice from "../../slice/user";

export default function Home_Notice() {
  const [count, setCount] = useState(0);
  const dispatch = useAppDispatch();
  const accesstoken = useSelector((state) => state.user.accesstoken);
  const navigate = useNavigate();
  useEffect(() => {
    getPostList();
  }, []);
  const getPostList = async () => {
    try {
      await axios
        .get(`${"http://localhost:2500"}/admin/story/cnt`, {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
          withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
        })
        .then((res) => {
          console.log(res.data.data[0].cnt);
          setCount(res.data.data[0].cnt);
        });
      console.log("count2", count);
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
      const newAct = response.data.data.Authorization;
      localStorage.setItem("accessToken", newAct);
      dispatch(
        userSlice.actions.updateAccessToken({
          Authorization: localStorage.getItem("accessToken"),
        })
      );
      await axios
        .get(`${"http://localhost:2500"}/admin/story/cnt`, {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
          withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
        })
        .then((res) => {
          setCount(res.data.data[0].cnt);
        });
    }
    console.log("count", count);
  };
  return (
    <div className={`${styles.Home_container} Home_container`}>
      <div>
        <div className={`Home_title`}>공지사항</div>
        <img
          src={process.env.PUBLIC_URL + "/ico_reset.png"}
          className={`refresh_button`}
          style={{ cursor: "pointer" }}
          onClick={() => {
            getPostList();
          }}
        />
        <div className={`Home_line`} />
        <div className={`Home_box`}>
          <div
            className={`${styles.Home_container_horizontal} Home_container_horizontal`}
          >
            <div>공지사항 목록</div>
            <div className={`${styles.item_container} item_container`}>
              {/* <span className={`${styles.item_text} item_text`}>{count}</span>
              <span>&nbsp;건</span> */}
              <b style={{ color: "#4674FE" }}>{count}</b>건
            </div>
          </div>
        </div>
        <button
          style={{
            backgroundColor: "#fff",
            border: "1px solid #F2F2F4",
            height: "40px",
            width: "100%",
            bottom: 0,
            cursor: "pointer",
            fontSize: 14,
            textIndent: 0.5,
          }}
          onClick={() => {
            navigate("/notice/write");
          }}
        >
          공지사항 작성
        </button>
      </div>
    </div>
  );
}
