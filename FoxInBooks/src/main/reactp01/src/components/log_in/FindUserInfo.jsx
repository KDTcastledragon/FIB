import { Link } from "react-router-dom";
import FindId from "./FindId";
import FindPassword from "./FindPassword";
import './FindUserInfo.css';
import { useState } from "react";
import { TbAlertSquare } from "react-icons/tb";

function FindUserInfo() {
    const [selectedTab, setSelectedTab] = useState("findId");

    const findId = () => {
        setSelectedTab("findId");
    }

    const findPassword = () => {
        setSelectedTab("findPassword");
    }

    return (
        <div className="FindUserInfo d-flex">
            <div className="findUserInfo_logo_container d-flex">
                <Link to={'/'} className="findUserInfo_Link">
                    <img src="img/fox_logo.png" alt="findUserInfo_logo" className="find_userInfo_logo" />
                </Link>
                <span><h1>회원정보 조회</h1></span>
            </div>
            <div className="findUserInfo_sub_text d-flex"><TbAlertSquare className="findUserInfo_sub_text_icon" />정보를 정확하게 입력해주세요.</div>
            <div className="findUserInfo_select_container">
                <ul className="findUserInfo_select d-flex">
                    <li
                        className={`findUserInfo_select_id ${selectedTab === "findId" ? "selected" : ""
                            }`}
                        onClick={findId}
                    >
                        아이디 찾기
                    </li>
                    <li
                        className={`findUserInfo_select_password ${selectedTab === "findPassword" ? "selected" : ""
                            }`}
                        onClick={findPassword}
                    >
                        비밀번호 찾기
                    </li>
                </ul>
            </div>
            <div id="findInfo_container">
                {selectedTab === "findId" ? <FindId /> : <FindPassword />}
            </div>
        </div>
    );
}
export default FindUserInfo;