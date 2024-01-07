import React from 'react';
// import '../utils/css/sb-admin-2.css'

const sidebar = () => {
    return (
        <div>
        {/* <!-- Sidebar --> */}
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

       {/* <!-- Sidebar - Brand --> */}
       <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.jsp">
           <div class="sidebar-brand-icon rotate-n-15">
               <i class="fas fa-laptop"></i>
           </div>
           <div class="sidebar-brand-text mx-3"> HI-E </div>
       </a>

       {/* <!-- Divider --> */}
       <hr class="sidebar-divider my-0"/>

       {/* <!-- Nav Item - Dashboard --> */}
       <li class="nav-item active">
           <a class="nav-link" href="index.jsp">
               <i class="fas fa-fw fa-tachometer-alt"></i>
               <span>My Page</span></a>
       </li>

       {/* <!-- Divider --> */}
       <hr class="sidebar-divider"/>

       {/* <!-- Heading --> */}
       <div class="sidebar-heading">
           최고 관리자
       </div>

       {/* <!-- Nav Item - Pages Collapse Menu --> */}
       <li class="nav-item">
           <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
               aria-expanded="true" aria-controls="collapseTwo">
               <i class="fas fa-fw fa-cog"></i>
               <span>사용자 관리</span>
           </a>
           <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
               <div class="bg-white py-2 collapse-inner rounded">
                   <h6 class="collapse-header">사용자 관리:</h6>
                   <a class="collapse-item" href="">권한관리</a>
                   <a class="collapse-item" href="">그룹관리</a>
                   <a class="collapse-item" href="">사용자관리</a>
                   <a class="collapse-item" href="">인사카드</a>
               </div>
           </div>
       </li>
       <hr class="sidebar-divider"/>
       <div class="sidebar-heading">
           일정 관리
       </div>

       {/* <!-- Nav Item - Utilities Collapse Menu --> */}
       <li class="nav-item">
           <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
               aria-expanded="true" aria-controls="collapseUtilities">
               <i class="fas fa-fw fa-chart-area"></i>
               <span>일정</span>
           </a>
           <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities"
               data-parent="#accordionSidebar">
               <div class="bg-white py-2 collapse-inner rounded">
                   <h6 class="collapse-header">근무 일정:</h6>
                   <a class="collapse-item" href="">근무일정관리</a>
                   <a class="collapse-item" href="">출퇴근/근태현황</a>
                   <a class="collapse-item" href="">일정관리</a>
                   <div class="collapse-divider"></div>
                   <h6 class="collapse-header">휴가 :</h6>
                   <a class="collapse-item" href="">휴가사용실적현황</a>
                   <a class="collapse-item" href="">휴가신청</a>
               </div>
           </div>
       </li>

       {/* <!-- Divider --> */}
       <hr class="sidebar-divider"/>

       {/* <!-- Heading --> */}
       {/* <!-- 공지사항 --> */}
       <li class="nav-item">
           <a class="nav-link" href="">
               <i class="fas fa-fw fa-circle"></i>
               <span>공지사항</span></a>
       </li>
       
       {/* <!-- 교육일지 --> */}
       <li class="nav-item">
           <a class="nav-link" href="">
               <i class="fas fa-fw fa-table"></i>
               <span>교육일지</span></a>
       </li>

       {/* <!-- 설문조사 --> */}
       <li class="nav-item">
           <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseThree"
               aria-expanded="true" aria-controls="collapseThree">
               <i class="fas fa-fw fa-cog"></i>
               <span>설문조사 관리</span>
           </a>
           <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionSidebar">
               <div class="bg-white py-2 collapse-inner rounded">
                   <h6 class="collapse-header">설문조사 관리:</h6>
                   <a class="collapse-item" href="index.jsp?inc=/view/surveytable.jsp">진행중인 설문</a>
                   <a class="collapse-item" href="">설문조사 결과</a>
                   <a class="collapse-item" href="">설문조사 신청 내역</a>
                   <a class="collapse-item" href="">설문조사 작성</a>
               </div>
           </div>
       </li>


       {/* <!-- 경조사 --> */}
       <li class="nav-item">
           <a class="nav-link" href="">
               <i class="fas fa-fw fa-table"></i>
               <span>경조사</span></a>
       </li>

       {/* <!-- Divider --> */}
       <hr class="sidebar-divider d-none d-md-block"/>

       {/* <!-- Sidebar Toggler (Sidebar) --> */}
       <div class="text-center d-none d-md-inline">
           <button class="rounded-circle border-0" id="sidebarToggle"></button>
       </div>
       
       <br/><br/>
       <hr class="sidebar-divider"/>
       
       {/* <!-- 시스템 도움말 --> */}
        <li class="nav-item">
           <a class="nav-link" href="index.jsp?inc=/view/systemManual.jsp">
               <i class="fas fa-fw fa-wrench"></i>
               <span>시스템 도움말</span></a>
        </li>
        </ul>
        {/* <!-- End of Sidebar --> */}
    </div>
    )
}

export default sidebar;