import './CartCautionBox.css';

function CartCautionBox() {
    return (
        <>
            <div className="basket_cautionbox">
                <div className="basket_cautionbox-title">주문/배송 유의사항</div>
                <div className="basket_cau-detail"> ● 택배 배송일정은 기본배송지 기준으로 예상일이 노출됩니다.</div>
                <div className="basket_cau-detail"> ● 상품별 배송일정이 서로 다를시 가장 늦은 일정의 상품 기준으로 모두 함께 배송됩니다.</div>
                <div className="basket_cau-detail"> ● 배송지 수정시 예상일이 변경 될 수 있으며, 주문서에서 배송일정을 꼭 확인하시기 바랍니다.</div>
                <div className="basket_cau-detail"> ● 바로드림의 수령가능일은 나의 기본매장 기준으로 노출됩니다.</div>
                <div className="basket_cau-detail"> ● 쿠폰, 통합포인트, 교환권 사용시 적립예정포인트가 변동 될 수 있습니다.</div>
            </div>

        </>
    );
}

export default CartCautionBox;