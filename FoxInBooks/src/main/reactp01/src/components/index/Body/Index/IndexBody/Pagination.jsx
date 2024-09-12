import { useState } from "react";
import './Pagination.css';

// total(데이터 총 갯수), limit(한 페이지에 보여줄 갯수)
const Pagination = ({ total, limit, page, setPage }) => {
    // const [btnActive, setBtnActive] = useState(""); // 현재 페이지 활성화 여부
    const [btnActive, setBtnActive] = useState(""); // 현재 페이지 활성화 여부
    const numPages = Math.ceil(total / limit); // 총 페이지 수는 올림해야 함

    const pagesArray = Number.isInteger(numPages) && numPages > 0 ? Array(numPages).fill() : [];

    const hadlePageBtn = (e, index) => {
        setPage(index + 1);
        setBtnActive(index);
    };

    return (
        <div className="pagination">
            {total > 0 &&
                <button className="pagination_prev" onClick={() => setPage(page - 1)} disabled={page === 1}>
                    &lt;
                </button>
            }
            {pagesArray
                .fill()
                .map((_, index) => (
                    <button
                        value={index}
                        key={index + 1}
                        // 직접 클릭으로 활성화시키든, page prev, next버튼 클릭으로 활성화 시키든 
                        // 선택된 page에 classname을 부여
                        className={index === btnActive || page === index + 1 ? "pagination_button_active" : ""}
                        onClick={(e) => hadlePageBtn(e, index)}
                    >
                        {index + 1}
                    </button>
                ))}
            {total > 0 &&
                <button className="pagination_next" onClick={() => setPage(page + 1)} disabled={page === numPages}>
                    &gt;
                </button>
            }
        </div>
    );
};

export default Pagination;