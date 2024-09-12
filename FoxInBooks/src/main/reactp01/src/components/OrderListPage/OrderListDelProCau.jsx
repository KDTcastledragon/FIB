import './OrderListDelProCau.css';

function OrderListDelProCau() {
    return (
        <>
            <div className="deliveryprocess_box">

                <div className="deliveryprocess_phase">
                    <div>입금대기중</div>
                    <div>결제를 완료해주세요</div>
                </div>

                <div className="deliveryprocess_raquo">&raquo;</div>

                <div className="deliveryprocess_phase">
                    <div>결제완료</div>
                    <div>판매자가 주문정보를 확인하기 전 입니다</div>
                </div>

                <div className="deliveryprocess_raquo">&raquo;</div>

                <div className="deliveryprocess_phase">
                    <div>배송준비중</div>
                    <div>판매자가 주문을 확인하고 물품 배송을 준비중 입니다</div>
                </div>

                <div className="deliveryprocess_raquo">&raquo;</div>

                <div className="deliveryprocess_phase">
                    <div>배송중</div>
                    <div>물품이 발송되어 고객님께 배송중입니다</div>
                </div>

                <div className="deliveryprocess_raquo">&raquo;</div>

                <div className="deliveryprocess_phase">
                    <div>배송완료</div>
                    <div>상품수령 후 구매확정을 선택하시면 거래가 종료됩니다</div>
                </div>
            </div>

            <div className="orderlist_cautionbox">
                <div className="orderlist_cautionbox_title">주문/배송 유의사항</div>
                <div className="orderlist_cautionbox_detail">◆ &nbsp;&nbsp;택배 배송일정은 기본배송지 기준으로 예상일이 노출됩니다.</div>
                <div className="orderlist_cautionbox_detail">◆ &nbsp;&nbsp;상품별 배송일정이 서로 다를 시, 가장 늦은 일정의 상품 기준으로 모두 함께 배송됩니다.</div>
                <div className="orderlist_cautionbox_detail">◆ &nbsp;&nbsp;배송지 수정시 예상일이 변경 될 수 있으며, 주문서에서 배송일정을 꼭 확인하시기 바랍니다.</div>
                <div className="orderlist_cautionbox_detail">◆ &nbsp;&nbsp;배송완료 후 구매확정을 하지 않은 경우에는 배송이 완료된 일로부터 7일 경과 후, 8일째 자동으로 구매확정 됩니다.</div>
                <div className="orderlist_cautionbox_detail">◆ &nbsp;&nbsp;화물/퀵배송 등 배송완료 확인이 불가한 경우에는 판매자가 상품을 발송 처리한 일로부터 28일 경과 후, 29일째 자동으로 구매확정 됩니다.
                </div>
                <div className="orderlist_cautionbox_detail">◆ &nbsp;&nbsp;e쿠폰, 모바일상품권 등 SMS로 발송되는 상품은 구매후 "배송완료" 상태이며, 오프라인 매장에서 서비스 이용 후 자동으로 구매확정 됩니다.
                </div>
                <div className="orderlist_cautionbox_detail">◆ &nbsp;&nbsp;OK여우 카드번호가 오등록 되는 경우 카드번호가 자동삭제되며, 여우 포인트로 적립이 이루어집니다.</div>
            </div>
        </>
    );
}

export default OrderListDelProCau;