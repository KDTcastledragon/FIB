import './Payment_server.css';
import { Link } from 'react-router-dom';

function Payment_server() {
    return (
        <div className='Payment_server'>
            <div className="payment_com">
                <div className="payment_com_text">결제가 완료되었습니다.</div>
                <div className="payment_com_home">
                    <Link to='/'>홈으로 가기</Link>
                </div>
                <div className="payment_com_order">
                    <Link to='/BasketPage' onClick={(e) => e.preventDefault()}>주문내역 보기</Link>
                </div>
            </div>
        </div>
    );
}

export default Payment_server;