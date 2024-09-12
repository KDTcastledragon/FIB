"use strict"

// =================================================================================
// 공지사항 관리자 모드
function noticeManagement() {
	let url="board/noticeListAdmin";
	
	axios.get(url
	).then(response => {
		document.getElementById('managementArea').innerHTML=response.data;
				
		/* 요청받은 데이터를 출력하면서 제목과 내용의 길이를 조절*/
		let table = document.getElementById("noticeTable");
		let rows = table.getElementsByTagName("tr");
		
		/* 제목과 내용의 크기를 확인 후 substring을 위한 for문 */
		for (let i = 1; i < rows.length; i++) {
			let cells = rows[i].getElementsByTagName("td");
			
			/* 제목과 내용 데이터의 length를 확인하기위해*/
			let titleValue = cells[3].innerText; 
			let contentValue = cells[4].innerText; 
			
			/* 제목과 내용 데이터를 innerText를 사용하기 위해 변수 지정
			innerText = 변경값이 원본에 영향을 주지 않기 때문에. */
			let titleCell = cells[3];
			let contentCell = cells[4];
			
			if(titleValue.length > 20) {
				titleCell.innerText = titleValue.substring(0, 20) + "...";
			}
			
			if(contentValue.length > 15) {
				contentCell.innerText = contentValue.substring(0, 15) + "...";
			}
		}	
	}).catch(err => {
		alert("response 실패 => 바보" + err.message);
	});
	document.getElementById("managementArea").innerHTML="";
}

// 공지사항 페이지네이션
function noticeManagementPage(pageNumber) {
	pageNumber = pageNumber || 0;
    let url = "board/noticeListAdmin?page=" + pageNumber;
    
    axios.get(url
    ).then(response => {
        document.getElementById('managementArea').innerHTML = response.data;
        /* 요청받은 데이터를 출력하면서 제목과 내용의 길이를 조절*/
		let table = document.getElementById("noticeTable");
		let rows = table.getElementsByTagName("tr");
		
		/* 제목과 내용의 크기를 확인 후 substring을 위한 for문 */
		for (let i = 1; i < rows.length; i++) {
			let cells = rows[i].getElementsByTagName("td");
			
			if (cells.length >= 4) {
				/* 제목과 내용 데이터의 length를 확인하기위해*/
				let titleValue = cells[2].innerText; 
				let contentValue = cells[3].innerText; 
				
				/* 제목과 내용 데이터를 innerText를 사용하기 위해 변수 지정
				innerText = 변경값이 원본에 영향을 주지 않기 때문에. */
				let titleCell = cells[2];
				let contentCell = cells[3];
				
				if(titleValue.length > 20) {
					titleCell.innerText = titleValue.substring(0, 20) + "...";
				}
				
				if(contentValue.length > 15) {
					contentCell.innerText = contentValue.substring(0, 15) + "...";
				}
			}
		}	
        
    })
    .catch(err => {
        alert("FAQ List response 실패 =>" + err.message);
    });
}

// 공지사항 등록하기
function noticeRegister() {
	let url="board/noticeRegister";

	axios.get(url
	).then(response => {
		document.getElementById('managementArea').innerHTML=response.data;
	}).catch(err => {
		alert("response 실패 => 바보" + err.message);
	});
	document.getElementById("managementArea").innerHTML="";
}

// 공지사항 등록완료
function noticeUpload() {
	let formData = new FormData(document.getElementById("myform"));
	
	let url = "board/noticeRegister";
	
	axios.post(url, formData, 
			   {headers:{"Content-Type" : "multipart/form-data"}
	}).then (response => { 
		alert("공지사항 등록에 성공했습니다.");
		noticeRegister();
	}).catch(err => {
			if(err.response.status=='502') alert("입력 오류!! 다시 시도하세요");
			else alert("시스템 오류, 잠시 후 다시하세요 =>" + err.message);
	})
	document.getElementById("managementArea").innerHTML="";
}

