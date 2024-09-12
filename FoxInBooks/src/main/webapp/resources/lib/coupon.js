"use strict"

// 쿠폰 리스트_관리자관점
function couponManagement() {
	let url ="coupon/couponListAdmin";
	
	axios.get(url
	).then(response => {
		document.getElementById('managementArea').innerHTML=response.data;
	}).catch(err => {
		alert("response 실패 => 바보" + err.message);
	});
	document.getElementById("managementArea").innerHTML="";
}

// 쿠폰 페이지네이션
function couponManagementPage(pageNumber) {
    let url = "coupon/couponListAdmin?page=" + pageNumber;

    axios.get(url
    ).then(response => {
        document.getElementById('managementArea').innerHTML = response.data;
        /* 요청받은 데이터를 출력하면서 제목과 내용의 길이를 조절*/
		let table = document.getElementById("couponTable");
		let rows = table.getElementsByTagName("tr");
		
		/* 제목과 내용의 크기를 확인 후 substring을 위한 for문 */
		for (let i = 1; i < rows.length; i++) {
			let cells = rows[i].getElementsByTagName("td");
			
			if (cells.length >= 4) {
				/* 제목과 내용 데이터의 length를 확인하기위해*/
				let titleValue = cells[2].innerText; 
				
				/* 제목 데이터를 innerText를 사용하기 위해 변수 지정
				innerText = 변경값이 원본에 영향을 주지 않기 때문에. */
				let titleCell = cells[2];
				
				if(titleValue.length > 20) {
					titleCell.innerText = titleValue.substring(0, 20) + "...";
				}
			}
		}	     
    })
    .catch(err => {
        alert("쿠폰 List response 실패 =>" + err.message);
    });
}

// 쿠폰 등록 폼 받기
function couponRegister() {
	let url="coupon/couponRegister";
	
	axios.get(url
	).then(response => {
		document.getElementById('managementArea').innerHTML=response.data;
	}).catch(err => {
		alert("response 실패 =>" + err.message);
	});
	document.getElementById("managementArea").innerHTML="";
}

// 쿠폰등록 완료
function couponUpload() {
	let formData = new FormData(document.getElementById("myform"));
	
	let url = "coupon/couponRegister";
	
	axios.post(url, formData, 
			   {headers:{"Content-Type" : "multipart/form-data"}
	}).then (response => { alert("쿠폰등록에 성공했습니다.");
		couponRegister();

	}).catch(err => {
			if(err.response.status=='502') alert("입력 오류!! 다시 시도하세요");
			else alert("시스템 오류, 잠시 후 다시하세요 =>" + err.message);
	})
	document.getElementById("managementArea").innerHTML="";
}

// 쿠폰 수정 폼받기
function couponEditForm(coupon_code) {
	let url ="/coupon/couponEdit?jCode=U&coupon_code=" + coupon_code;
	
	axios.get(
      url
   	  ).then(response => {
   	  let list = response.data;
      document.getElementById('managementArea').innerHTML=list;
	}).catch(err => {
      if(err.response.status=='502') alert(err.response.data);
      else alert("~~ 시스템 오류, 잠시후 다시하세요 => " + err.message);
      document.getElementById('managementArea').innerHTML="";
   	});
   	
    document.getElementById("managementArea").innerHTML=""; 	   
}

// 쿠폰 수정 완료
function couponEditFinish() {
	let formData = new FormData(document.getElementById("couponEditForm"));

	let url = "/coupon/couponEditForm";
	
	axios.post(url, formData, 
			   {headers:{"Content-Type" : "multipart/form-data"}
	}).then (response => {
			alert("쿠폰을 수정했습니다.");
			couponManagement();
	}).catch(err => {
			if(err.response.status=='502') alert("입력 오류!! 다시 시도하세요");
			else alert("시스템 오류, 잠시 후 다시하세요 =>" + err.message);
	})
	document.getElementById("managementArea").innerHTML="";
}

// 쿠폰 삭제
function couponDelete(coupon_code) {
	let url="/coupon/couponDelete/" + coupon_code;
	axios.delete(url).then(response => {
		alert("삭제 성공했습니다.");
		couponManagement();
	}).catch(err => {
		alert("삭제 실패 => " + err.message);
	});
}


/*// 카테고리 선택값을 가져와서 변경될 때마다 실행
function updateCouponDateInput() {
    // 현재 선택된 카테고리의 값
    let selectedCategory = document.getElementById('categorySelect').value;

    // 쿠폰 사용기간 입력 필드의 활성화 여부 업데이트
    let couponDateInput = document.getElementById('couponDateInput');
    if (selectedCategory === '시즌') {
        couponDateInput.style.display = 'table-row';
    } else {
        couponDateInput.style.display = 'none';
    }
}*/

// 카테고리 선택값을 가져와서 변경될 때마다 실행
function updateCouponDateInput() {
    // 현재 선택된 카테고리의 값
    let selectedCategory = document.getElementById('categorySelect').value;

    // 쿠폰 사용기간 입력 필드의 활성화 여부 업데이트
    let couponDateInput = document.getElementById('couponDateInput');
    
    if (selectedCategory === '시즌') {
        couponDateInput.style.display= 'table-row';

    } else {
        couponDateInput.style.display= 'none';
    }
}

