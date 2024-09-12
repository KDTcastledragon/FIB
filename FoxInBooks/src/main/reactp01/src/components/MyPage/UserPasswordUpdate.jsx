import axios from 'axios';
import { useRef, useState } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import './UserPasswordUpdate.css';
import { useNavigate } from 'react-router-dom';
import { GoEye, GoEyeClosed } from "react-icons/go";

function UserPasswordUpdate() {
    const navigate = useNavigate();

    const [id, setId] = useState(JSON.parse(sessionStorage.user).id);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordCheck, setNewPasswordCheck] = useState('');

    const [passwordError, setPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [passwordCheckError, setPasswordCheckError] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showNewPasswordCheck, setShowNewPasswordCheck] = useState(false);

    const passwordRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const languageRegex = /[ㄱ-ㅎ가-힣]/;

    const validatePassword = () => {
        if (password === '' || password === null) {
            setPasswordError(<span className='error-message'>비밀번호를 입력해주세요</span>);
        } else if (languageRegex.test(password)) {
            setPasswordError(<span className='error-message'>비밀번호에는 한글이 포함될 수 없습니다.</span>);
        } else {
            setPasswordError(<span className='passwordUpdate_check_circle'><FaCheckCircle /></span>);
        }
    }

    const validateNewPassword = () => {
        if (password == newPassword) {
            setNewPasswordError(<span className='error-message'>기존 비밀번호와 같습니다.</span>);
        } else if (languageRegex.test(newPassword)) {
            setNewPasswordError(<span className='error-message'>비밀번호에는 한글이 포함될 수 없습니다.</span>);
        } else if (!passwordRegex.test(newPassword)) {
            setNewPasswordError(<span className='error-message'>특수문자가 반드시 하나 이상 들어가야 합니다.</span>);
        } else if (newPassword.length < 7 || newPassword.length > 15) {
            setNewPasswordError(<span className='error-message'>7자 이상, 15자 이하여야 합니다</span>);
        } else {
            setNewPasswordError(<span className='passwordUpdate_check_circle'><FaCheckCircle /></span>);
        }
    }

    const validateNewPasswordCheck = () => {
        if (newPassword !== newPasswordCheck) {
            setPasswordCheckError(<span className='error-message'>비밀번호가 다릅니다.</span>);
        } else if (languageRegex.test(newPasswordCheck)) {
            setPasswordCheckError(<span className='error-message'>비밀번호에는 한글이 포함될 수 없습니다.</span>);
        } else if (newPasswordCheck === '' || newPasswordCheck === null) {
            setPasswordCheckError('');
        } else {
            setPasswordCheckError(<span className='passwordUpdate_check_circle'><FaCheckCircle /></span>);
        }
    }

    // =============================
    // ** 버튼 활성화

    const [changePasswordButton, setChangePasswordButton] = useState(true);

    function changeButton() {
        const newPasswordValid = !(newPassword.length < 7 || newPassword.length > 15) && passwordRegex.test(newPassword);
        const passwordCheckValid = newPassword == newPasswordCheck;
        const passwordVaild = !(password === '' || password === null);

        passwordVaild && newPasswordValid && passwordCheckValid
            ? setChangePasswordButton(false) : setChangePasswordButton(true);
    }

    // ==============================
    // ** 비밀번호 오류 시 포커스 이동 및 초기화
    const passwordRef = useRef(null);

    // =============================
    // ** 키 값 설정
    const handleKey = (e) => {
        switch (e.key) {
            case 'Enter':
                e.preventDefault();
                if (e.target.id === 'password') {
                    document.getElementById('newPassword').focus();
                } else if (e.target.id === 'newPassword') {
                    document.getElementById('newPasswordCheck').focus();
                }
                break;
            case 'Tab':
                e.preventDefault();
                if (e.target.id === 'password') {
                    document.getElementById('newPassword').focus();
                } else if (e.target.id === 'newPassword') {
                    document.getElementById('newPasswordCheck').focus();
                }
                break;
            default:
                break;
        }
    };

    // ==============================
    // ** 데이터 전송
    const changePasswordSubmit = () => {
        axios({
            url: "/user/passwordUpdate",
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            data: {
                id: id,
                password: password,
                newPassword: newPassword,
                newPasswordCheck: newPasswordCheck
            }
        }).then((res) => {
            alert(res.data);
            if (res.status == 200 || res.status == 304) {
                navigate('/MyPage');
            }
        }).catch((error) => {
            alert(error.response.data);
            passwordRef.current.focus();
            passwordRef.current.value = '';

            setChangePasswordButton(true);
            setPassword(null);
        });
    }

    return (
        <div className="UserPasswordUpdate">
            <div className="index_text"><h1>비밀번호 변경</h1></div>
            <form className='passwordUpdate_input_container'>
                <div>
                    <span className='passwordUpdate_option'>비밀번호</span>
                    :<input type={showPassword ? 'text' : 'password'}
                        placeholder='기존의 비밀번호를 입력해주세요'
                        ref={passwordRef} autoComplete='off' id='password'
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordError('');
                        }}
                        onBlur={() => {
                            validatePassword();
                            validateNewPassword();
                        }}
                        onKeyUp={changeButton}
                        onKeyDown={handleKey} />
                    <button onClick={(e) => {
                        (e).preventDefault();
                        setShowPassword(!showPassword);
                    }}>
                        {!showPassword ? <GoEyeClosed className='change_password_icon' /> : <GoEye className='change_password_icon' />}
                    </button>
                    {passwordError}
                </div>
                <div>
                    <span className='passwordUpdate_option'>새 비밀번호</span>
                    :<input type={showNewPassword ? 'text' : 'password'}
                        placeholder='변경할 비밀번호를 입력해주세요'
                        autoComplete='off' id='newPassword'
                        onChange={(e) => {
                            setNewPassword(e.target.value);
                            setNewPasswordError('');
                        }}
                        onBlur={() => {
                            validatePassword();
                            validateNewPassword();
                            validateNewPasswordCheck();
                        }}
                        onKeyUp={changeButton}
                        onKeyDown={handleKey} />
                    <button onClick={(e) => {
                        (e).preventDefault();
                        setShowNewPassword(!showNewPassword);
                    }}>
                        {!showNewPassword ? <GoEyeClosed className='change_password_icon' /> : <GoEye className='change_password_icon' />}
                    </button>
                    {newPasswordError}
                </div>
                <div>
                    <span className='passwordUpdate_option'>새 비밀번호 확인</span>
                    :<input type={showNewPasswordCheck ? 'text' : 'password'}
                        id='newPasswordCheck' autoComplete='off'
                        onChange={(e) => {
                            setNewPasswordCheck(e.target.value);
                            setPasswordCheckError('');
                        }}
                        onBlur={validateNewPasswordCheck}
                        onKeyUp={changeButton}
                        onKeyDown={handleKey} />
                    <button onClick={(e) => {
                        (e).preventDefault();
                        setShowNewPasswordCheck(!showNewPasswordCheck);
                    }}>
                        {!showNewPasswordCheck ? <GoEyeClosed className='change_password_icon' /> : <GoEye className='change_password_icon' />}
                    </button>
                    {passwordCheckError}
                </div>
            </form>
            <div className='passwordUpdate_button_container'>
                <button disabled={changePasswordButton}
                    onClick={changePasswordSubmit}>변경하기</button>
            </div>
        </div>
    );
}

export default UserPasswordUpdate;