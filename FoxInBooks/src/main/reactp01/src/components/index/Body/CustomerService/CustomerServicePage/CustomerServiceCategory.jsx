// import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './CustomerServiceCategory.css';
import CustomerServiceFaq from './CustomerServiceFaq';
import CustomerServiceMailInquires from './CustomerServiceMailInquires';
import CustomerServiceNotice from './CustomerServiceNotice';



function CustomerServiceCategory() {
    return (
        <div className="customer_service_category">
            <h2>고 객 센 터</h2>
            <div className="customer_service_notice-faq-mail">
                <button className='btn_notice'>
                    <Link to='/CustomerServiceCategory/CustomerServiceNotice' className='customer_service_notice'>공지사항</Link>
                </button>
                <button className='btn_faq'>
                    <Link to='/CustomerServiceCategory/CustomerServiceFaq' className='customer_service_faq'>FAQ</Link>
                </button>
                <button className='btn_mail'>
                    <Link to='/CustomerServiceCategory/CustomerServiceMailInquires/CustomerServiceMailInquiresMyList' className='customer_service_mail'>1:1 문의</Link>
                </button>
            </div>
            <Routes>
                <Route path='/CustomerServiceNotice/*' element={<CustomerServiceNotice />}></Route>
                <Route path='/CustomerServiceFaq/*' element={<CustomerServiceFaq />}></Route>
                <Route path='/CustomerServiceMailInquires/*' element={<CustomerServiceMailInquires />}></Route>
                {/* <Route path='/CustomerServiceNoticeContent/:id' element={<CustomerServiceNoticeContent />}></Route> */}
            </Routes>
        </div>
    );
}

export default CustomerServiceCategory;
