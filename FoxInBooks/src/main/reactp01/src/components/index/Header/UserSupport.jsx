import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function UserSupport() {

    const navigate = useNavigate();
    // const [loginId, setLoginId] = useState(JSON.parse(sessionStorage.getItem('user')).id === null ? "" : JSON.parse(sessionStorage.getItem('user')).id);

    // 로그인 상태가 sessionStorage에 담겨있음
    const loginInfo = JSON.parse(sessionStorage.getItem('user'));
    const id = loginInfo ? loginInfo.id : null;

    // const isLoggedIn = !!loginInfo; // 로그인 여부 확인
    const isLoggedIn = loginInfo; // 로그인 여부 확인

    // 로그인 후 이용가능한 서비스를 비 로그인 상태로 클릭한 경우 
    const showWarning = () => {
        window.alert("로그인 후 이용 가능한 서비스입니다.");
    };

    // 로그아웃 클릭시 적용
    const logout = () => {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('loginID');
        sessionStorage.removeItem('loginName');
        navigate('/');
    }


    return (
        <div className="user_support">
            <nav>
                <ul>
                    <li>
                        {isLoggedIn ?
                            (`${loginInfo.name}` + '님')
                            :
                            (<Link to='/JoinMembership' style={{ textDecoration: 'none', color: 'red' }}>회원가입</Link>)}
                    </li>
                    <li>
                        {isLoggedIn ?
                            (<Link to='/' className='Link' onClick={logout}>로그아웃</Link>)
                            :
                            (<Link to='/LogIn' className='Link'>로그인</Link>)}
                    </li>
                    <li>
                        {id === 'admin@admin.com' ? "" : isLoggedIn ?
                            (<Link to='/MyPage' className='Link'>마이페이지</Link>)
                            :
                            (<Link to='/LogIn' className='Link' onClick={showWarning}>마이페이지</Link>)}
                    </li>
                    <li>
                        {id !== 'admin@admin.com' &&
                            <Link to='/CustomerServiceCategory/CustomerServiceNotice' className='Link'>고객센터</Link>
                        }
                    </li>
                </ul>
            </nav>
            <div className="admin">
                {id === 'admin@admin.com' &&
                    <Link to='http://localhost:8080/home' className='Link'>관리자 모드 전환</Link>
                }
            </div>
        </div>
    );
}

export default UserSupport;