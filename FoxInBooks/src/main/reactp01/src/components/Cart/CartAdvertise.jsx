import './CartAdvertise.css';
import { useState, useEffect } from 'react';

function CartAdvertise() {
    //================================================================================
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(prevVisible => !prevVisible);
        }, 1300); // 500ms 간격으로 깜빡임

        return () => {
            clearInterval(interval);
        };
    }, []); //=========================


    const colors = ['black', 'rgb(44,44,44)', 'rgb(88,88,88)', 'rgb(111,111,111)',
        'rgb(133,133,133)', 'rgb(149,149,149)',
        'rgb(188,188,188)', 'rgb(211,211,211)', 'rgb(233,233,233)', 'rgb(255,255,255)'];

    const [currentColorIndex, setCurrentColorIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentColorIndex(prevIndex => (prevIndex + 1) % colors.length);
        }, 500); // n초 간격으로 색 변화

        return () => {
            clearInterval(interval);
        };
    }, []);
    const currentColor = colors[currentColorIndex];
    //================================================================================

    return (
        <div className='category_minibox_container'>

            <div className="category_minibox_text-color category_minibox_subbox" style={{ color: currentColor }}>
                <div className='category_minibox_subbox'>
                    <div>지금 20,000원 이상 구매 시</div>
                    <div> 배송비 무료!</div>
                </div>
            </div>

            <div className='category_minibox_2'>
                {isVisible ?
                    <div className={`basket_now_buy_10man1`}>
                        <div>100,000원 이상 구매시</div>
                    </div >
                    :
                    <div className={`basket_now_buy_10man2`}>
                        <div>특별한 경품이</div>
                        <div>쏟아진다!</div>
                    </div >}

            </div>


        </div>
    );
}
export default CartAdvertise;