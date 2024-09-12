import './AdminPage.css'
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, } from 'react-router-dom';
import axios from 'axios';

import Notice from './Notice';
import Faq from './Faq';
import Inquiry from './Inquiry';

function AdminPage() {
    const [coupon, setCoupon] = useState([]);

    useEffect(() => {
        // Axios를 사용하여 서버에 데이터를 요청합니다.
        axios.get('/test/couponList')  // '/api/admin/data'는 서버에서 데이터를 제공하는 엔드포인트로 수정해야 합니다.
            .then(response => {
                setCoupon(response.data);
                console.log('서버에서 받은 데이터:', response.data);
            })
            .catch(error => {
                console.error('서버 요청 실패:', error);
            });
    }, []);  // useEffect의 두 번째 매개변수로 빈 배열을 전달하여 한 번만 실행되도록 합니다.

    return (
        <div className="admin_page">
            <div>
                {/* 왼쪽 세로로 화면 20% 정도 고정 */}
                <ul>
                    <li><Link to="/Admin/Notice" className='admin_notice'>공지사항</Link></li>
                    <li><Link to="/Admin/Faq" className='admin_faq'>FAQ</Link></li>
                    <li><Link to="/Admin/Inquiry" className='admin_inquiry'>1:1문의</Link></li>
                </ul>
            </div>
            <div>
                {/* 중앙과 우측으로 70% 정도 영역에 관리페이지가 변하게 함 */}
                <Routes>
                    <Route path="/Notice" element={<Notice />} />
                    <Route path="/Faq" element={<Faq />} />
                    <Route path="/Inquiry" element={<Inquiry />} />
                </Routes>
            </div>
        </div>
    )
}

export default AdminPage;