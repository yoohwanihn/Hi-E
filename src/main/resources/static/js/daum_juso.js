// 다음 주소 찾기 모듈 
function openDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 선택한 주소 정보를 필드에 설정
            var addressElements = document.getElementsByName('address');
            var streetAddressElements = document.getElementsByName('street_address');

            // 각 이름에 해당하는 요소에 값을 설정
            for (var i = 0; i < addressElements.length; i++) {
                addressElements[i].value = data.zonecode;
            }

            for (var i = 0; i < streetAddressElements.length; i++) {
                streetAddressElements[i].value = data.address;
            }
        }
    }).open();
}