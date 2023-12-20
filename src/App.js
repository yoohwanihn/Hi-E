import {
  BrowserRouter,
  Routes,
  Route,
  redirect,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
// import Coaching from "./pages/Coaching";
import Home from "./pages/Home";
import Member from "./pages/Member";
import MemberAccess from "./pages/MemberAccess";
import MemberGroup from "./pages/MemberGroup";
import MemberInfo from "./pages/MemberInfo";
import Notice from "./pages/Notice";
import Post from "./pages/Event";
import Post_Write from "./pages/EventWrite";
//import CoachingChat from "./pages/Coaching/CoachingChat";
//import CoachingManagement from "./pages/Coaching/CoachingManagement";
//import GroupManagement from "./pages/Coaching/GroupManagement";
//import QuestionManagement from "./pages/Coaching/QuestionManagement";
import NoticeWrite from "./pages/NoticeWrite";
import SystemRole from "./pages/System/SystemRole";
import SystemVersion from "./pages/System/SystemVersion";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import userSlice from "./slice/user";
import { useAppDispatch } from "./store";
import axios from "axios";

function App() {
  const dispatch = useAppDispatch();
  const username = localStorage.getItem("username"); // 로컬 스토리지에서 토큰 가져오기
  const accessToken = localStorage.getItem("accessToken"); // 로컬 스토리지에서 토큰 가져오기
  dispatch(
    userSlice.actions.setUser({
      name: username,
      accesstoken: accessToken,
    })
  );
  const isLoggedIn = useSelector((state) => state.user.accesstoken);

  const checkAccessToken = async () => {
    try {
      const res = await axios.post(
        `${"http://localhost:2500"}/api`,

        {
          headers: {
            Authorization: isLoggedIn,
          },
          withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    //checkAccessToken();
  }, [isLoggedIn]);
  return (
    <BrowserRouter>
      <Routes>
        <>
          {/* <Route path="coaching" element={<QuestionManagement />} /> */}
          <Route path="home" element={<Home />} />
          <Route path="member/user" element={<Member />} />
          <Route path="member/access" element={<MemberAccess />} />
          <Route path="member/group" element={<MemberGroup />} />
          <Route path="member/info" element={<MemberInfo />} /> {/*인사관리*/}
          <Route path="notice" element={<Notice />} />
          <Route path="notice/write" element={<NoticeWrite />} />
          <Route path="post" element={<Post />} />
          <Route path="post/write" element={<Post_Write />} />
          <Route path="system" element={<SystemRole />} />
          <Route path="system/role" element={<SystemRole />} />
          <Route path="system/version" element={<SystemVersion />} />
          <Route path="*" element={<Home />} />
          {/* <Route path="coaching/management" element={<CoachingManagement />} /> */}
          {/* <Route path="coaching/chat/management" element={<CoachingChat />} /> */}
          {/* <Route
            path="coaching/group/management"
            element={<GroupManagement />}
          /> */}
          {/* <Route
            path="coaching/question/management"
            element={<QuestionManagement />}
          /> */}
        </>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
