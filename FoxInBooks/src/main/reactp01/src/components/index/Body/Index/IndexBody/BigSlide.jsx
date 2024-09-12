import './BigSlide.css';

import { book_list_context } from "../../../../Data/ProductOriginData_context";
import { useContext, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';


function BigSlide() {
    const big_slide_list = useContext(book_list_context);
    const big_slide_filter = big_slide_list.filter((book) => {
        return 'slide_image' in book;
    })
    // 데이터 배열에서 객체 속성으로 slide유무를 줘야할듯.

    const slide_list = useRef(),
        btn_pre = useRef(),
        btn_next = useRef(),
        slide_idx = useRef(0);

    const btn_pre_click = () => {
        slide_idx.current--;
        slide_list.current.style.left = `${-slide_idx.current * 100}%`;

        btn_next.current.classList.remove('nonVisible');
        if (slide_idx.current <= 0) {
            btn_pre.current.classList.add('nonVisible');
        }
    }

    const btn_next_click = () => {
        slide_idx.current++;
        slide_list.current.style.left = `${-slide_idx.current * 100}%`;
        btn_pre.current.classList.remove('nonVisible');

        if (slide_idx.current >= big_slide_filter.length - 1) {
            btn_next.current.classList.add('nonVisible');
        }
    }

    useEffect(() => {
        const autoSlide = setInterval(() => {
            if (slide_idx.current >= big_slide_filter.length - 1) {
                slide_idx.current = 0;
            } else {
                slide_idx.current++;
            }
            slide_list.current.style.left = `${-slide_idx.current * 100}%`;
            btn_pre.current.classList.remove('nonVisible');
            if (slide_idx.current >= big_slide_filter.length - 1) {
                btn_next.current.classList.add('nonVisible');
            } else {
                btn_next.current.classList.remove('nonVisible');
            }
        }, 5000);

        return () => {
            clearInterval(autoSlide);
        };
    }, [big_slide_filter.length]);


    const BigSlideItem = ({ id, image, title, background_color, price, salePer, writer, compiler, summary }) => {
        return (
            <li className='aa11' style={{ backgroundColor: background_color }}>
                <Link to={`/DetailPage/${id}`} className='big_slide_item_list'>
                    <div className='aaa'>
                        <img src={image} alt={title} />
                    </div>
                </Link >
            </li>
        )
    }

    return (
        <div className="big_slide_container">
            <div className="big_slide_item">
                <ul className='slide_list' ref={slide_list} style={{ width: `${big_slide_filter.length * 100}%` }}>
                    {/* {big_slide_list.map((big_slide_data, index) => ( */}
                    {/* 데이터 배열 전부 슬라이드로 넣은 태그 */}

                    {big_slide_filter.map((big_slide_data, index) => (
                        // 데이터 배열 객체속성에 slide_image가 있을때 걔만 선택되게 설정
                        <BigSlideItem
                            key={index}
                            id={big_slide_data.id}
                            image={big_slide_data.slide_image}
                            background_color={big_slide_data.background_color}
                            title={big_slide_data.title}
                            price={big_slide_data.price}
                            salePer={big_slide_data.salePer}
                            writer={big_slide_data.writer}
                            compiler={big_slide_data.compiler}
                            summary={big_slide_data.summary}
                        />
                    ))}
                </ul>
                <button className='btn_pre nonVisible' ref={btn_pre} onClick={btn_pre_click}> &lt;</button>
                <button className='btn_next' ref={btn_next} onClick={btn_next_click}>&gt;</button>
            </div>
        </div>
    )
}

export default BigSlide;





