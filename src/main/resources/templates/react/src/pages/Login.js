import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./css/login.css";
import swal from "sweetalert";
import { useAppDispatch } from "../store";
import userSlice from "../slice/user";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 검증: 특수문자 포함 여부
      const specialCharRegex = /^[a-zA-Z0-9]+$/;
      if (!specialCharRegex.test(email) || !specialCharRegex.test(password)) {
        throw new Error("아이디와 비밀번호에는 특수문자를 사용할 수 없습니다.");
      }

      const response = await axios.post(
        `${"http://localhost:2005"}/admin/login`,
        {
          userid: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.result === 1) {
        const accessToken = response.data.data.accesstoken;
        console.log("accessToken", accessToken);
        const username = response.data.data.name;
        localStorage.setItem("accessToken", accessToken); // 토큰을 로컬 스토리지에 저장
        localStorage.setItem("username", username); // 토큰을 로컬 스토리지에 저장

        dispatch(
          userSlice.actions.setUser({
            name: response.data.data.name,
            accesstoken: accessToken,
          })
        );
        navigate("/home");
      } else {
        throw new Error("로그인에 실패했습니다.");
      }
    } catch (error) {
      swal("로그인 오류", error.message, "error");
    }
  };

  return (
    <div className="App" style={{ backgroundColor: "#F5F5F5" }}>
      <div className="login-container">
        <img
          src={process.env.PUBLIC_URL + "/dplanit_log.png"}
          alt="logo"
          className="logo"
        />
        <h2>로그인</h2>
        <div className="input-container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={email}
              onChange={handleEmailChange}
              className="input-field"
              placeholder="아이디"
            />
            <br />
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="input-field"
              placeholder="비밀번호"
            />
            <br />
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
