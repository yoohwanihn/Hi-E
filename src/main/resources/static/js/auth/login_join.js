$(document).ready(function () {
    let signin = $(".links").find("li").find("#signin");
    let signup = $(".links").find("li").find("#signup");
    let reset = $(".links").find("li").find("#reset");
    let first_input = $("form").find(".first-input");
    let hidden_input = $("form").find(".input__block").find("#repeat__password");
    let hidden_input2 = $("form").find(".input__block").find("#ename");
    let signin_btn = $("form").find(".signin__btn");
    $("form").find(".btn").hide();

    // Function to update form action
    function updateFormAction(action, buttonText, changeId) {
        $("form").attr("action", action);
        $("form").prop('id', changeId);
        signin_btn.text(buttonText);
    }

    //----------- sign up ---------------------
    signup.on("click", function (e) {
        e.preventDefault();
        $(this).parent().parent().siblings("h1").text("SIGN UP");
        $(this).parent().css("opacity", "1");
        $(this).parent().siblings().css("opacity", ".6");
        first_input.removeClass("first-input__block").addClass("signup-input__block");
        hidden_input.css({
            "opacity": "1",
            "display": "block"
        });
        hidden_input2.css({
            "opacity": "1",
            "display": "block"
        });
        // Update action for sign up
        updateFormAction("/auth/join", "Sign up", "join");
        // Show all fields
        $("form").find(".input__block").show();
    });

    //----------- sign in ---------------------
    signin.on("click", function (e) {
        e.preventDefault();
        $(this).parent().parent().siblings("h1").text("SIGN IN");
        $(this).parent().css("opacity", "1");
        $(this).parent().siblings().css("opacity", ".6");
        first_input.addClass("first-input__block").removeClass("signup-input__block");
        hidden_input.css({
            "opacity": "0",
            "display": "none"
        });
        hidden_input2.css({
            "opacity": "0",
            "display": "none"
        });
        // Update action for sign in
        updateFormAction("/login-process", "Sign in", "login");
        // Show only email and password fields
        $("form").find("#email").parent().show();
        $("form").find("#password").parent().show();
    });

    //----------- reset ---------------------
    reset.on("click", function (e) {
        e.preventDefault();
        $(this).parent().parent().siblings("h1").text("FORGOT PASSWORD");
        $(this).parent().css("opacity", "1");
        $(this).parent().siblings().css("opacity", ".6");
        first_input.addClass("reset__block")
            .removeClass("signup-input__block")
            .removeClass("first-input__block");
        hidden_input.css({
            "opacity": "0",
            "display": "none"
        });
        hidden_input2.css({
            "opacity": "1",
            "display": "block"
        });
        // Update action for reset
        updateFormAction("/reset-process", "Send Email", "reset");
        // Show only email and name fields
        $("form").find(".input__block").hide();
		$("form").find("#email").parent().show();
		$("form").find(".input__block input[name='ename']").parent().show();
    });

    // 폼 제출 이벤트 리스너
    $("form").on('submit', function (e) {

        if ($(this).attr('id') === 'join') {
			
        	e.preventDefault();
            const data = new FormData(this);
            const param = JSON.stringify(Object.fromEntries(data));

            if (validateJoinForm(this)) {
                fetch('/auth/join', {
                    method: 'POST',
                    body: param,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        if (response.status == 200) {
                            alert("회원가입 성공");
                            updateFormAction("/login-process", "Sign in", "login");
                            window.location.href = '/view/login';
                        } else {
                            alert("회원가입 실패");
                        }
                    })
                    .catch(error => console.log(error));
            }
        }
        
        else if ($(this).attr('id') === 'reset') {
        	e.preventDefault();
			// 클라이언트 측에서 유효성 검사를 먼저 진행
	            if (!validateSearchPassWordForm()) {
	                return;
	            }
	            
	            // 직접 JSON 객체를 만들어 데이터 수집
	            const data = {
	                email: $("#email").val(),
	                ename: $("#ename").val()
	            };
	
	            // 서버로 회원가입 데이터 전송, Ajax 요청
	            $.ajax({
	                type: "POST",
	                url: "/sendEmail",
	                contentType: "application/json",
	                data: JSON.stringify(data),
	                success: function (data) {
	                    // 서버 응답에 따라 동적으로 처리
	                    if (data === "success") {
	                        // 이메일 전송 성공
	                        alert("임시 비밀번호 발급이 완료되었습니다. 로그인 페이지로 이동합니다.")
	                        window.location.href = "/view/login";
	                    } else {
	                        // 이메일 전송 실패
	                        alert(data); // 실패 이유
	                    }
	                },
	                
	                error: function (xhr, status, error) {
	                	// 서버 오류 또는 예외 발생 시. MailController에서 status를 받음
		                if (xhr.status === 400) {
		                    // 400 Bad Request: 이메일과 이름이 일치하지 않거나 해당 이메일이 존재하지 않는 경우
		                    alert("이메일과 이름이 일치하지 않거나 해당 이메일이 존재하지 않습니다.");
		                } else if (xhr.status === 500) {
		                    // 500 Internal Server Error: 서버 오류가 발생한 경우
		                    alert("서버 오류가 발생했습니다.");
		                } else {
		                    // 그 외의 오류 처리
		                    alert("알 수 없는 오류가 발생했습니다.");
		                }
		            }
	            });
		}
        
        else if($(this).attr('id') === 'login'){
			if (!validateLoginForm()) {
                console.log("무언가 틀림");
            }
        }
        return true;
    });
});