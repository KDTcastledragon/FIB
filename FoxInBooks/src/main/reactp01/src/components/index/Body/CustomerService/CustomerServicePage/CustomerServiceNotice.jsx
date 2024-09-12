import React, { useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import './CustomerServiceNotice.css';
import CustomerServiceNoticeContent from './CustomerServiceNoticeContent';
import CustomerServiceNoticeDetail from './CustomerServiceNoticeDetail';

function CustomerServiceNotice() {

    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        // 검색어가 비어있지 않은 경우에만 처리
        if (search.trim() !== '') {
            navigate(`/CustomerServiceCategory/CustomerServiceNotice?search=${encodeURIComponent(search)}`);
        }
    }

    return (
        <div className="customer_service_notice1">
            <div className="notice_container">
                <h2 className="notice_title">공 지 사 항</h2>
                <div className='notice_list_category'>
                    <Link to="/CustomerServiceCategory/CustomerServiceNotice" className='notice_list' onClick={() => setSearch('')}>목록</Link>
                    <span className='notice_list_search_box'>
                        <input
                            type="text"
                            placeholder="검색어를 입력하세요"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') { handleSearch(); } }}
                        />
                        <span className='notice_list_search' onClick={handleSearch} >
                            검색
                            <img className="search_img"
                                src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png"
                                alt="검색하기"
                            />
                        </span>
                    </span>

                </div>
                <Routes>
                    <Route path='/' element={<CustomerServiceNoticeContent search={search} />}></Route>
                    <Route path='/CustomerServiceNoticeDetail/:notice_code/*' element={<CustomerServiceNoticeDetail />}></Route>
                </Routes>
            </div>
        </div>
    );
}

export default CustomerServiceNotice;