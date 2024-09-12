<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="/resources/lib/board.js"></script>
<script>
</script>
<title>공지사항 등록</title>
</head>
<body>
	<h2>공지사항 등록</h2>	
	<form action="noticeRegister" method="post" enctype="multipart/form-data" id="myform">
		<table class="noticeRegisterTable" border="1" style="width: 800px;">
			<tr height="40">
				<th>분류</th>
				<td>
					<select name="category">
						<option value="일반">일반</option>
						<option value="주문/결제">주문/결제</option>
						<option value="제품">제품</option>
						<option value="이벤트">이벤트</option>
						<option value="쿠폰">쿠폰</option>
					</select>
					<br>
					<span id="tMessage" class="eMessage"></span>
				</td>
			</tr>
			<tr height="40">
				<th>제목</th>
				<td>
					<input type="text" name="title" id="notice_title" placeholder="공지사항 제목" size="50"/>
					<br>
					<span id="dMessage" class="eMessage"></span>
				</td>
			</tr>
			<tr height="40">
				<th>내용</th>
				<td>
					<textarea class="form-control" name="content" style="width:100%; height: 300px; resize: none;" placeholder="내용을 입력해 주세요."></textarea>
					<br>
					<span id="m2Message" class="eMessage"></span>
				</td>
			</tr>
			<tr height="40">
				<th>이미지</th>
				<td>
					<img src="" class="select_img"><br>
					<input type="file" name="uploadfilef" id="uploadfilef" size="20"/>
				</td>
			</tr>
			<script>
				window.document.getElementById('uploadfilef').onchange=function(e){
	     			 if(this.files && this.files[0]) {
	       			  let reader = new FileReader;
	        			 reader.readAsDataURL(this.files[0]);
	         			 reader.onload = function(e) {
	          			     $(".select_img").attr("src", e.target.result)
	         			                  .width(70).height(90); 
	          			  }
	       			}
	   			};
			</script>   
			<tr height="40">
				<td colspan="2" style="text-align:center;">
				<input type="submit" id="submitTag" value="등록" onclick="noticeUpload()"/>
				&nbsp;&nbsp;&nbsp;
				<input type="reset" value="취소" onclick="notice()"/>
				</td>
			</tr>
	</table>
	</form>
	<hr>
</body>
</html>