import './UserInfo.css';
import SideButton from '../SideButton';
import { useState } from 'react';
import UserUpdate from './UserUpdate';
import UserDelete from './UserDelete';
import UserAddress from './UserAddress';
import UserPasswordUpdate from './UserPasswordUpdate';

function UserInfo() {
    const [selectedTab, setSelectedTab] = useState("userInfo_update");

    const userInfo_update = () => {
        setSelectedTab('userInfo_update');
    }

    const userAddress = () => {
        setSelectedTab('userAddress');
    }

    const userPassword_update = () => {
        setSelectedTab('userPassword_update');
    }

    const userDelete = () => {
        setSelectedTab('userDelete');
    }

    const renderComponent = () => {
        switch (selectedTab) {
            case 'userInfo_update':
                return <UserUpdate />;
            case 'userAddress':
                return <UserAddress />;
            case 'userPassword_update':
                return <UserPasswordUpdate />;
            case 'userDelete':
                return <UserDelete />;
            default:
                return null;
        }
    }

    return (
        <div className='UserInfo'>
            <div className='user_info_main_text d-flex'>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
                        className="bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path fillRule="evenodd"
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                    </svg>
                </div>
                <div>
                    <h1>회원정보 관리</h1>
                </div>
            </div>
            <div className='userInfo_select_container'>
                <ul className='userInfo_select d-flex'>
                    <li
                        className={`userInfo_update ${selectedTab === "userInfo_update" ? "selected" : ""
                            }`}
                        onClick={userInfo_update}
                    >
                        회원정보 수정
                    </li>
                    <li
                        className={`userAddress ${selectedTab === "userAddress" ? "selected" : ""
                            }`}
                        onClick={userAddress}
                    >
                        배송지 관리
                    </li>
                    <li
                        className={`userPassword_update ${selectedTab === "userPassword_update" ? "selected" : ""
                            }`}
                        onClick={userPassword_update}
                    >
                        비밀번호 변경
                    </li>
                    <li
                        className={`userDelete ${selectedTab === "userDelete" ? "selected" : ""
                            }`}
                        onClick={userDelete}
                    >
                        회원 탈퇴
                    </li>
                </ul>
            </div>
            <div id="userInfo_container">
                {renderComponent()}
            </div>
            <SideButton />
        </div >
    );
}

export default UserInfo;