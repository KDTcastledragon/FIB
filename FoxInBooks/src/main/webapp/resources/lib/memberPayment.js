"use strict"

// 주문정보 전체 조회
function memberPaymentList(orderParam) {

	axios.get(`memberPayment/memberPaymentList?orderParam=${orderParam}`
	).then(response => {
		document.getElementById('managementArea').innerHTML = response.data;
	}).catch(err => {
		alert("주문내역 조회 실패 => " + err.message);
		document.getElementById('managementArea').innerHTML = '실패 ㅠㅠㅠ';
	});

}

// 주문정보 취소
function paymentCancel(orderParam, member_payment_code, id, product_amount, origin_price, coupon_code) {

	if (confirm('주문내역을 취소하시겠습니까?')) {

		axios.post(`memberPayment/memberPaymentCancel`,
			{
				orderParam: orderParam,
				member_payment_code: member_payment_code,
				id: id,
				product_amount: product_amount,
				origin_price: origin_price,
				coupon_code: coupon_code
			}
		).then(response => {
			alert(response.data);
			memberPaymentList(orderParam);
		}).catch(err => {
			alert("주문내역 취소 실패 => " + err.message);
		});
		
	}

}