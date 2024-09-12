import './Footer_menu.css'
import { Routes, Route, Link } from 'react-router-dom';



function Footer_menu() {
    return (
        <div className="footer_menu">
            <ul>
                <li>
                    <Link to='/CompanyIntroduce'>회사소개</Link>
                </li>
                <li>
                    <Link to='/TermsAndConditions'>이용약관</Link>
                </li>
                <li>
                    <Link to='/PersonalInformationPolicyInfo'>개인정보처리방침</Link>
                </li>
                <li>
                    <Link to='/YouthPolicyInfo'>청소년 보호정책</Link>
                </li>
                <li>
                    <Link to='/PartnershipMarketing'>제휴 마케팅 안내</Link>
                </li>
                <li>
                    <Link to='/Advertisement'>광고 안내</Link>
                </li>
            </ul>
        </div>
    )
}

export default Footer_menu;