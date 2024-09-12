import './OrderListDateSelect.css';

function OrderListDateSelect() {
    return (
        <div>
            <div className="orderdelivery-title">주문/배송조회</div>
            <div className='orderlist_sub_title'>고객님께서 구매하셨던 상품목록들을 확인하실 수 있는 페이지입니다.</div>

            <div className="selectdate-grandbox">
                <div className="selectdate-name">조회기간</div>
                <div className="selectdate-tool">
                    <div className="selectdate-detaildate">
                        <div>
                            <label htmlFor="year1"></label>
                            <select name="year1" id="year1">
                                <option value="">2014</option>
                                <option value="">2015</option>
                                <option value="">2016</option>
                                <option value="">2017</option>
                                <option value="">2018</option>
                                <option value="">2019</option>
                                <option value="">2020</option>
                                <option value="">2021</option>
                                <option value="">2022</option>
                                <option value="">2023</option>
                            </select>
                        </div>

                        <div className="selectdate-detaildate-year">년</div>

                        <div>
                            <label htmlFor="month1"></label>
                            <select name="month1" id="month1">
                                <option value="">1</option>
                                <option value="">2</option>
                                <option value="">3</option>
                                <option value="">4</option>
                                <option value="">5</option>
                                <option value="">6</option>
                                <option value="">7</option>
                                <option value="">8</option>
                                <option value="">9</option>
                                <option value="">10</option>
                                <option value="">11</option>
                                <option value="">12</option>
                            </select>
                        </div>

                        <div className="selectdate-detaildate-month">월</div>

                        <div>
                            <label htmlFor="day1"></label>
                            <select name="day1" id="day1">
                                <option value="">1</option>
                                <option value="">2</option>
                                <option value="">3</option>
                                <option value="">4</option>
                                <option value="">5</option>
                                <option value="">6</option>
                                <option value="">7</option>
                                <option value="">8</option>
                                <option value="">9</option>
                                <option value="">10</option>
                                <option value="">11</option>
                                <option value="">12</option>
                                <option value="">13</option>
                                <option value="">14</option>
                                <option value="">15</option>
                                <option value="">16</option>
                                <option value="">17</option>
                                <option value="">18</option>
                                <option value="">19</option>
                                <option value="">20</option>
                                <option value="">21</option>
                                <option value="">22</option>
                                <option value="">23</option>
                                <option value="">24</option>
                                <option value="">25</option>
                                <option value="">26</option>
                                <option value="">27</option>
                                <option value="">28</option>
                                <option value="">29</option>
                                <option value="">30</option>
                                <option value="">31</option>
                            </select>
                        </div>

                        <div className="selectdate-detaildate-day">일</div>

                        <div className="selectdate-detaildate-margin"> ~ </div>

                        <div>
                            <label htmlFor="year2"></label>
                            <select name="year2" id="year2">
                                <option value="">2014</option>
                                <option value="">2015</option>
                                <option value="">2016</option>
                                <option value="">2017</option>
                                <option value="">2018</option>
                                <option value="">2019</option>
                                <option value="">2020</option>
                                <option value="">2021</option>
                                <option value="">2022</option>
                                <option value="">2023</option>
                            </select>
                        </div>

                        <div className="selectdate-detaildate-year">년</div>

                        <div>
                            <label htmlFor="month2"></label>
                            <select name="month2" id="month2">
                                <option value="">1</option>
                                <option value="">2</option>
                                <option value="">3</option>
                                <option value="">4</option>
                                <option value="">5</option>
                                <option value="">6</option>
                                <option value="">7</option>
                                <option value="">8</option>
                                <option value="">9</option>
                                <option value="">10</option>
                                <option value="">11</option>
                                <option value="">12</option>
                            </select>
                        </div>

                        <div className="selectdate-detaildate-month">월</div>

                        <div>
                            <label htmlFor="day2"></label>
                            <select name="day2" id="day2">
                                <option value="">1</option>
                                <option value="">2</option>
                                <option value="">3</option>
                                <option value="">4</option>
                                <option value="">5</option>
                                <option value="">6</option>
                                <option value="">7</option>
                                <option value="">8</option>
                                <option value="">9</option>
                                <option value="">10</option>
                                <option value="">11</option>
                                <option value="">12</option>
                                <option value="">13</option>
                                <option value="">14</option>
                                <option value="">15</option>
                                <option value="">16</option>
                                <option value="">17</option>
                                <option value="">18</option>
                                <option value="">19</option>
                                <option value="">20</option>
                                <option value="">21</option>
                                <option value="">22</option>
                                <option value="">23</option>
                                <option value="">24</option>
                                <option value="">25</option>
                                <option value="">26</option>
                                <option value="">27</option>
                                <option value="">28</option>
                                <option value="">29</option>
                                <option value="">30</option>
                                <option value="">31</option>
                            </select>
                        </div>

                        <div className="selectdate-detaildate-day">일</div>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default OrderListDateSelect;