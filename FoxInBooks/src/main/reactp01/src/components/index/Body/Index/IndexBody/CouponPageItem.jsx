import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './CouponPageItem.css';

function CouponPageItem() {
    const [couponList, setCouponList] = useState([]);
    const [resultMessage, setResultMessage] = useState('');
    const navigate = useNavigate();

    const loginInfo = JSON.parse(sessionStorage.getItem('user'));
    const userId = loginInfo ? loginInfo.id : null;

    useEffect(() => {
        axios
            .get('/test/couponList')
            .then((response) => {
                setCouponList(response.data);
                console.log(`서버연결 성공 =>`, response.data);
            })
            .catch((err) => {
                alert(`서버연결 실패 => ${err.message}`);
            });
    }, []);

    const renderCouponCategory = (category, title) => {
        const filteredCoupons = couponList.filter(coupon => coupon.category === category);

        if (filteredCoupons.length === 0) {
            return null;
        }

        return (
            <div className="coupon_category">
                <h3 className='coupon_category_title'>{title}</h3>
                {filteredCoupons.map((coupon, index) => (
                    <Coupon
                        key={index}
                        couponCode={coupon.coupon_code}
                        title={coupon.title}
                        discount_rate={coupon.discount_rate}
                        image={coupon.image}
                        start={coupon.start}
                        end={coupon.end}
                        moddate={coupon.moddate}
                        regdate={coupon.regdate}
                    />
                ))}
            </div>
        );
    };

    const Coupon = ({ couponCode, title, discount_rate, image, start, end, moddate, regdate }) => {
        // const [PopupOpen, setPopupOpen] = useState(false);

        const handleButtonClick = () => {
            // setPopupOpen(true);
            const data = {
                coupon_code: couponCode,
                id: userId
            };

            axios.post('/test/userCouponGet', data)
                .then(response => {
                    console.log('유저 쿠폰 발급 요청 확인!' + response.data);
                    setResultMessage(response.data);

                    // 서버로부터 받은 결과를 알림창으로 띄워준다.
                    // 쿠폰발급 성공 or 이미 발급받은 쿠폰
                    alert(response.data);
                    // 일정 시간 후에 로그인 페이지로 이동
                    if (data.id == null) {
                        setTimeout(() => {
                            window.location.href = '/Login';
                        }, 1000); // 1000 밀리초 = 1초
                    }
                })
                .catch(error => {
                    console.error('유저 쿠폰 발급 요청 실패:', error);
                    alert(error.response.data);
                });
        };

        // const handleClosePopup = () => {
        //     console.log('Closing popup');
        //     setPopupOpen(false);
        // };

        return (
            <div className="coupon_item">
                <div className="coupon_box">
                    <h4 className="coupon_box_title">{title}</h4>
                    <img className="coupon_box_image" src={`../img/${image}`} alt={title} />
                    <br />
                    <button className="coupon_get_button" onClick={handleButtonClick}>쿠폰받기</button>
                    {/* {PopupOpen && (
                    <div className="popup" onClick={handleClosePopup}>
                    <div className="popup_content">
                    <span className="close">{resultMessage}</span>
                    </div>
                    </div>
                )} */}
                </div>
            </div>
        );
    };

    return (
        <div className="coupon_list_container">
            <span className="coupon_page_title">쿠폰</span>
            <hr className="coupon_page_title_hr" />
            <div className="coupon_page_container">
                {renderCouponCategory('첫구매', '신규회원/첫구매/웰컴백 쿠폰')}
                {renderCouponCategory('월간', '매월 드리는 쿠폰!')}
                {renderCouponCategory('이벤트', '이벤트 쿠폰')}
                {renderCouponCategory('생일', '생일 쿠폰')}
            </div>
        </div>
    );
}

export default CouponPageItem;

// import './CouponPageItem.css'
// import { useState, useEffect } from "react";
// import axios from 'axios';

// function CouponPageItem() {
//     const [couponList, setCouponList] = useState([]);

//     useEffect(() => {
//         axios
//             .get('/test/couponList')
//             .then((response) => {
//                 setCouponList(response.data);

//                 console.log(`서버연결 성공 =>`, response.data);
//             }).catch((err) => {
//                 alert(`서버연결 실패 => ${err.message}`);
//             });
//     }, []);



