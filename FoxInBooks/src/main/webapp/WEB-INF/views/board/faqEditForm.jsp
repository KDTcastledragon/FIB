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
<title>FAQ 수정</title>
</head>
<body>
	<h2>FAQ 수정</h2>
	<form action="faqEditForm" method="post"	enctype="multipart/form-data" id="faqEditForm">
		<table class="faqEditFormTable" border="1" style="width: 800px;">
			<c:if test="${not empty requestScope.faqList}">
				<tr height="40">
					<th>FAQ 코드</th>
					<td>
						<input type="text" name="faq_code" id="faq_code" size="30" value="${requestScope.faqList.faq_code}" readonly/>
						<br>
						<span id="tMessage" class="eMessage"></span>
					</td>
				</tr>
				<tr height="40">
					<th>분류</th>
					<td>
						<select name="category">
							<option value="일반" ${requestScope.faqList.category=='일반' ? 'selected' : '' }>일반</option>
							<option value="주문/결제" ${requestScope.faqList.category=='주문/결제' ? 'selected' : '' }>주문/결제</option>
							<option value="제품" ${requestScope.faqList.category=='제품' ? 'selected' : '' }>제품</option>
							<option value="이벤트" ${requestScope.faqList.category=='이벤트' ? 'selected' : '' }>이벤트</option>
							<option value="쿠폰" ${requestScope.faqList.category=='쿠폰' ? 'selected' : '' }>쿠폰</option>
						</select> 
						<br> 
						<span id="tMessage" class="eMessage">
						</span>
					</td>
				</tr>
				<tr height="40">
					<th>제목</th>
					<td>
						<input type="text" name="title" id="faq_title" placeholder="공지사항 제목" size="50" value="${requestScope.faqList.title}" /> 
						<br> 
						<span id="dMessage" class="eMessage"></span>
					</td>
						
				</tr>
				<tr height="40">
					<th>내용</th>
					<td>
						<textarea class="form-control" name="content" style="width: 100%; height: 300px; resize: none;"	placeholder="내용을 입력해 주세요.">${requestScope.faqList.content}</textarea>
						<br>
						<span id="m2Message" class="eMessage"></span>
					</td>
				</tr>
				<tr height="40">
					<td colspan="2" style="text-align: center;">
						<input type="submit" id="submitTag" value="수정" onclick="faqEditFinish()" /> 
						&nbsp;&nbsp;&nbsp; 
						<input type="reset" value="취소" onclick="faqManagement()"/> 
					</td>
				</tr>
			</c:if>
		</table>
	</form>
	<hr>
</body>
</html>