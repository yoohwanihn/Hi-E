// 다음 주소 찾기 모듈 
function openDaumPostcode() {
	new daum.Postcode({
		oncomplete: function(data) {
			// 선택한 주소 정보를 필드에 설정
			document.getElementById('address').value = data.zonecode;
			document.getElementById('street_address').value = data.address;
		}
	}).open();
}