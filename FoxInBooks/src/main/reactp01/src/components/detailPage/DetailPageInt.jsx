import { useEffect } from 'react';
import './DetailPageInt.css';

function DetailPageInt({ oneProductWriterJoin }) {

    const { protype, intro_image, content, writer, introduction } = oneProductWriterJoin;

    useEffect(() => {
        if (content !== '') {
            document.getElementById('int_contents_R').innerHTML = content;
        } else {
            document.getElementById('int_contents_R').innerHTML = '목차 없는 상품입니다.';
        }

    }, [oneProductWriterJoin]);



    return (
        <div className="int">
            <div className="int_int d-flex">
                <div className="int_int_L">상품소개</div>
                <div className="int_int_R">
                    <img src={`../img/${intro_image}`} />
                </div>
            </div>

            <div className="int_contents" style={{ display: protype == 1 ? 'block' : 'none' }}>
                <hr className='DetailPage_line' />
            </div>

            <div className="int_contents" style={{ display: protype == 1 ? 'flex' : 'none' }}>

                <div className="int_contents_L">목차</div>
                <div className="int_contents_R" id="int_contents_R"></div>
            </div>
        </div>
    );
}

export default DetailPageInt;