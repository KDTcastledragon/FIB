import { useEffect } from "react";
import { useLocation } from "react-router-dom";


// 리렌더링이 되지않는 링크로 페이지 전환시에 스크롤의 위치를
// 클릭시 위치가 아닌, 최상단으로 바꿔주는 컴포넌트. 
export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {window.scrollTo(0, 0);}, [pathname]);

    return null;
}