//     const Coupon = ({ couponCode, title, discount_rate, image, start, end, moddate, regdate }) => {
//         const [isPopupOpen, setPopupOpen] = useState(false);

//         const handleButtonClick = () => {

//             const loginInfo = JSON.parse(sessionStorage.getItem('user'));
//             const userId = loginInfo ? loginInfo.id : null;

//             console.log('쿠폰코드확인' + couponCode);
//             console.log('Opening popup');
//             setPopupOpen(true);

//             const data = {
//                 coupon_code: couponCode,
//                 id: userId
//             };

//             // 쿠폰 받기 성공 시 서버로 요청 보내기
//             axios.post('/test/userCouponGet', data, {
//             })
//                 .then(response => {
//                     console.log('유저쿠폰 받기 성공!' + response.data);
//                 })
//                 .catch(error => {
//                     console.error('유저쿠폰 받기 실패:', error);
//                 });
//         };

//         const handleClosePopup = () => {
//             console.log('Closing popup');
//             setPopupOpen(false);
//         };
//         return (
//             <div className='coupon_box'>
//                 <div className='coupon_box_title'>{title}</div>
//                 <img className='coupon_box_image' src={image} />
//                 <br />
//                 <button onClick={handleButtonClick}>받기</button>

//                 {isPopupOpen && (
//                     <div className="popup" onClick={handleClosePopup}>
//                         {/* 팝업 컨텐츠 */}
//                         <div className="popup_content">
//                             <span className="close">쿠폰 받기 성공!</span>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         )
//     }

//     const firstBuyCoupon = couponList.filter(coupon => coupon.category === '첫구매');
//     const monthCoupon = couponList.filter(coupon => coupon.category === '월간');
//     const birthCoupon = couponList.filter(coupon => coupon.category === '생일');
//     const seasonCoupon = couponList.filter(coupon => coupon.category === '시즌');
//     const eventCoupon = couponList.filter(coupon => coupon.category === '이벤트');

//     return (
//         <div className="coupon_list_container">
//             <div className="coupon_item">
//                 <span className="coupon_page_title">쿠폰</span>
//             </div>
//             <hr className="coupon_page_title_hr" />
//             <div className="coupon_page_container">
//                 <div className='first_buy_coupon'>
//                     신규회원/첫구매/웰컴백 쿠폰
//                     <br />
//                     {firstBuyCoupon.map((firstBuyCoupon, index) => (
//                         <Coupon
//                             key={index}
//                             couponCode={firstBuyCoupon.coupon_code}
//                             title={firstBuyCoupon.title}
//                             discount_rate={firstBuyCoupon.discount_rate}
//                             image={firstBuyCoupon.image}
//                             start={firstBuyCoupon.start}
//                             end={firstBuyCoupon.end}
//                             moddate={firstBuyCoupon.moddate}
//                             regdate={firstBuyCoupon.regdate}
//                         />
//                     ))}
//                 </div>
//                 <div className='month_coupon'>
//                     매월 드리는 쿠폰!
//                     <br />
//                     {monthCoupon.map((monthCoupon, index) => (
//                         <Coupon
//                             key={index}
//                             couponCode={monthCoupon.coupon_code}
//                             title={monthCoupon.title}
//                             discount_rate={monthCoupon.discount_rate}
//                             image={monthCoupon.image}
//                             start={monthCoupon.start}
//                             end={monthCoupon.end}
//                             moddate={monthCoupon.moddate}
//                             regdate={monthCoupon.regdate}
//                         />
//                     ))}
//                 </div>
//                 <div className='birth_coupon'>
//                     생일 축하 쿠폰!
//                     <br />
//                     {birthCoupon.map((birthCoupon, index) => (
//                         <Coupon
//                             key={index}
//                             couponCode={birthCoupon.coupon_code}
//                             title={birthCoupon.title}
//                             discount_rate={birthCoupon.discount_rate}
//                             image={birthCoupon.image}
//                             start={birthCoupon.start}
//                             end={birthCoupon.end}
//                             moddate={birthCoupon.moddate}
//                             regdate={birthCoupon.regdate}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </div >
//     );
// }

// export default CouponPageItem;