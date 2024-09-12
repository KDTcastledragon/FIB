<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>제품 전체 정보 + 작가 정보</title>

<link rel="stylesheet" type="text/css" href="/resources/lib/kimTest.css">
</head>
<body>
	<table class="listTable">
		<tr>
			<th>작가코드</th>
			<th>제품코드</th>
			<th>아이디</th>
			<th>별점</th>

		</tr>

		<c:if test="${not empty requestScope.test}">
			<c:forEach var="reviewVar" items="${requestScope.test}">
				<tr>
					<td>${reviewVar.writer_code}</td>
					<td>${reviewVar.product_code}</td>
					<td>${reviewVar.title}</td>
					<td>${reviewVar.category}</td>
				</tr>
			</c:forEach>
		</c:if>
	</table>
	
	<hr>
	
</body>
</html>