// 1:1문의 답변여부 체크박스 클릭시 정렬방법
function toggleAnswerSort(pageNumber) {
	pageNumber = pageNumber || 0;
	let checkbox = document.getElementById("inquiry_answer_toggle");
	let showOnlyAnswered;
	
	if(checkbox.checked) {
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