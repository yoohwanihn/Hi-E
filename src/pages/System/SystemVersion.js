import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import styled from "styled-components";
import CustomButton from "../../components/CustomButton";
import axios from "axios";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";
import userSlice from "../../slice/user";

export default function SystemVersion() {
  const [versionData, setVersionData] = useState(null);
  const [androidVersion, setAndroidVersion] = useState(null);
  const [iosVersion, setiosVersion] = useState(null);
  const [androidVersionCode, setAndroidVersionCode] = useState(null);
  const [iosVersionCode, setiosVersionCode] = useState(null);
  const [androidURL, setAndroidURL] = useState(null);
  const [iosURL, setiosURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const accesstoken = useSelector((state) => state.user.accesstoken);

  const handleAndroidVersion = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 20) {
      setAndroidVersion(inputValue);
    } else {
      setAndroidVersion(inputValue.slice(0, 20));
    }
  };
  const handleIosVersion = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 20) {
      setiosVersion(inputValue);
    } else {
      setiosVersion(inputValue.slice(0, 20));
    }
  };
  const handleAndroidVersionCode = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 20) {
      setAndroidVersionCode(inputValue);
    } else {
      setAndroidVersionCode(inputValue.slice(0, 20));
    }
  };
  const handleIosVersionCode = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 20) {
      setiosVersionCode(inputValue);
    } else {
      setiosVersionCode(inputValue.slice(0, 20));
    }
  };
  const handleAndroidURL = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 1000) {
      setAndroidURL(inputValue);
    } else {
      setAndroidURL(inputValue.slice(0, 1000));
    }
  };
  const handleIosURL = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 1000) {
      setiosURL(inputValue);
    } else {
      setiosURL(inputValue.slice(0, 1000));
    }
  };
  useEffect(() => {
    getAdminList();
  }, []);
  const getAdminList = async () => {
    try {
      await axios
        .get(`${"http://localhost:2500"}/admin/system/versionlist`, {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
          withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
        })
        .then((res) => {
          setVersionData(res.data.data);
        });
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
          Authorization: newAct,
        })
      );
      await axios
        .get(`${"http://localhost:2500"}/admin/system/versionlist`, {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
          withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
        })
        .then((res) => {
          setVersionData(res.data.data);
        });
    }
  };
  const InsertIOSVersion = async (version, verCode, url) => {
    try {
      await axios
        .post(
          `${"http://localhost:2500"}/admin/system/ios`,
          { version, verCode, url },
          {
            headers: {
              Authorization: localStorage.getItem("accessToken"),
            },
            withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
          }
        )
        .then(() => {
          swal("등록되었습니다!", {
            icon: "success",
          });
        });
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
        .post(
          `${"http://localhost:2500"}/admin/system/ios`,
          { version, verCode, url },
          {
            headers: {
              Authorization: localStorage.getItem("accessToken"),
            },
            withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
          }
        )
        .then(() => {
          swal("등록되었습니다!", {
            icon: "success",
          });
        })
        .catch(() => {
          swal("등록에 실패했습니다.", {
            icon: "error",
          });
        })
        .finally(() => {
          setLoading(!loading);
        });
    }
  };
  const InsertAOSVersion = async (version, verCode, url) => {
    try {
      await axios
        .post(
          `${"http://localhost:2500"}/admin/system/aos`,
          { version, verCode, url },
          {
            headers: {
              Authorization: localStorage.getItem("accessToken"),
            },
            withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
          }
        )
        .then(() => {
          swal("등록되었습니다!", {
            icon: "success",
          });
        })
        .catch(() => {
          throw new Error("등록에 실패했습니다.");
        })
        .finally(() => {
          setLoading(!loading);
        });
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
      const response_2 = await axios
        .post(
          `${"http://localhost:2500"}/admin/system/aos`,
          { version, verCode, url },
          {
            headers: {
              Authorization: localStorage.getItem("accessToken"),
            },
            withCredentials: true, // 브라우저가 세션 쿠키를 서버로 전송하도록 함
          }
        )
        .then(() => {
          swal("등록되었습니다!", {
            icon: "success",
          });
        })
        .catch(() => {
          swal("등록에 실패했습니다.", {
            icon: "error",
          });
        })
        .finally(() => {
          setLoading(!loading);
        });
    }
  };
  return (
    <Layout
      children={
        <Container>
          <ContainerSub>
            <ContainerItem>
              <HorizontalContainer>
                <text
                  style={{
                    fontSize: "30px",
                    fontFamily: "NanumBarunGothic",
                    fontWeight: 600,
                  }}
                >
                  버전 관리
                </text>
                <CurrentPlaceContainer>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <text
                      style={{
                        color: "#888",
                        fontSize: "14px",
                        fontWeight: 400,
                      }}
                    >
                      홈 &nbsp;&nbsp;
                    </text>
                    <img
                      src={process.env.PUBLIC_URL + "/ico_arrow_right_gray.png"}
                      style={{ width: "19px", height: "19px" }}
                    />
                    <text
                      style={{
                        color: "#888",
                        fontSize: "14px",
                        fontFamily: "NanumBarunGothic",
                        fontWeight: 400,
                      }}
                    >
                      &nbsp;&nbsp;시스템 관리&nbsp;&nbsp;
                    </text>
                    <img
                      src={process.env.PUBLIC_URL + "/ico_arrow_right_gray.png"}
                      style={{ Width: "19px", height: "19px" }}
                    />
                    <text
                      style={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: 400,
                      }}
                    >
                      &nbsp;&nbsp;버전 관리
                    </text>
                  </div>
                </CurrentPlaceContainer>
              </HorizontalContainer>
            </ContainerItem>
          </ContainerSub>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <ContainerSub>
              <ContainerItem
                style={{
                  paddingTop: "40px",
                  paddingLeft: "60px",
                  paddingRight: "60px",
                  paddingBottom: "60px",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>IOS</div>
                  <CustomButton
                    title={"저장하기"}
                    onVersion={() => {
                      InsertIOSVersion(iosVersion, iosVersionCode, iosURL);
                    }}
                  />
                </div>
                <div style={{ marginTop: "30px", marginBottom: "40px" }}>
                  <hr style={{ border: "1px solid #E9EAEE" }} />
                </div>
                <Table>
                  <thead>
                    <tr>
                      <th style={{ width: "18%" }}>버전</th>
                      <th style={{ width: "18%" }}>버전 코드</th>
                      <th style={{ width: "64%" }}>다운로드 URL</th>
                    </tr>
                  </thead>
                  <tr>
                    <td style={{ width: "18%" }}>
                      <TextInput
                        type="text"
                        placeholder={versionData && versionData.data[0].VERSION}
                        value={iosVersion}
                        onChange={handleIosVersion}
                      />
                    </td>
                    <td style={{ width: "18%" }}>
                      <TextInput
                        type="text"
                        placeholder={
                          versionData && versionData.data[0].VERSION_CODE
                        }
                        value={iosVersionCode}
                        onChange={handleIosVersionCode}
                      />
                    </td>
                    <td style={{ width: "64%" }}>
                      <TextInput
                        type="text"
                        placeholder={versionData && versionData.data[0].APPLINK}
                        value={iosURL}
                        onChange={handleIosURL}
                      />
                    </td>
                  </tr>
                  <tbody></tbody>
                </Table>
              </ContainerItem>
            </ContainerSub>

            <ContainerSub>
              <ContainerItem
                style={{
                  paddingTop: "40px",
                  paddingLeft: "60px",
                  paddingRight: "60px",
                  paddingBottom: "60px",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>Android</div>
                  <CustomButton
                    title={"저장하기"}
                    onVersion={() => {
                      InsertAOSVersion(
                        androidVersion,
                        androidVersionCode,
                        androidURL
                      );
                    }}
                  />
                </div>
                <div style={{ marginTop: "30px", marginBottom: "40px" }}>
                  <hr style={{ border: "1px solid #E9EAEE" }} />
                </div>
                <Table>
                  <thead>
                    <tr>
                      <th style={{ width: "18%" }}>버전</th>
                      <th style={{ width: "18%" }}>버전 코드</th>
                      <th style={{ width: "64%" }}>다운로드 URL</th>
                    </tr>
                  </thead>
                  <tr>
                    <td style={{ width: "18%" }}>
                      <TextInput
                        type="text"
                        placeholder={versionData && versionData.data[1].VERSION}
                        value={androidVersion}
                        onChange={handleAndroidVersion}
                      />
                    </td>
                    <td style={{ width: "18%" }}>
                      <TextInput
                        type="text"
                        placeholder={
                          versionData && versionData.data[1].VERSION_CODE
                        }
                        value={androidVersionCode}
                        onChange={handleAndroidVersionCode}
                      />
                    </td>
                    <td style={{ width: "64%" }}>
                      <TextInput
                        type="text"
                        placeholder={versionData && versionData.data[1].APPLINK}
                        value={androidURL}
                        onChange={handleAndroidURL}
                      />
                    </td>
                  </tr>
                  <tbody></tbody>
                </Table>
              </ContainerItem>
            </ContainerSub>
          </div>
        </Container>
      }
    />
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
`;

const ContainerSub = styled.div`
  display: flex;
  margin-bottom: 10px;
  flex: 1;
`;

const ContainerItem = styled.div`
  display: flex;
  flex: 1;
  //padding: 10px;
  background-color: #fff;
  flex-direction: column;
`;

const HorizontalContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding: 30px 60px 30px 60px;
`;

const CurrentPlaceContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Table = styled.table`
  border-collapse: collapse;
  width: 100%;

  th,
  td {
    border: 1px solid #e9eaee;
    padding: 8px;
    text-align: center;
    height: 28px;
  }

  th {
    background-color: #f2f2f2;
    height: 28px;
    font-weight: 400;
  }
  grid-column: 1 / span 6;
`;
const TextInput = styled.input`
  background: #ffffff;
  border: 1px solid #e9eaee;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  &::placeholder {
    text-align: center;
  }
`;
