<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!--  -->
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>주문내역</title>

<link rel="stylesheet" type="text/css" href="/resources/lib/style2.css">
</head>
<body>
	<h2>주문내역</h2>
	
	<div class="adminDiv">
		<span class="adminSpan">
			<sapn>
				<input type="radio" name="selectMenu" id="all" ${requestScope.orderParam eq 'all' ? 'checked' : ''} onclick="memberPaymentList('all')" />
				<label for="all">전체</label>
				
				<input type="radio" name="selectMenu" id="order" ${requestScope.orderParam eq 'order' ? 'checked' : ''} onclick="memberPaymentList('order')" />
				<label for="order">주문내역</label>
				
				<input type="radio" name="selectMenu" id="cancel" ${requestScope.orderParam eq 'cancel' ? 'checked' : ''} onclick="memberPaymentList('cancel')" />
				<label for="cancel">취소요청</label>
			</sapn>
			
			<span>
				<select class="searchSelect">
					<option>주문코드</option>
					<option>회원아이디</option>
				</select>
				<input type="text" class="searchInput" />
				<button type="button" class="searchBtn">검색</button>
			</span>
		</span>
		
		<div></div>
	</div>

	<table class="adminTable">
		<tr>
			<th>주문코드</th>
			<th>회원아이디</th>
			<th>결제일</th>
			<th>제품 가짓수</th>
			<th>총금액</th>
			<th>결제금액</th>
			<th>배송예정일</th>
			<c:if test="${requestScope.orderParam ne 'order'}">
				<th>취소요청</th>
			</c:if>
		</tr>

		<c:if test="${not empty requestScope.memberPaymentData}">
			<c:forEach var="memberPaymentVar" items="${requestScope.memberPaymentData}">
				<tr>
					<td>${memberPaymentVar.member_payment_code}</td>
					<td>${memberPaymentVar.id}</td>
					<td>${memberPaymentVar.payment_date}</td>
					<td>${memberPaymentVar.product_amount}</td>
					<td>
						<fmt:formatNumber value="${memberPaymentVar.origin_price}" pattern="#,###,###" />원
					</td>
					<td>
						<fmt:formatNumber value="${memberPaymentVar.final_price}" pattern="#,###,###" />원
					</td>
					<td>${memberPaymentVar.arrive_date}</td>
					<c:if test="${requestScope.orderParam ne 'order'}">
						<td>
							<c:if test="${memberPaymentVar.payment_cancel == 1}">
								<button type="button"
										class="paymentCancelBtn" 
										onclick="paymentCancel('${requestScope.orderParam}',
										'${String(memberPaymentVar.member_payment_code)}',
										'${memberPaymentVar.id}',
										${memberPaymentVar.product_amount},
										${memberPaymentVar.origin_price},
										${memberPaymentVar.coupon_code})">
										취소
								</button>
							</c:if>
						</td>
					</c:if>
				</tr>
			</c:forEach>
		</c:if>
	</table>

	<c:if test="${not empty requestScope.message}">
		${requestScope.message}
	</c:if>
</body>
</html>