// 입력 데이터 유효성 체크 모듈 
// 왜 오버라이딩 안되는지 모르겠어서 함수 이름 다르게 함

/* 회원가입 */
function validateJoinForm(form) {
	if (form.email.value == "") {
		alert("이메일을 입력하세요.");
		return false;
	}
	
	let reg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)?$/i;	//Email register
	if (!reg.test(form.email.value)) {
		alert("이메일을 정확하게 입력해주세요.");
		return false;
	}
	
	if (form.ename.value == "") {
		alert("이름을 입력하세요.");
		return false;
	}
	
	if (form.password.value == "") {
		alert("패스워드를 입력하세요.");
		return false;
	}
	
	// 비밀번호는 8자 이상, 하나 이상의 문자, 숫자와 특수문자를 입력하고 공백을 포함하지 않아야 한다.
    reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])\S{8,}$/;    //Password register
    let password = form.password.value;
    if (!reg.test(password)) {
        alert("비밀번호는 8자 이상, 하나 이상의 문자, 숫자와 특수문자를 입력해주세요. 공백은 허용되지 않습니다.");
        return false;
    }
	
	if (form.passwordcheck.value != form.password.value) {
		alert("비밀번호 확인이 일치하지 않습니다.");
		return false;
	}
	
	if (form.birth_day.value == "") {
		alert("생년월일을 선택하세요.");
		return false;
	}
	
	if (form.phone_number.value == "") {
		alert("전화번호를 입력하세요.");
		return false;
	}
	
	reg = /^[0-9]{10,11}/;	//Phone_number register
	let phone_number = form.phone_number.value;
	if (!reg.test(phone_number)) {
		alert("전화번호는 10~11자 숫자만 입력해주세요.");
		return false;
	}
	
	if (form.address.value == "" || form.street_address.value == "" ) {
		alert("주소를 선택하세요.");
		return false;
	}
	
	if (form.detail_address.value == "") {
		alert("상세주소를 입력하세요.");
		return false;
	}
	
	return true;
}

/* 로그인 */
function validateLoginForm() {
    const form = document.forms["loginInfo"];

    if (!form) {
        console.error("loginInfo 폼이 없음");
        return false;
    }

    if (form.email.value == "") {
        alert("이메일을 입력하세요.");
        return false;
    }

    let reg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)?$/i;	//Email register
    if (!reg.test(form.email.value)) {
        alert("이메일을 정확하게 입력해주세요.");
        return false;
    }

    if (form.pw.value == "") {
        alert("패스워드를 입력하세요.");
        return false;
    }

    // 비밀번호는 8자 이상, 하나 이상의 문자, 숫자와 특수문자를 입력하고 공백을 포함하지 않아야 한다.
    reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])\S{8,}$/;    //Password register
    let password = form.password.value;
    if (!reg.test(password)) {
        alert("비밀번호는 8자 이상, 하나 이상의 문자, 숫자와 특수문자를 입력해주세요. 공백은 허용되지 않습니다.");
        return false;
    }

    return true;
}

/* 비밀번호 찾기 */
function validateSearchPassWordForm() {
    const form = document.forms["loginInfo"];

    if (!form) {
        console.error("sendEmailForm 폼이 없음");
        return false;
    }

    if (form.email.value == "") {
        alert("이메일을 입력하세요.");
        return false;
    }

    let reg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)?$/i;	//Email register
    if (!reg.test(form.email.value)) {
        alert("이메일을 정확하게 입력해주세요.");
        return false;
    }
    
	if (form.ename.value == "") {
		alert("이름을 입력하세요.");
		return false;
	}

    return true;
}