// 공지사항 수정 폼받기
function noticeEditForm(notice_code) {
	let url ="board/noticeEdit?notice_code=" + notice_code;
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

// 공지사항 수정 완료
function noticeEditFinish() {
	let formData = new FormData(document.getElementById("noticeEditForm"));

	let url = "board/noticeEditForm";
	
	axios.post(url, formData, 
			   {headers:{"Content-Type" : "multipart/form-data"}
	}).then (response => {
			alert("공지사항을 수정했습니다.");
			noticeManagement();
	}).catch(err => {
			if(err.response.status=='502') alert("입력 오류!! 다시 시도하세요");
			else alert("시스템 오류, 잠시 후 다시하세요 =>" + err.message);
	})
	document.getElementById("managementArea").innerHTML="";
}

// 공지사항 삭제
function noticeDelete(notice_code) {
	let url="/board/noticeDelete/" + notice_code;
	
	axios.delete(url).then(response => {
		alert("삭제 성공했습니다");
		noticeManagement();
	}).catch(err => {
		alert("삭제 실패 => " + err.message);
	});
}

// 공지사항 분류에 따른 정렬
function noticeSortSelectOptions(pageNumber) {
	pageNumber = pageNumber || 0;
	let categorySelect = document.getElementById("category");
	let selectedCategory = categorySelect.value;
	
	let url=`board/pageNoticeListAdmin?category=${selectedCategory}&page=${pageNumber}`;
	
	axios.get(url
	).then(response => {
		document.getElementById('managementArea').innerHTML=response.data;
		
		/* 요청받은 데이터를 출력하면서 제목과 내용의 길이를 조절*/
		let table = document.getElementById("noticeTable");
		let rows = table.getElementsByTagName("tr");
		
		/* 제목과 내용의 크기를 확인 후 substring을 위한 for문 */
		for (let i = 1; i < rows.length; i++) {
			let cells = rows[i].getElementsByTagName("td");
			
			if (cells.length >= 4) {
				/* 제목과 내용 데이터의 length를 확인하기위해*/
				let titleValue = cells[2].innerText; 
				let contentValue = cells[3].innerText; 
				
				/* 제목과 내용 데이터를 innerText를 사용하기 위해 변수 지정
				innerText = 변경값이 원본에 영향을 주지 않기 때문에. */
				let titleCell = cells[2];
				let contentCell = cells[3];
				
				if(titleValue.length > 20) {
					titleCell.innerText = titleValue.substring(0, 20) + "...";
				}
				
				if(contentValue.length > 15) {
					contentCell.innerText = contentValue.substring(0, 15) + "...";
				}
			}
		}	
	}).catch(err => {
		alert("공지사항 List response 실패 =>" + err.message);
	});
	document.getElementById("managementArea").innerHTML="";
}
/*function noticeSortSelectOptions() {
	let table = document.getElementById("noticeTable");
	let rows = table.getElementsByTagName("tr");

	// 선택된 카테고리 가져오기
	let categorySelect = document.getElementById("category");
	let selectedCategory = categorySelect.value;

	for (let i = 1; i < rows.length; i++) {
		let cells = rows[i].getElementsByTagName("td");
		let categoryValue = cells[1].innerText; // 분류 열의 데이터

	if ((selectedCategory === "전체" || categoryValue === selectedCategory) ||
       (selectedCategory === "전체" || categoryValue === selectedCategory)) {
		rows[i].style.display = ""; // 해당 조건을 만족하는 경우 보이기
	} else {
		rows[i].style.display = "none"; // 기타는 숨기기
    }
  }
}*/




//=====================================================================================
// FAQ
// faqListAdmin
function faqManagement() {
	let url="board/faqListAdmin";
	
	axios.get(url
	).then(response => {
		document.getElementById('managementArea').innerHTML=response.data;
		
		/* 요청받은 데이터를 출력하면서 제목과 내용의 길이를 조절*/
		let table = document.getElementById("faqTable");
		let rows = table.getElementsByTagName("tr");
		
		/* 제목과 내용의 크기를 확인 후 substring을 위한 for문 */
		for (let i = 1; i < rows.length; i++) {
			let cells = rows[i].getElementsByTagName("td");
			
			if (cells.length >= 4) {
				/* 제목과 내용 데이터의 length를 확인하기위해*/
				let titleValue = cells[2].innerText; 
				let contentValue = cells[3].innerText; 
				
				/* 제목과 내용 데이터를 innerText를 사용하기 위해 변수 지정
				innerText = 변경값이 원본에 영향을 주지 않기 때문에. */
				let titleCell = cells[2];
				let contentCell = cells[3];
				
				if(titleValue.length > 20) {
					titleCell.innerText = titleValue.substring(0, 20) + "...";
				}
				
				if(contentValue.length > 15) {
					contentCell.innerText = contentValue.substring(0, 15) + "...";
				}
			}
		}	
	}).catch(err => {
		alert("FAQ List response 실패 =>" + err.message);
	});
	document.getElementById("managementArea").innerHTML="";
}

// FAQ 페이지네이션
function faqManagementPage(pageNumber) {
	pageNumber = pageNumber || 0;
    let url = "board/faqListAdmin?page=" + pageNumber;
    
    // 현재 선택된 카테고리 값 저장
    let selectedCategory = document.getElementById("category").value;

    axios.get(url
    ).then(response => {
        document.getElementById('managementArea').innerHTML = response.data;
        document.getElementById("category").value = selectedCategory;
        /* 요청받은 데이터를 출력하면서 제목과 내용의 길이를 조절*/
		let table = document.getElementById("faqTable");
		let rows = table.getElementsByTagName("tr");
		
		/* 제목과 내용의 크기를 확인 후 substring을 위한 for문 */
		for (let i = 1; i < rows.length; i++) {
			let cells = rows[i].getElementsByTagName("td");
			
			if (cells.length >= 4) {
				/* 제목과 내용 데이터의 length를 확인하기위해*/
				let titleValue = cells[2].innerText; 
				let contentValue = cells[3].innerText; 
				
				/* 제목과 내용 데이터를 innerText를 사용하기 위해 변수 지정
				innerText = 변경값이 원본에 영향을 주지 않기 때문에. */
				let titleCell = cells[2];
				let contentCell = cells[3];
				
				if(titleValue.length > 20) {
					titleCell.innerText = titleValue.substring(0, 20) + "...";
				}
				
				if(contentValue.length > 15) {
					contentCell.innerText = contentValue.substring(0, 15) + "...";
				}
			}
		}	
        
    })
    .catch(err => {
        alert("FAQ List response 실패 =>" + err.message);
    });
}

// FAQ 등록하기
function faqRegister() {
	let url="board/faqRegister";

	axios.get(url
	).then(response => {
		document.getElementById('managementArea').innerHTML=response.data;
	}).catch(err => {
		alert("response 실패 => 바보" + err.message);
	});
	document.getElementById("managementArea").innerHTML="";
}

// FAQ 등록완료
function faqUpload() {
	let formData = new FormData(document.getElementById("faqform"));
	
	let url = "board/faqRegister";
	
	axios.post(url, formData, 
			   {headers:{"Content-Type" : "multipart/form-data"}
	}).then (response => { 
		alert("FAQ 등록에 성공했습니다.");
		faqRegister();
	
	}).catch(err => {
			if(err.response.status=='502') alert("입력 오류!! 다시 시도하세요");
			else alert("시스템 오류, 잠시 후 다시하세요 =>" + err.message);
	})
	document.getElementById("managementArea").innerHTML="";
}

// FAQ 수정 폼받기
function faqEditForm(faq_code) {
	let url ="board/faqEdit?faq_code=" + faq_code;
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

// FAQ 수정 완료
function faqEditFinish() {
	let formData = new FormData(document.getElementById("faqEditForm"));

	let url = "board/faqEditForm";
	
	axios.post(url, formData, 
			   {headers:{"Content-Type" : "multipart/form-data"}
	}).then (response => {
			alert("FAQ를 수정했습니다.");
			faqManagement();
	}).catch(err => {
			if(err.response.status=='502') alert("입력 오류!! 다시 시도하세요");
			else alert("시스템 오류, 잠시 후 다시하세요 =>" + err.message);
	})
	document.getElementById("managementArea").innerHTML="";
}

// FAQ 삭제
function faqDelete(faq_code) {
	let url="/board/faqDelete/" + faq_code;
	
	axios.delete(url).then(response => {
		alert("삭제 성공했습니다");
		faqManagement();
	}).catch(err => {
		alert("삭제 실패 => " + err.message);
	});
}

// FAQ 분류에 따른 정렬
function faqSortSelectOptions(pageNumber) {
	pageNumber = pageNumber || 0;
	let categorySelect = document.getElementById("category");
	let selectedCategory = categorySelect.value;
	
	let url=`board/pageFaqListAdmin?category=${selectedCategory}&page=${pageNumber}`;
	
	axios.get(url
	).then(response => {
		document.getElementById('managementArea').innerHTML=response.data;
		
		/* 요청받은 데이터를 출력하면서 제목과 내용의 길이를 조절*/
		let table = document.getElementById("faqTable");
		let rows = table.getElementsByTagName("tr");
		
		/* 제목과 내용의 크기를 확인 후 substring을 위한 for문 */
		for (let i = 1; i < rows.length; i++) {
			let cells = rows[i].getElementsByTagName("td");
			
			if (cells.length >= 4) {
				/* 제목과 내용 데이터의 length를 확인하기위해*/
				let titleValue = cells[2].innerText; 
				let contentValue = cells[3].innerText; 
				
				/* 제목과 내용 데이터를 innerText를 사용하기 위해 변수 지정
				innerText = 변경값이 원본에 영향을 주지 않기 때문에. */
				let titleCell = cells[2];
				let contentCell = cells[3];
				
				if(titleValue.length > 20) {
					titleCell.innerText = titleValue.substring(0, 20) + "...";
				}
				
				if(contentValue.length > 15) {
					contentCell.innerText = contentValue.substring(0, 15) + "...";
				}
			}
		}	
	}).catch(err => {
		alert("FAQ List response 실패 =>" + err.message);
	});
	document.getElementById("managementArea").innerHTML="";
}

//=====================================================================================
// 1:1문의 리스트
function inquiryManagement() {
	let url="board/inquiryListAdmin";
	
	axios.get(url
	).then(response => {
		document.getElementById('managementArea').innerHTML=response.data;
		
		/* 요청받은 데이터를 출력하면서 제목과 내용의 길이를 조절하기 위한 세팅*/
		let table = document.getElementById("inquiryTable");
		let rows = table.getElementsByTagName("tr");
		
		/* 제목과 내용의 크기를 확인 후 substring을 위한 for문 */
		for (let i = 1; i < rows.length; i++) {
			let cells = rows[i].getElementsByTagName("td");
			
			/* 제목과 내용 데이터의 length를 확인하기위해*/
			let titleValue = cells[3].innerText; 
			let contentValue = cells[4].innerText; 
			
			/* 제목과 내용 데이터를 innerText를 사용하기 위해 변수 지정
			innerText = 변경값이 원본에 영향을 주지 않기 때문에. */
			let titleCell = cells[3];
			let contentCell = cells[4];
			
			if(titleValue.length > 20) {
				titleCell.innerText = titleValue.substring(0, 20) + "...";
			}
			
			if(contentValue.length > 15) {
				contentCell.innerText = contentValue.substring(0, 15) + "...";
			}
		}
	}).catch(err => {
		/*alert("response 실패 => 바보" + err.message);*/
	});
	document.getElementById("managementArea").innerHTML="";
}

// 1:1문의 페이지네이션
function inquiryManagementPage(pageNumber) {
	pageNumber = pageNumber || 0;
    let url = "board/inquiryListAdmin?page=" + pageNumber;

    axios.get(url
    ).then(response => {
        document.getElementById('managementArea').innerHTML = response.data;
        /* 요청받은 데이터를 출력하면서 제목과 내용의 길이를 조절*/
		let table = document.getElementById("inquiryTable");
		let rows = table.getElementsByTagName("tr");
		
		/* 제목과 내용의 크기를 확인 후 substring을 위한 for문 */
		for (let i = 1; i < rows.length; i++) {
			let cells = rows[i].getElementsByTagName("td");
			
			if (cells.length >= 4) {
				/* 제목과 내용 데이터의 length를 확인하기위해*/
				let titleValue = cells[3].innerText; 
				let contentValue = cells[4].innerText; 
				
				/* 제목과 내용 데이터를 innerText를 사용하기 위해 변수 지정
				innerText = 변경값이 원본에 영향을 주지 않기 때문에. */
				let titleCell = cells[3];
				let contentCell = cells[4];
				
				if(titleValue.length > 20) {
					titleCell.innerText = titleValue.substring(0, 20) + "...";
				}
				
				if(contentValue.length > 15) {
					contentCell.innerText = contentValue.substring(0, 15) + "...";
				}
			}
		}	
        
    })
    .catch(err => {
        alert("1:1문의 List response 실패 =>" + err.message);
    });
}


// 1:1문의 답변 form
function inquiryAnswerForm(inquiry_code) {
	let url ="board/inquiryAnswer?inquiry_code=" + inquiry_code;
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

// 1:1문의 답변 등록 완료
function inquiryAnswerFinish() {
	let formData = new FormData(document.getElementById("inquiryAnswerForm"));

	let url = "board/inquiryAnswerForm";
	
	axios.post(url, formData, 
			   {headers:{"Content-Type" : "multipart/form-data"}
	}).then (response => {
			alert("문의에 답변을 등록했습니다.");
			inquiryManagement();
	}).catch(err => {
			if(err.response.status=='502') alert("답변 등록에 실패했습니다.");
			else alert("시스템 오류, 잠시 후 다시하세요 =>" + err.message);
	})
	document.getElementById("managementArea").innerHTML="";
}

// 1:1문의 답변여부 체크박스 클릭시 정렬방법
function toggleAnswerSort(pageNumber) {
	pageNumber = pageNumber || 0;
	let checkbox = document.getElementById("inquiry_answer_toggle");
	let showOnlyAnswered;
	
	if(checkbox.onclick) {
		showOnlyAnswered = 0;
	} else { showOnlyAnswered = 1; }
	
	let url=`board/pageInquiryListAdmin?answer_check=${showOnlyAnswered}&page=${pageNumber}`;
	
	console.log("체크박스 상태:", showOnlyAnswered);
	
	axios.get(url
    ).then(response => {
        document.getElementById('managementArea').innerHTML = response.data;
        document.getElementById("inquiry_answer_toggle").value = showOnlyAnswered;
        
        /* 요청받은 데이터를 출력하면서 제목과 내용의 길이를 조절*/
		let table = document.getElementById("inquiryTable");
		let rows = table.getElementsByTagName("tr");
		
		/* 제목과 내용의 크기를 확인 후 substring을 위한 for문 */
		for (let i = 1; i < rows.length; i++) {
			let cells = rows[i].getElementsByTagName("td");
			
			if (cells.length >= 4) {
				/* 제목과 내용 데이터의 length를 확인하기위해*/
				let titleValue = cells[3].innerText; 
				let contentValue = cells[4].innerText; 
				
				/* 제목과 내용 데이터를 innerText를 사용하기 위해 변수 지정
				innerText = 변경값이 원본에 영향을 주지 않기 때문에. */
				let titleCell = cells[3];
				let contentCell = cells[4];
				
				if(titleValue.length > 20) {
					titleCell.innerText = titleValue.substring(0, 20) + "...";
				}
				
				if(contentValue.length > 15) {
					contentCell.innerText = contentValue.substring(0, 15) + "...";
				}
			}
		}	
        
    })
    .catch(err => {
        alert("1:1문의 List response 실패 =>" + err.message);
    });
}

// 1:1문의분류에 따른 정렬
function inquirySortSelectOptions() {
	let table = document.getElementById("inquiryTable");
	let rows = table.getElementsByTagName("tr");
	
	// 선택된 답변 여부 가져오기
	let checkbox = document.getElementById("inquiry_answer_toggle");
	let showOnlyAnswered = checkbox.checked;
	
	

	for (let i = 1; i < rows.length; i++) {
		let cells = rows[i].getElementsByTagName("td");
		let categoryValue = cells[2].innerText; // 분류 열의 데이터
		let answerStatus = cells[7].innerText; // 답변여부 열의 데이터

	if ((showOnlyAnswered && answerStatus === "x" && (selectedCategory === "전체" || categoryValue === selectedCategory)) ||
        (!showOnlyAnswered && (selectedCategory === "전체" || categoryValue === selectedCategory))) {
		rows[i].style.display = ""; // 해당 조건을 만족하는 경우 보이기
	} else {
		rows[i].style.display = "none"; // 기타는 숨기기
    }
  }
}



