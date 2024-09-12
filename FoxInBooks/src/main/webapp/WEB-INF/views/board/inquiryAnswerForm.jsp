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
<title>1:1문의 답변</title>
</head>
<body>
	<h2>1:1문의 답변</h2>
	<form action="inquiryAnswerForm" method="post" enctype="multipart/form-data" id="inquiryAnswerForm">
		<table class="inquiryAnswerFormTable" border="1" style="width: 800px;">
			<c:if test="${not empty requestScope.inquiryList}">
				<tr height="40">
					<th>회원ID</th>
					<td>
						<input type="text" name="id" value="${requestScope.inquiryList.id}" readonly/> 
					</td>
				</tr>
				<tr height="40">
					<th>1:1문의 코드</th>
					<td>
						<input type="text" name="inquiry_code" id="inquiry_code" size="10" value="${requestScope.inquiryList.inquiry_code}" readonly/> 
					</td>
				</tr>
				<tr>
					<th>분류</th>
					<td>
						<c:choose>
						   <c:when test="${requestScope.inquiryList.category eq '일반'}">
						       <input type="text" name="category" id="category" value="일반" readonly/>
						   </c:when>
						   <c:when test="${requestScope.inquiryList.category eq '제품'}">
						       <input type="text" name="category" id="category" value="제품" readonly/>
						   </c:when>
						   <c:when test="${requestScope.inquiryList.category eq '주문 / 결제'}">
						       <input type="text" name="category" id="category" value="주문 / 결제" readonly/>
						   </c:when>
						   <c:when test="${requestScope.inquiryList.category eq '반품 / 환불 / 취소'}">
						       <input type="text" name="category" id="category" value="반품 / 환불 / 취소" readonly/>
						   </c:when>
						   <c:when test="${requestScope.inquiryList.category eq '이벤트 / 쿠폰'}">
						       <input type="text" name="category" id="category" value="이벤트 / 쿠폰" readonly/>
						   </c:when>
						   <c:otherwise>
						       <input type="text" name="category" id="category" value="분류없음" readonly/>
						   </c:otherwise>
						</c:choose>
					</td>
				</tr>
				<tr height="40">
					<th>제목</th>
					<td >
						<input type="text" name="title" id="title" placeholder="문의 제목" size="45" value="${requestScope.inquiryList.title}" readonly/>						
						<br>
						<span id="m2Message" class="eMessage"></span>
					</td>
				</tr>
				<tr height="40">
					<th>내용</th>
					<td colspan="4">
						<textarea class="form-control" name="content" style="width:100%; height: 200px; resize: none;" readonly>${requestScope.inquiryList.content}</textarea>
						<br>
						<span id="m2Message" class="eMessage"></span>
					</td>
				</tr>
				<tr>
					<th>첨부자료</th>
					<td>${requestScope.inquiryList.attached_data}</td>
				</tr>
				<tr>
					<td colspan="4">&nbsp;</td>
				</tr>
				<tr height="40">
					<th>답변 내용</th>
					<td colspan="4">
						<textarea class="form-control" name="answer" id="answer" style="width: 100%; height: 200px; resize: none;" placeholder="내용을 입력해 주세요.">${requestScope.inquiryList.answer}</textarea>
						<br>
						<span id="m2Message" class="eMessage"></span>
					</td>
				</tr>
				<tr height="40">
					<td colspan="2" style="text-align: center;">
						<input type="submit" id="submitTag" value="답변완료" onclick="inquiryAnswerFinish()" /> 
						&nbsp;&nbsp;&nbsp; 
						<input type="reset" value="취소" onclick="inquiryManagement()"/> 
					</td>
				</tr>
			</c:if>
		</table>
	</form>
</body>
</html>