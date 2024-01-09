import React from 'react';
import 'styles/nav.css'
// import styled from 'styled-components'
import { Link } from 'react-router-dom';

const nav = () => {
	return (
		<nav className="Nav">
			<a href="/mypage">
		    	<img src="/img/Hi_E.png" alt="logo" className="Nav_logo"/>
		    </a>
	        <ul>
	            <li className="Nav-li">
	                <a href="#">사용자 관리</a>
	                <ul className="Nav-submenu">
	                    <li className='Nav-ul'><Link to="/admin/members">권한 관리</Link></li>
	                    <li className="Nav-ul"><a href="/admin/groups">그룹 관리</a></li>
	                    <li className="Nav-ul"><a href="#">사용자 관리</a></li>
	                    <li className="Nav-ul"><a href="#">인사관리</a></li>
	                </ul>
	            </li>
	            <li className="Nav-li">
	                <a href="#">공지사항</a>
	            </li>
	            <li className="Nav-li">
	                <a href="#">경조사</a>
	            </li>
	            <li className="Nav-li">
	                <a href="/freeboard">자유게시판</a>
	            </li>
	            <li className="Nav-li">
	                <a href="#">일정</a>
	                <ul className="Nav-submenu">
	                    <li className="Nav-ul"><Link to="/calendar">근무일정관리</Link></li>
	                    <li className="Nav-ul"><a href="#">출퇴근/근태현황</a></li>
	                    <a href="#">휴가</a>
	                    <li className="Nav-ul"><Link to="/vacation">휴가신청</Link></li>
	                </ul>
	            </li>
	            <li className="Nav-li">
	                <a href="#">시스템 관리</a>
	                <ul className="Nav-submenu">
	                    <li className="Nav-ul"><a href="#">관리자 관리</a></li>
	                    <li className="Nav-ul"><a href="#">버전 관리</a></li>
	                </ul>
	            </li>
	            <li className="Nav-li">
	                <a href="/mypage">마이페이지(헤더 만들고 버림)</a>
	            </li>
	        </ul>
	    </nav>
    )
}

export default nav;