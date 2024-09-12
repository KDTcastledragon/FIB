import axios from "axios";
import { useEffect, useState } from "react";
import './UserCoupon.css';

function UserCoupon() {
    const [id, setId] = useState(JSON.parse(sessionStorage.user).id);
    const [couponList, setCouponList] = useState([]);

    const loadCouponList = () => {
        axios({
            url: "/user/userCouponList",
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            data: {
                id: id
            }
        }).then((res) => {
            setCouponList(res.data);
        }).catch(() => {
            alert('쿠폰 데이터 없음');
        });
    }

    useEffect(() => {
        loadCouponList();
    }, [id]);

    return (
        <div className='UserCoupon'>
            <div className='user_info_main_text d-flex'>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi-person-circle" viewBox="0 0 16 16">
                        <path d="M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5V6a.5.5 0 0 1-.5.5 1.5 1.5 0 0 0 0 3 .5.5 0 0 1 .5.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 11.5V10a.5.5 0 0 1 .5-.5 1.5 1.5 0 1 0 0-3A.5.5 0 0 1 0 6zM1.5 4a.5.5 0 0 0-.5.5v1.05a2.5 2.5 0 0 1 0 4.9v1.05a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-1.05a2.5 2.5 0 0 1 0-4.9V4.5a.5.5 0 0 0-.5-.5z" />
                    </svg>
                </div>
                <div>
                    <h1>쿠폰</h1>
                </div>
            </div>
            <div className="couponList_container">
                <table className="user_coupon_table">
                    <thead>
                        <tr className="user_coupon_column">
                            <td></td>
                            <td></td>
                            <td>쿠폰명</td>
                            <td>할인율</td>
                            <td>최대할인금액</td>
                            <td>유효기간</td>
                        </tr>
                    </thead>
                    <tbody>
                        {couponList.map((couponData, index) => (
                            <tr key={index} className="user_coupon_column user_coupon_column_item">
                                <td>{index + 1}</td>
                                <td>
                                    <img src={`../img/${couponData.image}`} alt="coupon_image" />
                                </td>
                                <td>{couponData.title}</td>
                                <td>{couponData.discount_rate} %</td>
                                <td>{couponData.max} 원</td>
                                <td>{couponData.end}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserCoupon;