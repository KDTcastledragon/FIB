import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoAlertCircleOutline } from "react-icons/io5";
import './LogIn.css';
import axios from 'axios';

function LogIn() {
    const navigate = useNavigate();

    // ** 아이디 저장
    const [rememberID, setRememberID] = useState(false);

    useEffect(() => {
        const saveID = localStorage.getItem('saveID');
        if (saveID != null && saveID != '') {
            setId(saveID);
            setRememberID(true);
        }
    }, []);
    // ==============================================

    // ** 유효성 검사
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const [loginError, setLoginError] = useState('');

    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const languageRegex = /[ㄱ-ㅎ가-힣]/;

    const validateLogin = () => {
        if (id === '') {
            setLoginError('아이디를 입력하세요');
        } else if (password === '') {
            setLoginError('패스워드를 입력하세요');

            // 비밀번호 표시 체크박스를 체크했을 때  (input 의 type 이 text로 변경되었을 때)
        } else if (languageRegex.test(password)) {
            setLoginError('비밀번호에는 한글이 포함될 수 없습니다.');
        } else {
            setLoginError('');
        }
    }

    // ========================================================
    // ** 비밀번호 표시

    const [showPassword, setShowPassword] = useState(false);

    // =========================================================
    // ** 로그인 버튼 활성화
    const [button, setButton] = useState(true);

    function changeButton() {
        id.includes('@') && specialCharacterRegex.test(password) &&
            password.length >= 7 && password.length <= 15 ? setButton(false) : setButton(true);
    }

    // ==========================================================
    // ** 엔터 키 누름
    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            if (e.target.id === 'id') {
                document.getElementById('password').focus();
            } else if (e.target.id === 'password') {
                logInButton();
            }
        }
    }

    // ===========================================================
    // ** 로그인 데이터 전송
    const logInButton = () => {
        if (rememberID) {
            localStorage.setItem('saveID', id);
        } else {
            localStorage.removeItem('saveID');
        }

        axios({
            url: "/user/login",
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            data: {
                id: id,
                password: password
            }
        }).then((res) => {
            sessionStorage.setItem('user', JSON.stringify(res.data));
            sessionStorage.setItem('loginID', res.data.id);
            sessionStorage.setItem('loginName', res.data.name);

            alert("로그인 완료");
            navigate('/');
        }).catch((error) => {
            if (error.response.status == 401) {
                alert('비밀번호가 일치하지 않습니다.');
            } else {
                alert('없는 아이디입니다.');
            }
            window.location.reload();
        });
    }

    // =======================================
    // ** 광고 및 제품 구역
    const coupon = () => {
        alert('로그인 후 이용해주세요');
    }

    return (
        <div className='LogIn'>
            <div className="log_in_logo_container d-flex">
                <Link to={'/'} className="log_in_logo_link">
                    <img src="img/fox_logo.png" alt="findUserInfo_logo" className="find_userInfo_logo" />
                </Link>
                <span><h1>로그인</h1></span>
            </div>
            <form className='log_in_form'>
                <fieldset className="log_in_field d-flex">
                    <div>
                        <div>tjdfyd123!</div>
                        <div>
                            <div>

                                <input id='id' className='log_in_id' name='id' required
                                    value={id} placeholder='ID(이메일)'
                                    onKeyUp={changeButton}
                                    onKeyDown={handleEnterKey}
                                    onChange={(e) => {
                                        setId(e.target.value);
                                        setLoginError('');
                                    }}
                                    onBlur={validateLogin} />
                            </div>
                            <div>
                                <input id='password' name='password' type={showPassword ? 'text' : 'password'}
                                    minLength={7} autoComplete='off' required autoCapitalize='off' className='log_in_pw'
                                    placeholder='Password'
                                    value={password}
                                    onKeyUp={changeButton}
                                    onKeyDown={handleEnterKey}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setLoginError('');
                                    }}
                                    onBlur={validateLogin} />
                                {loginError && <div className="log_in_error_message"><IoAlertCircleOutline />&nbsp;{loginError}</div>}
                            </div>
                        </div>
                        <div>
                            <span className='log_in_checkbox'>
                                <input id='log_in_checkbox_saveId' type='checkbox'
                                    autoCapitalize='off' checked={rememberID} onChange={() => { setRememberID(!rememberID) }} />
                                <label htmlFor='log_in_checkbox_saveId'>아이디 저장</label>
                            </span>
                            <span className='log_in_checkbox'>
                                <input id='log_in_checkbox_password' type='checkbox'
                                    autoCapitalize='off' checked={showPassword} onChange={() => { setShowPassword(!showPassword) }} />
                                <label htmlFor='log_in_checkbox_password'>비밀번호 표시</label>
                            </span>
                        </div>
                        <div>
                            <button id='log_in_button' type="button" disabled={button} onClick={logInButton}>로그인
                            </button>
                        </div>
                        <div className='log_in_find_container'>
                            <span className='log_in_find_id'>
                                <Link to='/FindUserInfo'>아이디/비밀번호 찾기</Link>
                            </span>
                            <span className='log_in_join_membership'>
                                <Link to="/JoinMembership">회원가입</Link>
                            </span>
                        </div>
                    </div>
                    <div>
                        <div className='log_in_ad d-flex'>
                            <Link to="/ItemPage">
                                <img src="./img/log_in_ad_3.jpg" className='log_in_event' alt="#" />
                            </Link>
                            <div className='log_in_product'>
                                <Link onClick={coupon}>
                                    <img src="./img/8peMax4000.png" alt='#' />
                                </Link>
                                <Link onClick={coupon}>
                                    <img src="./img/2000.png" alt='#' />
                                </Link>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div >
    );
}

export default LogIn;