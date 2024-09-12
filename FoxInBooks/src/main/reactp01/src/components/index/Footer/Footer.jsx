import './Footer.css';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import Modal from 'react-modal'
import FooterMenuListItem from './FooterMenuListItem';
import { AiOutlineCopyrightCircle } from "react-icons/ai";


function Footer() {
    const location = useLocation();

    if (location.pathname === '/LogIn' || location.pathname === '/JoinMembership' || location.pathname === '/FindUserInfo') {
        return (
            <div className='footer_container_2'>
                <div className='footer_2_text_container d-flex'>
                    <AiOutlineCopyrightCircle />
                    <span className='footer_2_text'>Fox In Books</span>
                </div>
            </div>
        );
    } else {
        return (
            <div className='footer_container'>
                <div className='footer'>
                    <div className="footer_menu">
                        <ul>
                            <FooterMenuListItem />
                        </ul>
                        <h3>여우</h3>
                        <div className="footer_info_list">
                            <address className="company_info">
                                <div>
                                    <span>대표이사 : 김해림</span>
                                    <span>고객정보보호 책임자 : 이성룡</span>
                                    <span>사업자 등록 123-45678-90</span>
                                    <span>통신판매업신고 : 분당구</span>
                                </div>
                                <div>
                                    <span>이메일 : FoxFox@FoxFox.com</span>
                                    <span>대표전화 : 02 -1234 - 5678</span>
                                    <span>주소 : 경기도 성남시 분당구 171-5</span>
                                </div>
                            </address>
                        </div>
                    </div>
                    <div className="customer_center">
                        <div className='customer_service'>고객센터 : 1588 - 1588</div>
                        <div className='customer_service_category'>
                            <Link to='/CustomerServiceCategory/CustomerServiceNotice'>
                                <span className='footer_notice'>공지사항</span>
                            </Link>
                            <Link to='/CustomerServiceCategory/CustomerServiceFaq'>
                                <span className='footer_faq'>FAQ</span>
                            </Link>
                            <Link to='/CustomerServiceCategory/CustomerServiceMailInquires'>
                                <span className='footer_inquires'>1:1 문의</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
export default Footer;