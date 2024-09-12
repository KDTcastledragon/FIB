import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoAlertCircleOutline } from "react-icons/io5";
import './FindPassword.css';
import axios from 'axios';

function FindPassword() {
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [phone_number, setPhone_number] = useState('');

    const [idError, setIdError] = useState('');
    const [nameError, setNameError] = useState('');
    const [birthdayError, setBirthdayError] = useState('');
    const [phone_numberError, setPhone_numberError] = useState('');

    const nameRegex = /^[가-힣a-zA-Z]*$/;
    const phone_numberRegex = /^010\d{7,8}$/;
    const birthdayRegex = /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/;
    // => 19나 20으로 시작하는 연도 + 2자리 월(01 ~ 12) + 2자리 일 (01 ~ 31)

    const validateId = () => {
        if (!id.includes('@')) {
            setIdError("유효한 아이디가 아닙니다.");
        } else {
            setIdError('');
        }
    }

    const validateName = () => {
        if (name.length < 2 || !nameRegex.test(name)) {
            setNameError("유효한 이름이 아닙니다.");
        } else {
            setNameError('');
        }
    }

    // ** 생년월일 현재 날짜보다 과거만 가능하도록
    const currentDate = new Date();
    const inputDate = new Date(
        parseInt(birthday.substring(0, 4)),
        parseInt(birthday.substring(4, 6)) - 1, // 월은 0부터 시작하므로 -1
        parseInt(birthday.substring(6, 8))
    );
    const validateBirthday = () => {
        if (!birthdayRegex.test(birthday) || (inputDate > currentDate)) {
            setBirthdayError("올바른 생년월일 형식이 아닙니다.");
        } else {
            setBirthdayError('');
        }
    }

    const validatePhone_number = () => {
        if (!phone_numberRegex.test(phone_number)) {
            setPhone_numberError("010으로 시작하는 숫자만 입력해주세요.");
        } else {
            setPhone_numberError('');
        }
    }

    // ================================
    // ** 버튼 활성화
    const [findPasswordButton, setFindPasswordButton] = useState(true);

    function changeButton() {
        name.length >= 2 && nameRegex.test(name) && birthdayRegex.test(birthday) &&
            phone_numberRegex.test(phone_number) && id.includes('@') &&
            inputDate < currentDate
            ? setFindPasswordButton(false) : setFindPasswordButton(true);
    }

    // ==================================
    // ** 취소 버튼 클릭 시 로그인 페이지로
    function pageToLogin() {
        navigate('/LogIn');
    }

    // ===================================
    // ** 데이터 전송

    const findPassword = () => {
        axios({
            url: "/user/findPassword",
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            data: {
                id: id,
                name: name,
                birthday: birthday,
                phone_number: phone_number
            }
        }).then((res) => {
            alert(res.data);
            navigate('/LogIn');
        }).catch(() => {
            alert('입력하신 정보가 일치하지 않습니다.');
        });
    }

    // =================================
    // ** 엔터 키 설정
    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            if (e.target.id === 'find_pw_id') {
                document.getElementById('find_pw_name').focus();
            } else if (e.target.id === 'find_pw_name') {
                document.getElementById('find_pw_birthday').focus();
            } else if (e.target.id === 'find_pw_birthday') {
                document.getElementById('find_pw_phone_number').focus();
            } else if (e.target.id === 'find_pw_phone_number') {
                findPassword(e);
            }
        }
    }

    return (
        <div className='FindPassword'>
            <form className='find_password_form'>
                <fieldset className='find_password_fieldset d-flex'>
                    <div className='find_password_input_container'>
                        <div>아이디</div>
                        <input type="text" placeholder='아이디(이메일)를 입력해 주세요.'
                            name='name' autoComplete='off' id='find_pw_id'
                            onKeyUp={changeButton}
                            onKeyDown={handleEnterKey}
                            onChange={(e) => {
                                setId(e.target.value);
                                setIdError('');
                            }}
                            onBlur={validateId} />
                        {idError && <div className="findPassword_error-message d-flex"><IoAlertCircleOutline />&nbsp;{idError}</div>}
                    </div>
                    <div className='find_password_input_container'>
                        <div>이름</div>
                        <input type="text" placeholder='이름을 입력해 주세요.'
                            name='name' autoComplete='off' id='find_pw_name'
                            onKeyUp={changeButton}
                            onKeyDown={handleEnterKey}
                            onChange={(e) => {
                                setName(e.target.value);
                                setNameError('');
                            }}
                            onBlur={validateName} />
                        {nameError && <div className="findPassword_error-message d-flex"><IoAlertCircleOutline />&nbsp;{nameError}</div>}
                    </div>
                    <div className='find_password_input_container'>
                        <div>생년월일</div>
                        <input type="text" placeholder='생년월일 8자리를 입력해 주세요.'
                            name='birthday' autoComplete='off' id='find_pw_birthday'
                            onKeyUp={changeButton}
                            onKeyDown={handleEnterKey}
                            onChange={(e) => {
                                setBirthday(e.target.value);
                                setBirthdayError('');
                            }}
                            onBlur={validateBirthday} />
                        {birthdayError && <div className="findPassword_error-message d-flex"><IoAlertCircleOutline />&nbsp;{birthdayError}</div>}
                    </div>
                    <div className='find_password_input_container'>
                        <div>전화번호</div>
                        <input type="text" placeholder='(-)없이 숫자만 입력해주세요.'
                            name='phone_number' autoComplete='off' id='find_pw_phone_number'
                            onKeyUp={changeButton}
                            onKeyDown={handleEnterKey}
                            onChange={(e) => {
                                setPhone_number(e.target.value);
                                setPhone_numberError('');
                            }}
                            onBlur={validatePhone_number} />
                        {phone_numberError && <div className="findPassword_error-message d-flex"><IoAlertCircleOutline />&nbsp;{phone_numberError}</div>}
                    </div>
                    <div className='find_password_button_container'>
                        <button className='find_password_submit_btn' type='button'
                            disabled={findPasswordButton} onClick={findPassword}>확인</button>
                        <button onClick={pageToLogin}>취소</button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}

export default FindPassword; 