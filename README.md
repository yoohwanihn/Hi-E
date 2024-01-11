<img src="https://capsule-render.vercel.app/api?type=waving&color=BDBDC8&height=150&section=header" />

### 1. 프로젝트 개요
- 프로젝트 명칭: Hi-E
- 프로젝트 소개: 스프링부트를 활용한 ERP 인사시스템
- 기획 배경 : 중소기업에게 편리한 인사관리 시스템을 제공해 경제 발전에 기여
- 기대 효과 : 중소기업의 인사 관리 능력 향상, 필요정보의 공유화가 가능, 정보의 흐름의 일원화
- 개발 인원: 3명
- 주요 기능
	- 유환인 
		- 폼 로그인 및 OAuth 2.0 구글, 네이버, 카카오 로그인 기능	
		- 회원가입 시 유효성 검사	
		- 메인 페이지 다크모드 기능
		- 자유 게시판 
		- 마이 페이지
		- 사용자 권한 관리 
		- 사용자 그룹 관리
  	- 최민지	
	   	- FullCalendar API를 통한 근무 일정 등록,수정,삭제 관리
	   	- 휴가 등록 및 관리 기능
	   	- 출/퇴근 기록 기능
- 백엔드 개발 언어: Java
- 백엔드 개발 환경
	- Windows
	- STS4
	- SpringBoot 3.0.2
	- Spring Data JPA
	- Spring Security 6
	- OAuth 2.0
- 프론트 개발 언어 및 환경
	- HTML5
	- jQuery
	- JavaScript
	- Bootstrap
	- React
- DBMS: Mysql

<hr>

### 2. 프로젝트 요구사항
- 폼 로그인 및 OAuth 2.0 구글, 네이버, 카카오 로그인 기능
- 회원가입 시 유효성 검사
- 메인 페이지 다크모드 기능
- 자유 게시판 
- 마이 페이지
- 사용자 권한 관리 
- 사용자 그룹 관리 
- FullCalendar API를 통한 근무 일정 등록,수정,삭제 관리
- 휴가 등록 및 관리 기능
- 출/퇴근 기록 기능

#### 회원기능
> - 회원가입 시 유효성 검사를 통과해야 한다.
> - 폼 로그인 및 OAuth 2.0 페이스북 로그인 기능을 사용할 수 있어야 한다.
> - 프로필 사진, 닉네임, 비밀번호, 이메일 등의 정보를 수정할 수 있어야 한다.

#### 자유게시판 기능
> - 댓글이 등록 가능하여야 한다
> - 페이지네이션이 적용되어야 한다. (글 8개)
> - 제목으로 검색 기능이 있어야 한다.


#### 마이페이지 기능
> - 사용자 프로필, 닉네임, 비밀번호 등 회원정보 수정 기능
> - 로그아웃 기능
> - 회원탈퇴 기능

#### 권한관리 기능
> - 관리자만 접근 가능하여야 한다.
> - 사용자의 권한을 관리자로 올릴 수 있어야 한다.
> - 사용자의 권한을 BANNED로 금지할 수 있어야 한다.
> - 페이지네이션이 적용되어야 한다. (멤버 5명)
> - 이름이나 사번 혹은 권한으로 검색할 수 있도록 한다.

#### 그룹관리 기능
> - 관리자만 접근 가능하여야 한다.
> - 드래그엔 드롭으로 사원의 그룹을 이동시킬 수 있어야 한다.
> - 사원을 더블클릭해 사원의 정보를 볼 수 있어야 한다.
> - 사원의 정보를 pdf로 인쇄할 수 있어야 한다.

#### 일정 기능
> - 원하는 날짜에 일정 등록 가능
> - 일정 변경,삭제는 작성자만 가능해야 한다.

#### 휴가신청 기능
> -  휴가는 결재자 승인이 되어야 확정 된다.
> -  휴가 기간에 공휴일을 빼서 계산해야 한다.
> -  연차에 따라 휴가 기간 부여해야 한다.

#### 출/퇴근 기능
> - 전체 직원의 근태현황은 관리자만 볼 수 있다.
> - 출근 전에는 출근버튼만 출력하고, 근무 중에는 퇴근버튼만 출력한다.
> - 퇴근시간 전에 실수로 퇴근을 누르면 관리자가 수정해 줄수 있어야 한다.

기본데이터 비밀번호 qwe123!@#


# 🚀 Skills


https://velog.io/@luna7182/%EB%B0%B1%EC%97%94%EB%93%9C-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-README-%EC%93%B0%EB%8A%94-%EB%B2%95

https://github.com/Envoy-VC/awesome-badges


![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

![BootStrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

![JQuery](https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white)

![MySql](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)

<hr>

### 4. API 설계

![image](https://github.com/yoohwanihn/Hi-E/assets/73772238/b101c5bd-419e-4d12-a355-4d5d011e9fc2)
![image](https://github.com/yoohwanihn/Hi-E/assets/73772238/b09d9e63-fca1-4fa3-b0ed-e647d7fe0562)
![image](https://github.com/yoohwanihn/Hi-E/assets/73772238/bc844692-2c3d-4ceb-96b0-8057d4b6052a)


<hr>

### 5. 프로젝트 후기

#### 유환인

ERP 사이트를 개발하면서 데이터베이스 설계 시 테이블 간의 관계 해소와 정규화의 중요성을 깨달았습니다. 협업을 통해 지속적인 통합의 중요성을 체감하였으며 TDD를 함으로써 통합 테스트 시간을 절약할 수 있다는 것을 깨달았습니다. 앞으로의 프로젝트에서 아쉬웠던 점과 어려웠던 점을 개선해서 프로젝트를 진행할 수 있는 사람이 되고 싶습니다.

#### 최민지

팀 프로젝트를 수행하면서 설계의 중요성을 깨달았습니다. API 명세서와 테스트 케이스 작성 단계에서 놓치고 있었던 부분까지 살펴볼 수 있었습니다. 뿐만 아니라 코드리뷰를 통해 코드 품질을 향상시키고, 구글 캘린더 연동 및 Fullcalendar API를 활용하여 오픈 소스 해석 능력을 키우고 SPA 방식의 서버와의 통합에서 발생한 CORS 문제 및 라우팅에 대한 이해를 높일 수 있었습니다. 협업을 통해 함께 프로그램을 개발하는 과정이 매우 즐거웠습니다. 앞으로의 프로젝트에서는 코드뿐만 아니라 네트워크와의 상호작용에도 주의를 기울여 더욱 다양한 역할을 수행하는 능력을 키워 나갈 것입니다.

#### 박준영

처음으로 팀 프로젝트를 진행하며 역할분담과 초기 세팅의 중요성을 깨달았으며, 팀원들과의 지속적인 통합의 필요성도 깨달았습니다.
하지만 그런 과정을 겪어가며, 문제를 해결하고 조금씩 완성되어가는 프로젝트를 보며 조금의 성취감을 얻었습니다. 앞으로 진행하는 협업 프로젝트에서는 이런 부분들을 더욱 보완하며 진행하도록 하겠습니다.





<img src="https://capsule-render.vercel.app/api?type=waving&color=BDBDC8&height=150&section=footer" />


