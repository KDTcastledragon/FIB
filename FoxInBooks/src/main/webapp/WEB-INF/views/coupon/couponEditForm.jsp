<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="/resources/lib/coupon.js"></script>
<script>

</script>
<title>쿠폰정보 수정</title>
</head>
<body>
	<h2>쿠폰정보 수정</h2>	
	<form action="couponEditForm" method="post" enctype="multipart/form-data" id="couponEditForm">
		<table class="couponEditFormTable" border="1">
			<c:if test="${not empty requestScope.couponList}">
				<tr>
					<th>분류</th>
					<td>
						<select name="category" id="categorySelect" onchange="updateCouponDateInput()" value="${requestScope.couponList.category}">
							<option value="첫구매">신규/첫구매/웰컴</option>
							<option value="월간">월간</option>
							<option value="생일">생일</option>
							<option value="시즌">시즌</option>
							<option value="이벤트">이벤트</option>
						</select>
					</td>
				</tr>
				<tr height="40">
					<th>쿠폰 코드</th>
					<td>
						<input type="text" name="coupon_code" id="coupon_code" placeholder="쿠폰 코드" size="30" value="${requestScope.couponList.coupon_code}" readonly/>
						<br>
						<span id="tMessage" class="eMessage"></span>
					</td>
				</tr>
				<tr height="40">
					<th>쿠폰 이름</th>
					<td>
						<input type="text" name="title" id="title" placeholder="쿠폰 이름" size="30" value="${requestScope.couponList.title}"/>
						<br>
						<span id="tMessage" class="eMessage"></span>
					</td>
				</tr>
				<tr height="40">
					<th>할인율</th>
					<td>
						<input type="text" name="discount_rate" id="discount_rate" placeholder="할인율" size="10" value="${requestScope.couponList.discount_rate}"/>
						<br>
						<span id="dMessage" class="eMessage"></span>
					</td>
				</tr>
				<tr height="40">
					<th>최대 할인금액</th>
					<td>
						<input type="text" name="max" id="max" placeholder="최대 할인금액" size="10" value="${requestScope.couponList.max}"/>
						<br>
						<span id="m2Message" class="eMessage"></span>
					</td>
				</tr>
				<tr height="40">
					<th>이미지</th>
					<td>
						<img alt="${requestScope.couponList.title}" src="${requestScope.couponList.image}" class="select_img"><br>
						<input type="hidden" name="image" value="${requestScope.couponList.image}" />
						<br>
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
				    <th>쿠폰 사용기간</th>
				    <td id="couponDateInput" style="display:none;">
	                    <input type="date" name="start" id="start" size="20" value=""/>
	                    <span id="startLabel">부터</span>
	                    <input type="date" name="end" id="end" size="20" value=""/>
	                    <span id="endLabel">까지</span>
	                    <br>
	                    <span id="sMessage" class="eMessage"></span>
	                    <span id="endMessage" class="eMessage"></span>
	                </td>
				</tr>
				<tr height="40">
					<td colspan="2" style="text-align:center;">
						<input type="submit" id="submitTag" onclick="couponEditFinish()" value="수정" />
						&nbsp;&nbsp;&nbsp;
						<input type="reset" value="취소" onclick="couponManagement()"/>
						&nbsp;&nbsp;
					</td>
				</tr>
			</c:if>
		</table>
	</form>
</body>
</html>
