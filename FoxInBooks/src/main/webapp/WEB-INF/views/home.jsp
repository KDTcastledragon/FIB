<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!-- <html> -->
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <link rel="stylesheet" type="text/css" href="/resources/lib/style.css">
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="/resources/lib/coupon.js"></script>
    <script src="/resources/lib/board.js"></script>
    <script src="/resources/lib/memberPayment.js"></script>
    <script src="/resources/lib/admin.js"></script>
    
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	
	<!-- FullCalendar JavaScript dependencies -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fullcalendar@3.10.2/dist/fullcalendar.min.css" />
    <script src="https://cdn.jsdelivr.net/npm/moment@2.29.1/moment.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/fullcalendar@3.10.2/dist/fullcalendar.min.js"></script>
</head>
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <div class="adminListArea">
                <div>
                    <div class="adminList">
     	                <div class="adminListHome">
                            <a href="http://localhost:8080/home" class="adminListHomeA">
                                FIB 여우책방
                            </a>
                        </div>
                        <div class="adminListHeader">
                            관리목록
                        </div>
                           <ul class="listGroup">
                           <li class="listGroupItem" onclick="userManagement()">회원</li>
                           <li class="listGroupItem" onclick="productManagement()">제품</li>
                           <li class="listGroupItem" onclick="memberPaymentList('all')">주문내역</li>
                           <li class="listGroupItem" onclick="noticeManagement()">공지사항</li>
                           <li class="listGroupItem" onclick="faqManagement()">FAQ</li>
                           <li class="listGroupItem" onclick="inquiryManagement()">1:1 문의</li>
                           <li class="listGroupItem" onclick="eventManagement()">이벤트</li>
                           <li class="listGroupItem" onclick="couponManagement()">쿠폰</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="resultArea">
                <div id="managementArea">
                    <h2>관리자 페이지입니다</h2>
                    <div id="calendar"></div>
					

                    <%-- <!-- 일별 데이터 -->
                     <c:if test="${not empty requestScope.dailyOrderSummary}">
                        <h4>일별 주문건수, 주문금액</h4>
                            <div class="dailyOrderSummary">
                             <c:forEach var="dailyOrder" items="${dailyOrderSummary}" varStatus="loopStatus">
                                <c:if test="${loopStatus.index < 31}">
                                	<div class="dailyOrderSummaryItem textlink ${dailyOrder.orderDate == maxPriceOrder.orderDate ? 'max' : ''}" >        
                                        <div class="dailyOrderSummaryOrderDate">${dailyOrder.orderDate}</div>
                                        <c:if test="${dailyOrder.dailyOrderCount > 0}" >
                                            <div class="dailyOrderSummaryCount">${dailyOrder.dailyOrderCount}건</div>
                                            <div class="dailyOrderSummaryAmount">
                                            	<fmt:formatNumber value="${dailyOrder.dailyOrderAmount}" pattern="#,##0"/>원
                                            </div>
                                        </c:if>
                                    </div>
                                    <c:if test="${loopStatus.index % 7 == 6 and loopStatus.index < 31}">
                                        <br /> <!-- 7번째 요소마다 줄바꿈 -->
                                    </c:if>
                                </c:if>
                            </c:forEach>
                        </div>
                    </c:if> --%>
                    <br />
                    <!-- 최근 미답변 게시글을 동적으로 생성 -->
                    <c:if test="${not empty requestScope.UnAnsweredInquiries}">
                        <h4>1:1문의글 ${fn:length(UnAnsweredInquiries)}개</h4>
                            <div class="UnAnsweredInquiriesContainer">
                            <c:forEach var="inquiry" items="${UnAnsweredInquiries}" varStatus="loopStatus">
                                <c:if test="${loopStatus.index < 5}">
                                    <div class="UnAnsweredInquiriesItem textlink" onclick="inquiryAnswerForm('${inquiry.inquiry_code}')">    
                                        <div class="UnAnsweredInquiriesTitle">${inquiry.title}</div>
                                        <br />
                                        <div class="UnAnsweredInquiriesContent">${inquiry.content}</div>
                                    </div>
                                </c:if>
                            </c:forEach>
                        </div>
                    </c:if>
                </div>
            </div>
        </div>
    </div>
</body>
</html>