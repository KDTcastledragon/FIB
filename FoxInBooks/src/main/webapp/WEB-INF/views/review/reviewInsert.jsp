<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Date" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>리뷰 등록</title>

<link rel="stylesheet" type="text/css" href="/resources/lib/kimTest.css">
</head>
<body>

	<!-- JSP 에는 자바코드가 이렇게 있으면 안됨. 최대한 사용 자제. -->
	<%
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
	    String regdate = dateFormat.format(new Date());
	%>

	<!-- 
		< enctype="multipart/form-data" >
			- 파일 업로드를 지원하는 폼이며, 사용자 이름과 파일을 전송하는 데 사용됩니다. 폼을 제출할 때 이 타입을 사용하면 서버는 이진 데이터를 안전하게 처리할 수 있습니다.
	 -->
	<form action="reviewinsert" enctype="multipart/form-data" method="post">
		<table class="listTable">
			<tr>
				<th>제품코드</th>
				<td>
					<input type="text" name="product_code">
				</td>
			</tr>
			<tr>
				<th>아이디</th>
				<td>
					<input type="text" name="id">
				</td>
			</tr>
			<tr>
				<th>별점</th>
				<td>
					<input type="text" name="star_count">
				</td>
			</tr>
			<tr>
				<th>리뷰내용</th>
				<td>
					<input type="hidden" value="<%= regdate %>" name="regdate">
					<input type="text" name="content">
				</td>
			</tr>
			<tr>
				<th>리뷰이미지</th>
				<td>
					<c:if test="${not empty requestScope.reviewAll.image}">
						<img src="" class="listImage">
					</c:if>
					<input type="file" name="reviewImageUploadfile">
				</td>
			</tr>
		</table>
		
		<input type="submit" value="등록">
		<input type="reset" value="취소">
		
		<hr>
		
		<c:if test="${not empty requestScope.message}">
			${requestScope.message}
		</c:if>
	
	</form>
</body>
</html>