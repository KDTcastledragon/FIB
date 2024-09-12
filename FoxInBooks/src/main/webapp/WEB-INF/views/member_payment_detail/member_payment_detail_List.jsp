<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>주문상세 조회</title>

<link rel="stylesheet" type="text/css" href="/resources/lib/kimTest.css">
</head>
<body>
	<table class="listTable">
		<tr>
			<th>주문코드</th>
			<th>아이디</th>
			<th>상품코드</th>
			<th>수량</th>
		</tr>

		<c:if test="${not empty requestScope.detailList}">
			<c:forEach var="detailVar" items="${requestScope.detailList}">
				<tr>
					<td>${detailVar.member_payment_code}</td>
					<td>${detailVar.id}</td>
					<td>${detailVar.product_code}</td>
					<td>${detailVar.amount}</td>
				</tr>
			</c:forEach>
		</c:if>
	</table>
	
	<hr>
	
	<c:if test="${not empty requestScope.message}">
		${requestScope.message}
	</c:if>
	
</body>
</html>