<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<!-- <link rel="stylesheet" type="text/css" href="/resources/Lib/style.css"> -->
<title>**님 쿠폰 리스트</title>
</head>
<body>
    <h1>쿠폰 리스트</h1>
	<c:if test="${!empty requestScope.couponList}">
    	<div>
    		<c:forEach var="s" items="${requestScope.couponList}">
    			<div class="couponBox">
    				<span>
    					<img src="${s.image}" alt="쿠폰">
    				</span>
    				<br>
    				<button size="30" onclick="showPopup()">받기</button>
    			</div>
    		</c:forEach>
    	</div>
    </c:if>

    <!-- 발급 성공 팝업 창 -->
    <div id="popup" class="popup">
        <p>쿠폰이 성공적으로 발급되었습니다!</p>
        <button onclick="document.getElementById('popup').style.display='none'">닫기</button>
    </div>
    
    <%-- <c:if test="${!empty requestScope.couponList}">
    	<div>
    		<c:forEach var="s" items="${requestScope.couponList}">
    			<div>${s.title}</div>
    			<div>${s.discount_rate}%</div>
    			<div>${s.max}원</div>
    			<div>${s.start}</div>
    			<div>${s.end}</div>
    		</c:forEach>
    	</div>
    	<button onclick="showPopup()">받기</button>
    </c:if>

    <!-- 발급 성공 팝업 창 -->
    <div id="popup" class="popup">
        <p>쿠폰이 성공적으로 발급되었습니다!</p>
        <button onclick="document.getElementById('popup').style.display='none'">닫기</button>
    </div> --%>
    
</body>
</html>