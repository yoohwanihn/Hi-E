import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import NavLi from "./NavLi";
import swal from "sweetalert";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import navSlice from "../../slice/nav";
export default function Nav() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [coachingLiList, setCoachingLiList] = useState(false);
  const [systyemLiList, setSystemLiList] = useState(false);
  const [mamberLiList, setMemberLiList] = useState(false);
  const systemcategoryIndex = useSelector(
    (state) => state.nav.systemcategoryIndex
  );
  const coachingcategoryIndex = useSelector(
    (state) => state.nav.coachingcategoryIndex
  );
  const membercategoryIndex = useSelector(
    (state) => state.nav.membercategoryIndex
  );
  const showmemberli = useSelector((state) => state.nav.showmemberli);
  const showcoachingli = useSelector((state) => state.nav.showcoachingli);
  const showserviceli = useSelector((state) => state.nav.showserviceli);
  const showpayli = useSelector((state) => state.nav.showpayli);
  const showpostli = useSelector((state) => state.nav.showpostli);
  const showsystemli = useSelector((state) => state.nav.showsystemli);
  const [memberhovered, setmemberHovered] = useState(-1);
  const [systemhovered, setsystemHovered] = useState(-1);
  const [coachinghovered, setcoachingHovered] = useState(-1);

  const [memberLihovered, setmemberLiHovered] = useState(false);
  const memberLiborderLeft = memberLihovered
    ? "6px solid #4674FE"
    : "6px solid white";
  const memberLifontWeight = memberLihovered ? "600" : "400";

  const [coachingLihovered, setcoachingLiHovered] = useState(false);
  const coachingLiborderLeft = coachingLihovered
    ? "6px solid #4674FE"
    : "6px solid white";
  const coachingLifontWeight = coachingLihovered ? "600" : "400";

  const [serviceLihovered, setserviceLiHovered] = useState(false);
  const serviceLiborderLeft = serviceLihovered
    ? "6px solid #4674FE"
    : "6px solid white";
  const serviceLifontWeight = serviceLihovered ? "600" : "400";

  const [payLihovered, setpayLiHovered] = useState(false);
  const payLiborderLeft = payLihovered
    ? "6px solid #4674FE"
    : "6px solid white";
  const payLifontWeight = payLihovered ? "600" : "400";

  const [postLihovered, setpostLiHovered] = useState(false);
  const postLiborderLeft = postLihovered
    ? "6px solid #4674FE"
    : "6px solid white";
  const postLifontWeight = postLihovered ? "600" : "400";

  const [hovered, setHovered] = useState(false);
  const borderLeft = hovered ? "6px solid #4674FE" : "6px solid white";
  const fontWeight = hovered ? "600" : "400";

  const handleNavigate_member_access = () => {
    dispatch(navSlice.actions.setCoachingCategoryIndex(-1));
    dispatch(navSlice.actions.setSystemCategoryIndex(-1));
    dispatch(navSlice.actions.setMemberCategoryIndex(-1));
    dispatch(navSlice.actions.updatememberli(true));
    setMemberLiList(true);
    navigation("/member/access");
  };
  const handleNavigate_member_group = () => {
    dispatch(navSlice.actions.setCoachingCategoryIndex(-1));
    dispatch(navSlice.actions.setSystemCategoryIndex(-1));
    dispatch(navSlice.actions.updatememberli(true));
    setMemberLiList(true);
    navigation("/member/group");
  };
  const handleNavigate_member_user = () => {
    dispatch(navSlice.actions.setCoachingCategoryIndex(-1));
    dispatch(navSlice.actions.setSystemCategoryIndex(-1));
    dispatch(navSlice.actions.updatememberli(true));
    setMemberLiList(true);
    navigation("/member/user");
  };
  const handleNavigate_member_info = () => {
    dispatch(navSlice.actions.setCoachingCategoryIndex(-1));
    dispatch(navSlice.actions.setSystemCategoryIndex(-1));
    dispatch(navSlice.actions.updatememberli(true));
    setMemberLiList(true);
    navigation("/member/info");
  };
  const handleNavigate_coaching = () => {
    dispatch(navSlice.actions.setCoachingCategoryIndex(-1));
    dispatch(navSlice.actions.setSystemCategoryIndex(-1));
    navigation("/coaching");
  };
  const handleNavigate_notice = () => {
    dispatch(navSlice.actions.setCoachingCategoryIndex(-1));
    dispatch(navSlice.actions.setSystemCategoryIndex(-1));
    navigation("/notice");
  };
  const handleNavigate_pay = () => {
    dispatch(navSlice.actions.setCoachingCategoryIndex(-1));
    dispatch(navSlice.actions.setSystemCategoryIndex(-1));
    navigation("/pay");
  };
  const handleNavigate_system = () => {
    // dispatch(navSlice.actions.setCoachingCategoryIndex(-1))
    // dispatch(navSlice.actions.setSystemCategoryIndex(-1))
    //navigation("/system");
  };
  const handleNavigate_post = () => {
    dispatch(navSlice.actions.setCoachingCategoryIndex(-1));
    dispatch(navSlice.actions.setSystemCategoryIndex(-1));
    navigation("/post");
  };
  const handleNavigate_home = () => {
    dispatch(navSlice.actions.setCoachingCategoryIndex(-1));
    dispatch(navSlice.actions.setSystemCategoryIndex(-1));
    dispatch(navSlice.actions.closeli());
    navigation("/home");
  };
  const handleNavigate_coaching_management = () => {
    dispatch(navSlice.actions.setCoachingCategoryIndex(-1));
    dispatch(navSlice.actions.setSystemCategoryIndex(-1));
    navigation("/coaching/management");
  };
  const handleNavigate_coaching_chat = () => {
    dispatch(navSlice.actions.setCoachingCategoryIndex(-1));
    dispatch(navSlice.actions.setSystemCategoryIndex(-1));
    navigation("/coaching/chat/management");
  };
  const handleNavigate_coaching_group = () => {
    dispatch(navSlice.actions.setCoachingCategoryIndex(-1));
    dispatch(navSlice.actions.setSystemCategoryIndex(-1));
    navigation("/coaching/group/management");
  };
  const handleNavigate_coaching_question = () => {
    dispatch(navSlice.actions.closeli());
    dispatch(navSlice.actions.setSystemCategoryIndex(-1));
    dispatch(navSlice.actions.updatecoachingli(true));
    navigation("/coaching/question/management");
  };
  const handleNavigate_system_role = () => {
    dispatch(navSlice.actions.closeli());
    dispatch(navSlice.actions.setCoachingCategoryIndex(-1));
    dispatch(navSlice.actions.updatesystemli(true));
    setSystemLiList(true);

    navigation("/system/role");
  };
  const handleNavigate_system_version = () => {
    dispatch(navSlice.actions.closeli());
    dispatch(navSlice.actions.setCoachingCategoryIndex(-1));
    dispatch(navSlice.actions.updatesystemli(true));
    setSystemLiList(true);
    navigation("/system/version");
  };
  const handlewaiting = () => {
    swal("준비중입니다", "", "warning");
  };
  const coachingitem = [
    { title: "근무일정관리", navigation: handlewaiting },
    { title: "출퇴근/근태현황", navigation: handlewaiting },
    { title: "일정관리", navigation: handlewaiting },
    { title: "휴가", navigation: handlewaiting },
    { title: "휴가사용실적현황", navigation: handlewaiting },
    { title: "휴가신청", navigation: handlewaiting },
  ];
  const systemitem = [
    { title: "관리자 관리", navigation: handlewaiting }, //navigation: handleNavigate_system_role },
    { title: "버전 관리", navigation: handlewaiting }, //navigation: handleNavigate_system_version },
  ];
  const memberitem = [
    { title: "권한 관리", navigation: handlewaiting }, //navigation: handleNavigate_member_access },
    { title: "그룹 관리", navigation: handlewaiting }, //navigation: handleNavigate_member_group },
    { title: "사용자관리", navigation: handlewaiting }, //navigation: handleNavigate_member_user },
    { title: "인사관리", navigation: handlewaiting }, //navigation: handleNavigate_member_info },
  ];

  return (
    <Container>
      <div style={{ margin: 40, marginBottom: 20 }}>
        <img
          style={{ width: 190, height: 75, cursor: "pointer" }}
          src={process.env.PUBLIC_URL + "/Hi_E.png"}
          alt="logo"
          className="Nav_logo"
          onClick={handleNavigate_home}
        />
      </div>
      <div>
        <ul>
          <Navli
            onMouseOver={() => setmemberLiHovered(true)}
            onMouseLeave={() => setmemberLiHovered(false)}
            onClick={() => {
              dispatch(navSlice.actions.closeli());
              dispatch(navSlice.actions.updatememberli(true));
              setMemberLiList(!mamberLiList);
              //navigation("/system");
            }}
            style={{
              borderLeft: memberLiborderLeft,
              fontWeight: memberLifontWeight,
              ...(showmemberli && {
                borderLeft: "6px solid #4674FE",
                fontWeight: 600,
              }),
            }}
          >
            <a>사용자 관리</a>
            {mamberLiList == true ? (
              <img
                src={`${process.env.PUBLIC_URL}/ico_arrow_bottom_black.png`}
                style={{
                  width: 16,
                  height: 16,
                  float: "right",
                  marginTop: 16,
                  marginRight: 28,
                }}
              />
            ) : (
              <img
                src={`${process.env.PUBLIC_URL}/ico_arrow_right_black.png`}
                style={{
                  width: 16,
                  height: 16,
                  float: "right",
                  marginTop: 16,
                  marginRight: 28,
                }}
              />
            )}
          </Navli>
          {mamberLiList &&
            memberitem.map((item, index) => (
              <Navul
                key={index}
                onClick={() => {
                  dispatch(navSlice.actions.setMemberCategoryIndex(index));
                  item.navigation();
                  setMemberLiList(true);
                }}
                onMouseOver={() => setmemberHovered(index)}
                onMouseLeave={() => setmemberHovered(-1)}
                style={{
                  ...(index == memberhovered && {
                    fontWeight: 600,
                  }),
                  ...(index == membercategoryIndex && {
                    fontWeight: 600,
                  }),
                }}
              >
                <a>{item.title}</a>
              </Navul>
            ))}
          <Navli
            onMouseOver={() => setcoachingLiHovered(true)}
            onMouseLeave={() => setcoachingLiHovered(false)}
            onClick={() => {
              dispatch(navSlice.actions.closeli());
              dispatch(navSlice.actions.updatecoachingli(true));
              setCoachingLiList(!coachingLiList);
              //navigation("/system");
            }}
            style={{
              borderLeft: coachingLiborderLeft,
              fontWeight: coachingLifontWeight,
              ...(showcoachingli && {
                borderLeft: "6px solid #4674FE",
                fontWeight: 600,
              }),
            }}
          >
            <a>일정</a>
            {coachingLiList == true ? (
              <img
                src={`${process.env.PUBLIC_URL}/ico_arrow_bottom_black.png`}
                style={{
                  width: 16,
                  height: 16,
                  float: "right",
                  marginTop: 16,
                  marginRight: 28,
                }}
              />
            ) : (
              <img
                src={`${process.env.PUBLIC_URL}/ico_arrow_right_black.png`}
                style={{
                  width: 16,
                  height: 16,
                  float: "right",
                  marginTop: 16,
                  marginRight: 28,
                }}
              />
            )}
          </Navli>
          {coachingLiList &&
            coachingitem.map((item, index) => (
              <Navul
                key={index}
                onClick={() => {
                  dispatch(navSlice.actions.setCoachingCategoryIndex(index));
                  item.navigation();
                }}
                onMouseOver={() => setcoachingHovered(index)}
                onMouseLeave={() => setcoachingHovered(-1)}
                style={{
                  ...(index == coachinghovered && {
                    fontWeight: 600,
                  }),
                  ...(index == coachingcategoryIndex && {
                    fontWeight: 600,
                  }),
                }}
              >
                <a>{item.title}</a>
              </Navul>
            ))}
          <Navli
            onMouseOver={() => setserviceLiHovered(true)}
            onMouseLeave={() => setserviceLiHovered(false)}
            onClick={() => {
              dispatch(navSlice.actions.closeli());
              handleNavigate_notice();
            }}
            style={{
              borderLeft: serviceLiborderLeft,
              fontWeight: serviceLifontWeight,
              ...(showserviceli && {
                borderLeft: "6px solid #4674FE",
                fontWeight: 600,
              }),
            }}
          >
            <a>공지사항</a>
          </Navli>

          <Navli
            onMouseOver={() => setpostLiHovered(true)}
            onMouseLeave={() => setpostLiHovered(false)}
            onClick={() => {
              dispatch(navSlice.actions.closeli());
              handleNavigate_post();
            }}
            style={{
              borderLeft: postLiborderLeft,
              fontWeight: postLifontWeight,
              ...(showpostli && {
                borderLeft: "6px solid #4674FE",
                fontWeight: 600,
              }),
            }}
          >
            <a>경조사</a>
          </Navli>

          <Navli
            onMouseOver={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => {
              dispatch(navSlice.actions.closeli());
              dispatch(navSlice.actions.updatesystemli(true));
              setSystemLiList(!systyemLiList);
              //navigation("/system");
            }}
            style={{
              borderLeft,
              fontWeight,
              ...(showsystemli && {
                borderLeft: "6px solid #4674FE",
                fontWeight: 600,
              }),
            }}
          >
            <a>시스템 관리</a>
            {systyemLiList == true ? (
              <img
                src={`${process.env.PUBLIC_URL}/ico_arrow_bottom_black.png`}
                style={{
                  width: 16,
                  height: 16,
                  float: "right",
                  marginTop: 16,
                  marginRight: 28,
                }}
              />
            ) : (
              <img
                src={`${process.env.PUBLIC_URL}/ico_arrow_right_black.png`}
                style={{
                  width: 16,
                  height: 16,
                  float: "right",
                  marginTop: 16,
                  marginRight: 28,
                }}
              />
            )}
          </Navli>
          {systyemLiList &&
            systemitem.map((item, index) => (
              <Navul
                key={index}
                onClick={() => {
                  dispatch(navSlice.actions.setSystemCategoryIndex(index));
                  item.navigation();
                  setSystemLiList(true);
                }}
                onMouseOver={() => setsystemHovered(index)}
                onMouseLeave={() => setsystemHovered(-1)}
                style={{
                  ...(index == systemhovered && {
                    fontWeight: 600,
                  }),
                  ...(index == systemcategoryIndex && {
                    fontWeight: 600,
                  }),
                }}
              >
                <a>{item.title}</a>
              </Navul>
            ))}
        </ul>
      </div>
    </Container>
  );
}
const Container = styled.nav`
  display: block;
  width: 256px;
  background-color: rgb(255, 255, 255);
  border-right: 1px solid #e9eaee;
  line-height: 48px;
  min-height: 100vh;
`;
const Navul = styled.li`
  cursor: pointer;
  padding-left: 40px;
  height: 34px;
  line-height: 34px;
  font-size: 14px;
`;
const Navli = styled.li`
  padding-left: 34px;
  height: 48px;
  line-heigth: 48px;
  display: block;
  justify-content: space-between;
  margin-bottom: 10px;
  width: calc(100% - 6px - 34px);
  border-left: 6px solid white;
  cursor: pointer;
`;
