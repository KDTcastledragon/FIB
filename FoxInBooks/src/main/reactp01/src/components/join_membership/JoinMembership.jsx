import './JoinMembership.css';
import SearchAddress from '../SearchAddress';
import SideButton from '../SideButton';
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaAsterisk } from "react-icons/fa";
import axios from 'axios';
import Use from './terms_of_service/Use';
import UseCommunity from './terms_of_service/UseCommunity';
import UsePersonalInfo from './terms_of_service/UsePersonalInfo';
import EMail from './terms_of_service/EMail';
import SMS from './terms_of_service/SMS';

function JoinMembership() {
    const navigate = useNavigate();

    const [emailName, setEmailName] = useState('');
    const [emailDomain, setEmailDomain] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [name, setName] = useState('');
    const [phone_number, setPhone_number] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordCheckError, setPasswordCheckError] = useState('');
    const [nameError, setNameError] = useState('');
    const [phone_numberError, setPhone_numberError] = useState('');

    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordCheckValid, setPasswordCheckValid] = useState(false);
    const [phone_numberValid, setPhone_numberValid] = useState(false);
    const [nameValid, setNameValid] = useState(false);

    const passwordRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const nameRegex = /^[가-힣a-zA-Z]*$/;
    const phoneNumberRegex = /^010\d{7,8}$/;

    const handleEmailDomainChange = (event) => {
        const selectedDomain = event.target.value;
        setEmailDomain(selectedDomain);

        // "직접입력"이 아닌 경우에만 값을 설정
        if (selectedDomain === '직접입력') {
            setEmailDomain('');
        } else {
            setEmailDomain(selectedDomain);
        }
    };

    const validateEmail = () => {
        setEmailValid(false);
        if (!emailDomain.includes('.') || emailName === '') {
            setEmailError('유효한 이메일 형식이 아닙니다.');
        } else {
            setEmailError('아이디 중복을 체크해주세요');
        }
    }
    const validatePassword = () => {
        if (password.length < 7 || password.length > 15) {
            setPasswordError('비밀번호는 7자 이상, 15자 이하여야 합니다.');
            setPasswordValid(false);
        } else if (!passwordRegex.test(password)) {
            setPasswordError('비밀번호에는 특수문자가 하나 이상 포함되어야 합니다.');
            setPasswordValid(false);
        } else {
            setPasswordError('');
            setPasswordValid(true);
        }
    }
    const validatePasswordCheck = () => {
        if (password !== passwordCheck) {
            setPasswordCheckError('비밀번호가 일치하지 않습니다.');
            setPasswordCheckValid(false);
        } else {
            setPasswordCheckError('');
            setPasswordCheckValid(true);
        }
    }
    const validateName = () => {
        if (name.length < 2 || !nameRegex.test(name)) {
            setNameError('유효한 이름이 아닙니다.');
            setNameValid(false);
        } else {
            setNameError('');
            setNameValid(true);
        }
    }
    const validatePhone_number = () => {
        if (!phoneNumberRegex.test(phone_number)) {
            setPhone_numberError('유효한 전화번호 형식이 아닙니다.');
            setPhone_numberValid(false);
        } else {
            setPhone_numberError('');
            setPhone_numberValid(true);
        }
    }

    // ==========================================
    // ** 생년월일 select 생성
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 151 }, (_, index) => currentYear - index);
    const month = Array.from({ length: 12 }, (_, index) => index + 1);
    const day = Array.from({ length: 31 }, (_, index) => index + 1)

    // ** 숫자가 1자리인 경우 앞에 0을 붙임
    const formatDateNumber = (number) => {
        return String(number).padStart(2, '0');
    };

    // ===========================================
    // ** 주소 입력 여부

    const [hideAddressSearch, setHideAddressSearch] = useState(false);
    const [hideAfterAddressInput, setHideAfterAddressInput] = useState(false);

    const handleAfterAddressInputCheckbox = () => {
        setHideAfterAddressInput(!hideAfterAddressInput);

        // 주소 다음에 입력 체크박스 체크 시, 주소 검색 창도 숨겨지도록 함
        if (!hideAfterAddressInput) {
            setHideAddressSearch(true);
        }
    }

    // ============================================
    // ** 이용약관 체크박스 선택

    const [isUseOpen, setUseOpen] = useState(false);
    const [isUseCommunityOpen, setUseCommunityOpen] = useState(false);
    const [isUsePersonalInfoOpen, setUsePersonalInfoOpen] = useState(false);
    const [isEMailOpen, setEMailOpen] = useState(false);
    const [isSMSOpen, setSMSOpen] = useState(false);


    // ** 약관 자세히보기 팝업 
    const openUse = (id) => {
        setUseOpen(true);
    };
    const closeUse = () => {
        setUseOpen(false);
    };

    const openUseCommunity = (id) => {
        setUseCommunityOpen(true);
    };
    const closeUseCommunity = () => {
        setUseCommunityOpen(false);
    };

    const openUsePersonalInfo = (id) => {
        setUsePersonalInfoOpen(true);
    };
    const closeUsePersonalInfo = () => {
        setUsePersonalInfoOpen(false);
    };

    const openEMail = (id) => {
        setEMailOpen(true);
    };
    const closeEMail = () => {
        setEMailOpen(false);
    };

    const openSMS = (id) => {
        setSMSOpen(true);
    };
    const closeSMS = () => {
        setSMSOpen(false);
    };

    // 필수 약관 동의
    const requiredCheckboxes = [
        'join_membership_agree_use',
        'join_membership_agree_community',
        'join_membership_agree_privacy'
    ];

    const [checkbox, setCheckbox] = useState([]);

    // 체크박스 단일 선택
    const handleSingleCheck = (checked, id) => {

        // 필수 선택 해제 시 경고 창
        if (requiredCheckboxes.includes(id)) {
            if (!checked) {
                alert('필수 약관에 동의해주세요');
            }
        }

        // 단일 선택 시 체크된 아이템 배열에 추가
        if (checked) {
            setCheckbox(prev => [...prev, id]);

            // 단일 선택 해제 시 체크된 아이템 제외한 배열
        } else {
            setCheckbox(checkbox.filter((el) => el !== id));
        }

        changeButton();
    }

    const checkboxData = [
        {
            id: 'join_membership_agree_use',
            title: '이용약관',
            open: openUse,
            tag: <Use isOpen={isUseOpen} onClose={closeUse} handleSingleCheck={handleSingleCheck} checkboxId={'join_membership_agree_use'} />
        },
        {
            id: 'join_membership_agree_community',
            title: '커뮤니티 이용약관',
            open: openUseCommunity,
            tag: <UseCommunity isOpen={isUseCommunityOpen} onClose={closeUseCommunity} handleSingleCheck={handleSingleCheck} checkboxId={'join_membership_agree_community'} />
        },
        {
            id: 'join_membership_agree_privacy',
            title: '개인정보 수집 및 이용',
            open: openUsePersonalInfo,
            tag: <UsePersonalInfo isOpen={isUsePersonalInfoOpen} onClose={closeUsePersonalInfo} handleSingleCheck={handleSingleCheck} checkboxId={'join_membership_agree_privacy'} />
        },
        {
            id: 'email',
            title: '이메일',
            open: openEMail,
            tag: <EMail isOpen={isEMailOpen} onClose={closeEMail} handleSingleCheck={handleSingleCheck} checkboxId={'email'} />
        },
        {
            id: 'sms',
            title: '문자/카카오톡',
            open: openSMS,
            tag: <SMS isOpen={isSMSOpen} onClose={closeSMS} handleSingleCheck={handleSingleCheck} checkboxId={'sms'} />
        }
    ]

    // 체크박스 전체 선택
    const handleAllCheck = (checked) => {

        // 전체 선택 시
        if (checked) {
            const idArray = [];
            checkboxData.forEach((el) => { idArray.push(el.id) });
            setCheckbox(idArray);

            // 전체 선택 해제 시
        } else {
            setCheckbox([]);
        }
    }

    // ==========================================================
    // ** 회원가입 버튼 활성화

    const [joinMembershipButton, setJoinMembershipButton] = useState(true);

    function changeButton() {
        emailValid && passwordValid && nameValid && password === passwordCheck &&
            phone_numberValid &&
            checkbox.includes('join_membership_agree_use') &&
            checkbox.includes('join_membership_agree_community') &&
            checkbox.includes('join_membership_agree_privacy')
            ? setJoinMembershipButton(false) : setJoinMembershipButton(true);
    }

    useEffect(() => {
        changeButton();
    }, [checkbox, emailValid, passwordValid, nameValid, phone_numberValid]);

    // =============================================================
    // ** 엔터 키 누름
    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            if (e.target.id === 'email_name') {
                document.getElementById('domain_select').focus();
            } else if (e.target.id === 'domain_select') {
                document.getElementById('email_domain').focus();
            } else if (e.target.id === 'email_domain') {
                document.getElementById('join_membership_pw').focus();
            } else if (e.target.id === 'join_membership_pw') {
                document.getElementById('join_membership_pw_check').focus();
            } else if (e.target.id === 'join_membership_pw_check') {
                document.getElementById('phone_number').focus();
            } else if (e.target.id === 'phone_number') {
                document.getElementById('join_membership_name').focus();
            }
        }
    }

    // =============================================================
    // ** 데이터 전송
    const id = `${emailName}@${emailDomain}`;
    const yearRef = useRef();
    const monthRef = useRef();
    const dayRef = useRef();

    const [address_zip, setAddress_zip] = useState('');
    const [address, setAddress] = useState('');
    const [address_detail, setAddress_detail] = useState('');

    const onAddressZip = (zip) => {
        setAddress_zip(zip);
    }

    const onAddress = (addr) => {
        setAddress(addr);
    }

    const onAddressDetail = (detail) => {
        setAddress_detail(detail);
    }

    function pageToLogin() {
        navigate('/LogIn');
    }

    // ** 아이디 중복 체크
    const idDupCheck = (e) => {
        e.preventDefault();

        if (document.getElementById('email_name').value !== '' && document.getElementById('email_domain').value !== '') {
            axios({
                url: "/user/idDupCheck",
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                data: {
                    id: id
                }
            }).then((res) => {
                setEmailError(res.data);
                setEmailValid(true);
            }).catch((err) => {
                setEmailValid(false);
                setEmailError(err.response.data);
            });
        } else {
            setEmailError('유효한 이메일 형식이 아닙니다.');
        }
    }

    function submitButton() {
        const selectedYear = yearRef.current.value;
        const selectedMonth = monthRef.current.value;
        const selectedDay = dayRef.current.value;

        axios({
            url: "/user/join",
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            data: {
                id: id,
                password: password,
                phone_number: phone_number,
                name: name,
                address_zip: address_zip,
                address: address,
                address_detail: address_detail,
                birthday: `${selectedYear}${selectedMonth}${selectedDay}`,
                ad_check_email: checkbox.includes('email'),
                ad_check_sms: checkbox.includes('sms')
            }
        }).then((res) => {
            alert(res.data);

            navigate("/LogIn");
        }).catch((error) => {
            alert(error.response.data);
        });
    }

    return (
        <div className='JoinMembership d-flex'>
            <div className="joinMembership_logo_container d-flex">
                <Link to={'/'}>
                    <img src="img/fox_logo.png" alt="findUserInfo_logo" className="find_userInfo_logo" />
                </Link>
                <span><h1>회원가입</h1></span>
            </div>
            <div className='toLoginButton'>
                <button onClick={pageToLogin}>로그인 하러가기</button>
            </div>
            <form className='join_membership_form'>
                <fieldset className='join_membership_fieldset'>
                    <div className='d-flex'>
                        <div className='join_membership_section_1'>기본 정보 입력
                            <div className='join_membership_section_1_info'>(필수)</div>
                            <div className='join_membership_section_1_explain d-flex'>
                                <FaAsterisk className='join_membership_section_1_icon' />
                                <span>회원정보 조회 및 관리에 이용되므로 정확히 입력해주세요</span>
                            </div>
                        </div>
                        <div className='join_membership_section_2 d-flex'>
                            <div>
                                <span className='join_membership_basic_span'>
                                    {emailValid && <span className='check_circle'><FaCheckCircle /></span>}&nbsp;이메일(아이디)
                                </span>
                                <span>
                                    <label htmlFor="email_name"></label>
                                    <input id='email_name' name='email_name' value={emailName}
                                        autoComplete='off' type="text" required
                                        onKeyUp={changeButton}
                                        onKeyDown={handleEnterKey}
                                        onChange={(e) => {
                                            setEmailName(e.target.value);
                                            setEmailError('');
                                        }}
                                        onBlur={validateEmail} /> @ &nbsp;
                                    <input id='email_domain' type="text" value={emailDomain}
                                        onKeyDown={handleEnterKey}
                                        onChange={(e) => {
                                            setEmailDomain(e.target.value);
                                            setEmailError('');
                                        }}
                                        onBlur={validateEmail} /> &nbsp;
                                    <select onChange={handleEmailDomainChange} onKeyDown={handleEnterKey} onBlur={validateEmail} id='domain_select'>
                                        <option>직접입력</option>
                                        <option value="naver.com">naver.com</option>
                                        <option value="daum.net">daum.net</option>
                                        <option value="gmail.com">gmail.com</option>
                                        <option value="hanmail.com">hanmail.com</option>
                                        <option value="yahoo.co.kr">yahoo.co.kr</option>
                                    </select>
                                    <button onClick={idDupCheck} className='join_dupCheck_button'>중복 체크</button>
                                    {emailError && <div className={emailValid ? "join_dup-message" : "join_error-message"}>{emailError}</div>}
                                </span>
                            </div>
                            <div>
                                <span className='join_membership_basic_span'>
                                    {passwordValid && <span className='check_circle'><FaCheckCircle /></span>}&nbsp;비밀번호
                                </span>
                                <span>
                                    <input id='join_membership_pw' name='password' type="password"
                                        placeholder='특수문자 포함, 7자리 이상' minLength={7} autoComplete='off' required
                                        value={password} autoCapitalize='off' onKeyUp={changeButton}
                                        onKeyDown={handleEnterKey}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setPasswordError('');
                                            setPasswordCheckValid(false);
                                        }}
                                        onBlur={validatePassword} />
                                    {passwordError && <div className="join_error-message">{passwordError}</div>}
                                </span>
                            </div>
                            <div>
                                <span className='join_membership_basic_span'>
                                    {passwordCheckValid && <span className='check_circle'><FaCheckCircle /></span>}&nbsp;비밀번호 확인
                                </span>
                                <span>
                                    <input id='join_membership_pw_check' name='password_check'
                                        type="password" minLength={7} autoComplete='off' required
                                        value={passwordCheck} autoCapitalize='off' onKeyUp={changeButton}
                                        onKeyDown={handleEnterKey}
                                        onChange={(e) => {
                                            setPasswordCheck(e.target.value);
                                            setPasswordCheckError('');
                                            setPasswordCheckValid(false);
                                        }}
                                        onBlur={validatePasswordCheck}
                                    />
                                    {passwordCheckError && <div className="join_error-message">{passwordCheckError}</div>}
                                </span>
                            </div>
                            <div>
                                <span className='join_membership_basic_span'>
                                    {phone_numberValid && <span className='check_circle'><FaCheckCircle /></span>}&nbsp;휴대전화
                                </span>
                                <span>
                                    <input type="text" required className='phone_number' id='phone_number'
                                        value={phone_number} placeholder='010으로 시작하는 숫자만' onKeyUp={changeButton}
                                        onKeyDown={handleEnterKey}
                                        onChange={(e) => {
                                            setPhone_number(e.target.value);
                                            setPhone_numberError('');
                                        }}
                                        onBlur={validatePhone_number} />
                                </span>
                                {phone_numberError && <div className="join_error-message">{phone_numberError}</div>}
                            </div>
                            <div>
                                <span className='join_membership_basic_span'>
                                    {nameValid && <span className='check_circle'><FaCheckCircle /></span>}&nbsp;이름
                                </span>
                                <span>
                                    <input id='join_membership_name' name='name'
                                        type="text" autoComplete='off' maxLength={100} required
                                        value={name} placeholder='2자 이상의 한글 또는 영어'
                                        onKeyUp={changeButton}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                            setNameError('');
                                        }}
                                        onBlur={validateName} />
                                    {nameError && <div className="join_error-message">{nameError}</div>}
                                </span>
                            </div>
                            <div>
                                <span className='join_membership_basic_span'>생년월일</span>
                                <span className='join_membership_birth'>
                                    <label htmlFor="year_birth"></label>
                                    <select ref={yearRef} id="year_birth">
                                        {years.map((year) => (
                                            <option key={year} defaultValue={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select> 년
                                </span>
                                <span className='join_membership_birth'>
                                    <label htmlFor="month_birth"></label>
                                    <select ref={monthRef} id="month_birth" required>
                                        {month.map((month) => (
                                            <option key={month} defaultValue={month}>{formatDateNumber(month)}</option>
                                        ))}
                                    </select> 월
                                </span>
                                <span className='join_membership_birth'>
                                    <label htmlFor="day_birth"></label>
                                    <select ref={dayRef} id="day_birth" required>
                                        {day.map((day) => (
                                            <option key={day} defaultValue={day}>{formatDateNumber(day)}</option>
                                        ))}
                                    </select> 일
                                </span>
                            </div>
                        </div>
                    </div>
                    <hr />

                    <div className='d-flex'>
                        <div className='join_membership_section_1'>부가 정보 입력
                            <div className='join_membership_section_1_info'>(기본 주소)</div>
                        </div>
                        <div>
                            <div className='join_membership_section_2 d-flex'>
                                <span className='join_membership_checkbox d-flex'>
                                    <input id='join_membership_address_checkbox' name='join_membership_address_checkbox'
                                        type="checkbox" checked={hideAfterAddressInput}
                                        onChange={handleAfterAddressInputCheckbox} />
                                    <label htmlFor="join_membership_address_checkbox">
                                        주소는 다음에 입력합니다. 단, 주소가 없으면 경품 이벤트 추첨에서 제외될 수 있습니다.</label>
                                </span>
                            </div>
                            {!hideAfterAddressInput &&
                                (<SearchAddress onAddress_zip={onAddressZip} onAddress={onAddress} onAddress_detail={onAddressDetail} className={hideAddressSearch ? 'hidden' : ''} />)}
                        </div>
                    </div>
                    <hr />

                    <div className='d-flex'>
                        <div className='join_membership_section_1'>약관 동의
                            <div className='join_membership_section_1_info'>(*는 필수)</div>
                        </div>
                        <div className='join_membership_section_2'>
                            <div className='join_membership_check_all d-flex'>
                                <input id='join_membership_agree_all' name='join_membership_agree_all'
                                    type="checkbox" onChange={(e) => { handleAllCheck(e.target.checked) }}
                                    checked={checkbox.length === checkboxData.length ? true : false} />
                                <label htmlFor="join_membership_agree_all">모든 약관에 동의합니다</label>
                            </div>
                            <div>
                                {checkboxData.map((checkboxData, key) => (
                                    <div key={key} className='join_membership_agree_checkbox d-flex'>
                                        <span>
                                            <input type='checkbox'
                                                name={`ad_check_${checkboxData.id}`}
                                                id={checkboxData.id}
                                                onChange={(e) => { handleSingleCheck(e.target.checked, checkboxData.id); }}
                                                checked={checkbox.includes(checkboxData.id) ? true : false}
                                                {...(requiredCheckboxes.includes(checkboxData.id) && { required: true })} />
                                        </span>
                                        <label htmlFor={checkboxData.id}>{checkboxData.title}
                                            {requiredCheckboxes.includes(checkboxData.id) && <span className="required-indicator">&nbsp;*</span>}
                                        </label>
                                        <span className='join_membership_termsOfService_detail'
                                            onClick={checkboxData.open}>
                                            자세히 보기
                                        </span>
                                        {checkboxData.tag}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <hr className='join_membership_hr' />

                    <div className='join_membership_btn_div'>
                        <button className='join_membership_submit_btn' type='button' onClick={submitButton}
                            disabled={joinMembershipButton}>회원 가입하기
                        </button>
                    </div>
                </fieldset>
            </form>
            <SideButton />
        </div >
    );
}
export default JoinMembership;