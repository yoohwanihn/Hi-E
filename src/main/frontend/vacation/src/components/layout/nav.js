import React from 'react';
import { Link } from 'react-router-dom';

const nav = () => {
	return (
		<nav class="Nav">
			<a href="/mypage">
		    	<img src="/img/Hi_E.png" alt="logo" class="Nav_logo"/>
		    </a>
	        <ul>
	            <li class="Nav-li">
	                <a href="#">사용자 관리</a>
	                <ul class="Nav-submenu">
	                    <li className='Nav-ul'><Link to="/admin/members">권한 관리</Link></li>
	                    <li class="Nav-ul"><a href="/admin/groups">그룹 관리</a></li>
	                    <li class="Nav-ul"><a href="#">사용자 관리</a></li>
	                    <li class="Nav-ul"><a href="#">인사관리</a></li>
	                </ul>
	            </li>
	            <li class="Nav-li">
	                <a href="#">공지사항</a>
	            </li>
	            <li class="Nav-li">
	                <a href="#">경조사</a>
	            </li>
	            <li class="Nav-li">
	                <a href="/freeboard">자유게시판</a>
	            </li>
	            <li class="Nav-li">
	                <a href="#">일정</a>
	                <ul class="Nav-submenu">
	                    <li class="Nav-ul"><a href="#">근무일정관리</a></li>
	                    <li class="Nav-ul"><a href="#">출퇴근/근태현황</a></li>
	                    <li class="Nav-ul"><a href="@{/event}">일정관리</a></li>
	                    <a href="#">휴가</a>
	                    <li class="Nav-ul"><a href="@{/api/vac}">휴가신청</a></li>
	                </ul>
	            </li>
	            <li class="Nav-li">
	                <a href="#">시스템 관리</a>
	                <ul class="Nav-submenu">
	                    <li class="Nav-ul"><a href="#">관리자 관리</a></li>
	                    <li class="Nav-ul"><a href="#">버전 관리</a></li>
	                </ul>
	            </li>
	            <li class="Nav-li">
	                <a href="/mypage">마이페이지(헤더 만들고 버림)</a>
	            </li>
	        </ul>
	    </nav>
    )
}

export default nav;