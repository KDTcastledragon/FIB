import { createContext } from "react";

const book_list = [
    {
        id: 1,
        type: 'best',
        title: '꽃말의 탄생',
        writer: '샐리 쿨타드',
        image: '../img/FlowersLanguage.jpg',
        intro_image: '../img/FlowersLanguage_intro.jpg',
        publisher: '동양북스',
        publishDate: '2022-06-10',
        compiler: '박민정',
        from: '해외',
        category: '에세이',
        price: 19500,
        salePer: 10,
        sellCount: 1,
        salesRate: 325000,
        rank: 0,
        summary:
            <p>
                〈꽃말의 탄생: 서양 문화로 읽는 매혹적인 꽃 이야기〉는 우리에게 익숙한 약 50여 종의 꽃들이 오랜 세월 동안 어떻게 그런 꽃말을 지니게 되었는지 그 유래를 찾아서 신화, 문학, 역사, 미신 등 서양 문화를 통해 소개한 책입니다.<br />
                영국 요크셔에서 작은 농장을 운영하며 자연, 공예, 야외 생활 등에 관한 베스트셀러 작가로 활동하고 있는 샐리 쿨타드의 작품으로, 아름다운 꽃 일러스트가 함께 수놓아진 책장을 넘기다 보면 마음에 봄날이 피어나는 기분을 느낄 수 있을 것입니다.
            </p>,
        contents:
            <p>
                이 책에 쏟아진 찬사 / 한국어판 서문<br /><br />

                1장_정의란 옳고 그름을 판단하는 문제일까?<br />
                2장_최대 행복 원칙: 공리주의<br />
                3장_우리는 우리 자신을 소유하는가?: 자유지상주의<br />
                4장_대리인 고용: 시장 논리의 도덕성 문제<br />
                5장_동기를 중시하는 시각: 이마누엘 칸트
            </p>,
        int_author:
            <p>
                마이클 샌델 (Michael Sandel) (지은이)<br /><br />

                27세에 최연소 하버드대학교 교수가 되었고, 29세에 자유주의 이론의 대가인 존 롤스의 정의론을 비판한 《자유주의와 정의의 한계》를 발표하면서 세계적 명성을 얻었다.<br />
                1980년부터 하버드대학교에서 정치철학을 가르치고 있으며, 그의 수업은 현재까지 수십 년 동안 학생들 사이에서 최고의 명강의로 손꼽힌다.<br />
                샌델이 진행 중인 영국 BBC정치철학 토론 프로그램 〈The Global Philosopher〉 시리즈는 ‘철학적 아이디어의 이면을 탐구한다’는 주제로, 세계 각국의 석학들이 참여하고 있다.
            </p>
    },
    {
        id: 2,
        type: 'best',
        title: '메리골드 마음 세탁소',
        writer: '윤정은',
        image: '../img/marigold.jpg',
        intro_image: '../img/marigold_intro.jpg',
        slide_image: '../img/marigold_slide.jpg',
        background_color: '#E2D5C4',
        publisher: '북로망스',
        publishDate: '2023-03-06',
        compiler: '',
        from: '국내',
        category: '소설',
        price: 13500,
        salePer: 10,
        sellCount: 1,
        salesRate: 25100,
        rank: 0,
        summary:
            <p>
                우리는 가끔 시간을 되돌려 과거로 돌아가 후회됐던 일을 되돌리고 싶어한다. 그런데 과연 그 일을 지워버리는 게 현명한 선택일까? 그리고 그 기억을 지웠을 때 지금의 내가 있을 수 있을까? 만약 그 기억만 없다면 앞으로 행복만 할 수 있을까?
            </p>,
        contents:
            <p>
                메리골드 마음 세탁소 009<br />
                에필로그 267
            </p>,
        int_author:
            <p>
                윤정은 (지은이)<br /><br />
                살며 사랑하며 이야기의 힘을 믿고 오늘도 글을 쓰는 사람. 2012년 삶의향기 동서문학상 소설 부문 은상을 수상했다.<br />
                『하고 싶은 대로 살아도 괜찮아』, 『사실은 이 말이 듣고 싶었어』, 『여행이거나 사랑이거나』 등 여러 책을 썼다.<br />
                네이버 오디오클립 ‘윤정은의 책길을 걷다’를 진행하고 있다.
            </p>
    },
    {
        id: 3,
        type: 'best',
        title: '세상의 마지막 기차역',
        writer: '무라세 다케시',
        image: '../img/lastStation.jpg',
        intro_image: '../img/lastStation_intro.jpg',
        publisher: '모모',
        publishDate: '2022-05-11',
        compiler: '김지연',
        from: '해외',
        category: '판타지',
        price: 14000,
        salePer: 5,
        sellCount: 1,
        salesRate: 400000,
        rank: 0,
        summary:
            <p>
                봄이 시작된 3월, 급행열차 한 대가 탈선하여 절벽 아래로 떨어졌다. 이 대형 참사로 승객 127명 중 68명이 사망, 수많은 중상자가 나왔다. 연인, 가족 등 한순간에 사랑하는 사람을 잃은 유가족은 그때부터 자신의 삶도 멈춰버린 듯 결코 무뎌지지 않을 아픔에 갇혀 하루하루를 버틴다.
            </p>,
        contents:
            <p>
                제1화 연인에게<br />
                제2화 아버지에게<br />
                제3화 당신에게<br />
                제4화 남편에게
            </p>,
        int_author:
            <p>
                무라세 다케시 (村瀨健) (지은이)<br /><br />
                현실과 판타지를 자유자재로 넘나들며 몰입도 높은 이야기로 웃음과 감동, 슬픔과 재미를 선사하는 이야기 장인. 1978년 일본 효고현에서 태어나 간사이대학교 법학부를 졸업했다.<br />
                그 후 〈폭소 레드카펫〉, 〈킹 오브 콩트〉, 〈좋은 아침입니다〉 등 다양한 프로그램에서 방송 작가로도 활동했다.<br />
                특유의 입담과 재미난 이야기를 만들어내는 재능을 살려 소설가로 전향하고 나서는 데뷔작 《만담가 이야기~ 아사쿠사는 오늘도 시끌벅적합니다~(噺家ものがたり~ 浅草は今日もにぎやかです~)》로 제24회 전격소설대상 심사위원 장려상을 수상했다.<br /><br /><br />

                김지연 (옮긴이)<br /><br />
                경북대학교 일어일문학과를 졸업했다. 졸업 후 일본기업에서 수년간 통역과 번역 업무를 담당하다가 일본 문학이 지닌 재미와 감동을 더 많은 이들과 나누고 싶어서 일본어를 우리말로 옮기는 사람이 되었다.<br />
                옮긴 책으로는 《세상의 마지막 기차역》, 《나와 너의 365일》, 《삶이 버거운 당신에게 달리기를 권합니다》, 《정시 퇴근하겠습니다》, 《소설 쓰는 소설》 등 다수가 있다.
            </p>
    },
    {
        id: 4,
        type: 'best',
        title: '2차 망하면 큰일나지',
        writer: '리틀타네',
        image: '../img/life.jpg',
        intro_image: '../img/life_intro.jpg',
        publisher: '웅진지식하우스',
        publishDate: '2023-08-09',
        compiler: '',
        from: '국내',
        category: '에세이',
        price: 16800,
        salePer: 10,
        sellCount: 1,
        salesRate: 264483,
        rank: 0,
        summary:
            <p>
                여전히 내게는 확고한 청사진도, 뚜렷한 삶의 목표도 없다. 확실히 아는 건, 그저 나답게 살아야 한다는 것. 마음이 이끄는 대로. 편견이나 고정관념은 내려놓고 어떤 비교 판단도 없이. 이제 나는 스스로를 찾는 여정에 오르려고 한다. 인생은 길고, 어차피 중요한 건 결과가 아닌 과정이니까.
            </p>,
        contents:
            <p>
                프롤로그(저자 낭독)<br />
                1부<br />
                2부<br />
                3부<br />
                4부<br />
                에필로그(저자 낭독)
            </p>,
        int_author:
            <p>
                리틀타네 (신가영) (지은이)<br /><br />

                조금 이른 나이에 귀촌을 감행해 시골에 터를 잡고 살고 있는 유튜버이자 프리랜서.<br />
                ‘넘어지면 쉬어가자’는 자신만의 철학에 따라 시골에서의 여유로운 생활을 유튜브 채널 〈리틀타네의 슬기로운 생활〉에 기록하고 있다.<br />
                비록 지금은 유유자적한 삶을 살고 있지만, 과거엔 이력서에 한 줄 더해보겠다고 밤낮없이 일과 공부에 매진하기도 했다. 그러다 건강이 크게 무너졌고, 한 번 사는 인생을 이렇게 보낼 순 없기에 모든 것을 바꿀 결심을 하게 된다.<br />
                그렇게 조용한 시골집에서 정원을 가꾸고, 농작물을 키워내며 자신만의 속도로 살아가고 있다.<br />
                세상이 살라는 대로 살지 않아도 잘 살 수 있다는 것을 보여주기 위해 이 책을 그리고 썼다.
            </p>
    },
    {
        id: 5,
        type: 'best',
        title: '맡겨진 소녀',
        writer: '클레어 키건',
        image: '../img/girl.jpg',
        intro_image: '../img/girl_intro.jpg',
        slide_image: '../img/girl_slide.jpg',
        background_color: '#FEEDDF',
        publisher: '다산책방',
        publishDate: '2023-04-26',
        compiler: '허진',
        from: '해외',
        category: '소설',
        price: 13000,
        salePer: 10,
        sellCount: 1,
        salesRate: 125480,
        rank: 0,
        summary:
            <p>
                자국 아일랜드에서는 오래전부터 거장의 반열에 올랐으나 2021년부터 미국 독자 대중 사이에 서서히 화제가 되더니, 이제는 독자들이 잃어버린 시간을 벌충하려는 듯 애타게 찾는 소설가가 있다.<br />
                “한 세대에 한 명씩만 나오는 작가”로 불리는 아일랜드 현대문학의 대표 작가 클레어 키건의 이야기다.
            </p>,
        contents:
            <p>
                맡겨진 소녀<br />

                감사의 말<br />
                옮긴이의 말
            </p>,
        int_author:
            <p>
                클레어 키건 (Claire Keegan) (지은이)<br /><br />

                1968년 아일랜드 위클로에서 태어났다. 17세에 미국으로 건너가 로욜라대학교에서 영문학과 정치학을 공부했다. 이어서 웨일스대학교에서 문예창작 석사 학위를 받아 학부생을 가르쳤고, 더블린트리니티칼리지에서 철학 석사 학위를 취득했다.<br />
                《가디언》은 키건의 작품을 두고 “탄광 속의 다이아몬드처럼 희귀하고 진귀하다”라고 평한 바 있다. 이는 그가 24년간 활동하면서 단 4권의 책만을 냈는데 그 모든 작품들이 얇고 예리하고 우수하기 때문이다.<br />
                키건은 1999년 첫 단편집인 『남극(Antarctica)』으로 루니 아일랜드 문학상과 윌리엄 트레버상을 수상하며 화려하게 데뷔했다. 2007년 두 번째 작품 『푸른 들판을 걷다(Walk the Blue Fields)』를 출간해 영국과 아일랜드에서 출간된 가장 뛰어난 단편집에 수여하는 에지 힐상을 수상했다.<br />
                2009년 쓰인 『맡겨진 소녀』는 같은 해 데이비 번스 문학상을 수상했고 《타임스》에서 뽑은 ‘21세기 최고의 소설 50권’에 선정되었다. 최근작 『이처럼 사소한 것들(Small Things Like These)』로 오웰상(소설 부문)을 수상하고, 2022년 부커상 최종후보에 올랐다.<br />
                ‘양동이와 그 안의 물에 반사된 소녀의 모습’이라는, 키건을 사로잡은 한 이미지에서 비롯된 『맡겨진 소녀』는 한 소녀가 먼 친척 부부와 보내는 어느 여름을 배경으로 이야기를 펼쳐나간다. 출간 이래로 교과과정에 줄곧 포함되어 아일랜드에서는 모두가 읽는 소설로 자리 잡았다.<br />
                이 작품은 2022년 콤 베어리드 감독에 의해 영화 「말없는 소녀」로 제작되었다.<br /><br /><br />

                허진 (옮긴이)<br /><br />

                서강대학교 영어영문학과와 이화여자대학교 통번역대학원 번역학과를 졸업했다.<br />
                옮긴 책으로 조지 오웰의 『조지 오웰 산문선』, 샐리 루니의 『친구들과의 대화』, 엘리너 와크텔의 인터뷰집 『작가라는 사람』(전2권), 지넷 윈터슨의 『시간의 틈』, 도나 타트의 『황금방울새』, 마틴 에이미스의 『런던 필즈』와 『누가 개를 들여놓았나』, 할레드 알하미시의 『택시』, 나기브 마푸즈의 『미라마르』, 아모스 오즈의 『지하실의 검은 표범』, 수잔 브릴랜드의 『델프트 이야기』 등이 있다.
            </p>
    },
    {
        id: 6,
        type: 'steady',
        title: '느리게 산다는 것',
        writer: '피에르 쌍소',
        image: '../img/slowly.jpg',
        intro_image: '../img/slowly_intro.jpg',
        publisher: '드림셀러',
        publishDate: '2023-08-28',
        compiler: '강주헌',
        from: '해외',
        category: '에세이',
        price: 16800,
        salePer: 10,
        sellCount: 1,
        salesRate: 5229,
        rank: 0,
        summary:
            <p>
                삶이 우리에게 선물을 주기 때문에, 또 이상적으로 균형이 맞춰질 때 기쁨의 크기가 고통의 크기를 넘어서기 때문에 삶이 행운이라는 것은 아니다.<br />
                내가 삶을 행운이라 생각하는 이유는, 내가 지금 살아서 아침이면 햇빛을, 저녁이면 어둠을 만나는 행운을 매번 누리기 때문이고, 모든 사물이 본래의 광채를 잃지 않았기 때문이며, 희미하게 피어오르는 미소와 찡그린 얼굴에서 불만을 금세 알아차릴 수 있기 때문이다. 한마디로, 세상이 나에게 말을 걸기 때문이다.
            </p>,
        contents:
            <p>
                추천의 글<br />
                머리말<br /><br />

                시간의 압력에서 벗어나기 위해서<br />
                한가로이 걷기<br />
                듣기<br />
                권태<br />
                꿈꾸기<br />
                기다리기<br />
                내면의 고향<br />
                글쓰기<br />
                포도주의 지혜<br />
                모데라토 칸타빌레<br /><br />

                리듬의 교체(막간의 시간)<br /><br />

                의문 제기와 유토피아 그리고 조언<br />
                문화의 과잉<br />
                도시계획의 지연에 대하여<br />
                분주하지 않고 가벼운 마음으로<br />
                순박한 사람들의 휴식<br />
                하루의 탄생
            </p>,
        int_author:
            <p>
                피에르 쌍소 (Pierre Sansot) (지은이)<br /><br />

                프랑스의 수필가이자 철학 교수로 지낸 피에르 쌍소는 1928년에 태어나 프랑스 그르노블에 있는 피에르맹데-프랑스대학과 몽펠리에의 폴 발레리대학에서 철학과 인류학을 가르쳤다.<br />
                행복을 찾는 적극적인 방법으로 ‘느림’의 방식을 찾은 그는, 환경에 조화를 이루는 삶의 자세를 이야기한 여러 에세이를 통해 ‘느리게 사는 삶’을 강조했고, 많은 이들에게 큰 관심을 불러일으켰다. 그를 ‘느림의 철학자’라고 부르는 이유다.<br />
                그는 2005년에 타계했다.<br />
                이 책 《느리게 산다는 것》은 철학, 사회학, 문학이 한데 섞인 동시대의 감수성을 잘 담아냈다.<br /><br /><br />

                강주헌 (옮긴이)<br /><br />

                한국외국어대학교 불어과를 졸업하고, 같은 대학원에서 석사 및 박사 학위를 받았다. 프랑스 브장송대학교에서 수학한 후 한국외국어대학교와 건국대학교 등에서 언어학을 강의했으며, 2003년 ‘올해의 출판인 특별상’을 수상했다.<br />
                저서로《기획에는 국경도 없다》가 있고, 옮긴 책으로는 《총 균 쇠》, 《습관의 힘》, 《12가지 인생의 법칙》, 《유럽사 산책》, 《문명의 붕괴》, 《월든》, 《어제까지의 세계》, 《삶이 던지는 질문은 언제나 같다》 등이 있다.
            </p>
    },
    {
        id: 7,
        type: 'steady',
        title: '연수',
        writer: '장류진',
        image: '../img/yeonsu.jpg',
        intro_image: '../img/yeonsu_intro.jpg',
        publisher: '창비',
        publishDate: '2023-06-23',
        compiler: '',
        from: '국내',
        category: '소설',
        price: 16800,
        salePer: 15,
        sellCount: 1,
        salesRate: 3054,
        rank: 0,
        summary:
            <p>
                젊은작가상 수상작인 「연수」를 포함한 여섯편의 이야기는 빠른 전개와 짝 달라붙는 대사가 어우러져 있어 타의 추종을 불허하는 속도감을 선사하는바, 기존 문학 독자뿐 아니라 넷플릭스나 유튜브 등 영상에 익숙한 이들에게도 막강한 재미를 선사한다.
            </p>,
        contents:
            <p>
                연수<br />
                펀펀 페스티벌<br />
                공모<br />
                라이딩 크루<br />
                동계올림픽<br />
                미라와 라라<br />
                작가의 말
            </p>,
        int_author:
            <p>
                장류진 (지은이)<br /><br />

                2018년 창비신인소설상을 받으며 작품활동을 시작했다. 소설집 『일의 기쁨과 슬픔』, 장편소설 『달까지 가자』를 썼다. 젊은작가상, 심훈문학대상을 수상했다.
            </p>
    },
    {
        id: 8,
        type: 'steady',
        title: '다이브',
        writer: '단요',
        image: '../img/dive.jpg',
        intro_image: '../img/dive_intro.jpg',
        publisher: '창비',
        publishDate: '2022-05-27',
        compiler: '',
        from: '국내',
        category: '판타지',
        price: 14000,
        salePer: 10,
        sellCount: 1,
        salesRate: 2569,
        rank: 0,
        summary:
            <p>
                ‘한국형 영어덜트’ 소설의 지평을 넓혀 오던 소설Y 시리즈의 여섯 번째 권으로 단요 장편소설 『다이브』가 출간되었다.
                『다이브』는 2057년 홍수로 물에 잠긴 한국을 배경으로 물꾼 소녀 ‘선율’과 기계 인간 ‘수호’가 잃어버린 기억을 찾아 나서는 이야기다.
            </p>,
        contents:
            <p>
                물에 잠긴 세계 007<br />
                수호 025<br />
                사라진 시간들 049<br />
                두 개의 바깥 081<br />
                서울로 내려가는 길 114<br />
                가라앉은 기억 127<br />
                끝과 시작 146<br />
                노을이 빈 자리 168<br />
                계속 여기에 176<br />
                너를 깨울 낱말 186<br /><br />

                작가의 말 191
            </p>,
        int_author:
            <p>
                단요 (지은이)<br /><br />

                사람 한 명과 함께 강원도에서 살고 있다. 사람이 사람이라서 생기는 이야기들을 즐겨 쓴다.<br />
                청소년 성장소설 《다이브》와 《마녀가 되는 주문》, 금융소설 《인버스》를 썼고, 문윤성 SF 문학상과 박지리문학상을 수상했다.
            </p>
    },
    {
        id: 9,
        type: 'steady',
        title: '달러구트 꿈 백화점',
        writer: '이미예',
        image: '../img/dream.jpg',
        intro_image: '../img/dream_intro.jpg',
        slide_image: '../img/dream_slide.jpg',
        background_color: '#1E150C',
        publisher: '팩토리나인',
        publishDate: '2020-07-08',
        compiler: '',
        from: '국내',
        category: '판타지',
        price: 13800,
        salePer: 10,
        sellCount: 1,
        salesRate: 105140,
        rank: 0,
        summary:
            <p>
                이미예 장편소설. 잠들어야만 입장할 수 있는 독특한 마을. 그곳에 들어온 잠든 손님들에게 가장 인기 있는 곳은, 온갖 꿈을 한데 모아 판매하는 '달러구트의 꿈 백화점'이다. 긴 잠을 자는 사람들은 물론이고, 짧은 낮잠을 자는 사람들과 동물들로 매일매일 대성황을 이룬다.
            </p>,
        contents:
            <p>
                작가의 말<br />
                프롤로그. 3번째 제자의 유서 깊은 가게<br />
                1. 주문하신 꿈은 매진입니다<br />
                2. 한밤의 연애지침서<br />
                3. 미래를 보여 드립니다.<br />
                4. 환불 요청 대소동<br />
                5. 노 쇼는 사양합니다.<br />
                6. 이 달의 베스트셀러<br />
                7. 비틀즈와 벤젠고리<br />
                8. ‘타인의 삶(체험판)’ 출시<br />
                9. 예약하신 꿈이 도착하였습니다<br />
                에필로그 1. 비고 마이어스의 면접<br />
                에필로그 2. 스피도의 완벽한 하루
            </p>,
        int_author:
            <p>
                이미예 (지은이)<br /><br />

                부산에서 태어났다. 부산대에서 재료공학을 공부하고 반도체 엔지니어로 일했다.<br />
                크라우드 펀딩 프로젝트 《주문하신 꿈은 매진입니다》(現 달러구트 꿈 백화점)으로 첫 소설을 발표해 후원자들의 열렬한 지지를 받아 성공적으로 펀딩을 종료하였다.<br />
                《달러구트 꿈 백화점》은 교보문고·영풍문고 2020 종합베스트셀러, 2020년 예스24·인터파크·알라딘·영풍문고에서 뽑은 ‘올해의 책’을 수상하였고, 서점인이 뽑은 2020 올해의 책, 2021년 부천·창원·포천·남양주시·용인시·의정부·대구 올해의 책으로 선정되었다. 또한, 2021년 상반기 교보문고, 예스24 종합베스트셀러 1위를 차지하였다.
            </p>
    },
    {
        id: 10,
        type: 'steady',
        title: '아몬드',
        writer: '손원평',
        image: '../img/almond.jpg',
        intro_image: '../img/almond_intro.jpg',
        slide_image: '../img/almond_slide.jpg',
        background_color: '#F5E9D9',
        publisher: '다즐링',
        publishDate: '2023-07-14',
        compiler: '',
        from: '국내',
        category: '소설',
        price: 16800,
        salePer: 10,
        sellCount: 1,
        salesRate: 8568,
        rank: 0,
        summary:
            <p>
                나에겐 아몬드가 있다. 당신에게도 아몬드가 있다.<br />
                당신이 가장 소중하게 여기거나 가장 저주하는 누군가도 그것을 가졌다.<br />
                아무도 그것을 느낄 수는 없다. 그저 그것이 있음을 알고 있을 뿐이다.
            </p>,
        contents:
            <p>
                프롤로그<br />
                1부<br />
                2부<br />
                3부<br />
                4부<br />
                에필로그<br />
                작가의 말<br />
                특별부록-단편 외전 『상자 속의 남자』
            </p>,
        int_author:
            <p>
                손원평 (지은이)<br /><br />

                서울에서 태어났다. 서강대에서 사회학과 철학을, 한국영화아카데미에서 영화연출을 전공했다.<br />
                장편소설 『서른의 반격』, 『프리즘』, 『튜브』, 소설집 『타인의 집』, 어린이책 『위풍당당 여우꼬리』 시리즈를 썼으며, 장편 영화 「침입자」의 각본 감독을 맡았다.<br />
                씨네21 영화평론상을 수상했으며, 『서른의 반격』으로 제5회 제주 4·3평화문학상, 일본서점대상을, 『프리즘』으로 일본서점대상, 일본 니쿠텐코보상을 수상했다.<br />
                등단작인 제10회 창비청소년문학상 수상작 『아몬드』은 아시아권 도서 최초로 일본서점대상 1위를 수상했으며 북미, 남미, 아시아, 유럽권의 30여 개국에 번역 수출됐다.
            </p>
    },
    {
        id: 11,
        type: 'recommend',
        title: '어린 왕자',
        writer: '앙투안 드 생텍쥐페리 ',
        image: '../img/prince.jpg',
        intro_image: '../img/prince_intro.jpg',
        publisher: '열린책들',
        publishDate: '2015-10-20',
        compiler: '황현산',
        from: '해외',
        category: '소설',
        price: 11800,
        salePer: '',
        sellCount: 1,
        salesRate: 12680,
        rank: 0,
        summary:
            <p>
                프랑스어 원문에 대한 섬세한 이해, 정확하고도 아름다운 문장력, 예리한 문학적 통찰을 고루 갖춘 번역으로 문학 번역에서 큰 입지를 굳혀 온 황현산은 이 작품을 새롭게 번역하면서 생텍쥐페리의 진솔한 문체를 고스란히 살려 내기 위해 심혈을 기울였다.
            </p>,
        contents:
            <p>
                목차 없는 상품입니다.
            </p>,
        int_author:
            <p>
                앙투안 드 생텍쥐페리 (Antoine de Saint Exupery) (지은이)<br /><br />

                1900년 프랑스 리옹에서 태어났다. 해군사관학교에 입학하고자 했으나 시험에서 실패하고 미술학교 건축과에 들어갔다. 1921년 공군에 입대해 조종사 면허를 땄고, 1926년 라테코에르에 들어가 아프리카 북서부와 남대서양 및 남아메리카를 통과하는 우편비행을 담당하게 되었다. 1930년대에는 시험비행사, 에어프랑스의 홍보담당, 파리수아르 Paris-Soir 기자로 일했다.<br />

                생텍쥐페리의 어린 시절 모습은 『어린왕자』의 주인공과 너무나 흡사하다. 굽슬굽슬한 갈색 머리털을 가진 소년 생텍쥐페리는 눈앞에서 벌어지는 온갖 사소한 일들을 경이와 찬탄으로 바라보았고, 유난히 법석을 떨고 잔꾀가 많은 반면, 항상 생기가 넘치고 영리했다. 감성이 풍부하고 미지에 대한 열정이 넘치던 그는 1917년 6월, 대학 입학 자격 시험에 합격한 후 파리로 가서 보쉬에 대학에 들어가 해군사관학교 입학을 준비하였으나 구술 시험에서 떨어져 파리 예술 대학에 들어가 15개월간 건축학을 공부했다.<br />
                『어린 왕자』에 생텍쥐베리가 직접 삽화를 그릴 수 있었던 것은 이때의 공부 때문이다.<br />
                자동차 회사, 민간항공 회사에 각각 근무하다가 에르 프랑스의 전신인 라테코에르 항공사에 입사하여 『야간 비행』의 주인공인 리비에르로 알려진 디디에도라를 알게 되고 다카르-카사블랑카 사이의 우편 비행을 하면서 밤에는 『남방 우편기』를 집필하였다. 1929년 아르헨티나의 항공사에 임명되면서 조종사로 최고의 시간을 보내게 된다. 이때의 경험을 토대로 『야간 비행』를 집필했다.<br />

                1939년 육군 정찰기 조종사가 되었으며, 1940년 2차세계대전으로 프랑스가 독일에 함락되자 미국으로 탈출했다. 1943년 연합군에 합류해 북아프리카 공군에 들어간 후 1944년 7월 31일 프랑스 남부 해안을 정찰비행하다 행방불명되었다. 2000년, 한 잠수부가 프랑스 마르세유 근해에서 생텍쥐페리와 함께 실종됐던 정찰기 P38의 잔해를 발견했고 뒤이은 2004년 프랑스 수중탐사팀이 항공기 잔해를 추가 발견했다.
            </p>
    },
    {
        id: 12,
        type: 'recommend',
        title: '나의 라임오렌지나무',
        writer: 'J.M. 바스콘셀로스',
        image: '../img/limeOrangeTree.jpg',
        intro_image: '../img/limeOrangeTree_intro.jpg',
        publisher: '동녘',
        publishDate: '2022-09-20',
        compiler: '박동원',
        from: '해외',
        category: '소설',
        price: 16000,
        salePer: 10,
        sellCount: 1,
        salesRate: 9540,
        rank: 0,
        summary:
            <p>
                2022년 출간 40주년을 기념해 새롭게 출간하는 ‘스페셜 에디션’은 2003년 ‘보급판’으로 출간했던 기존의 표지를 감각적인 디자인으로 새롭게 단장했고, 1968년 브라질에서 출간된 초판의 오리지널 본문 일러스트를 사용했다.
            </p>,
        contents:
            <p>
                1부<br />
                때로는 크리스마스에도 악마 같은 아이가 태어난다<br /><br />

                1. 철드는 아이<br />
                2. 어떤 라임오렌지나무<br />
                3. 가난에 찌든 손가락<br />
                4. 작은 새, 학교 그리고 꽃<br />
                5. 네가 감옥에서 죽는 것을 보겠어<br /><br />

                2부<br />
                아기 예수는 슬픔 속에서 태어났다<br /><br />

                1. 박쥐<br />
                2. 정복<br />
                3. 이런저런 이야기<br />
                4. 잊을 수 없는 두 차례의 매<br />
                5. 엉뚱하고도 기분 좋은 부탁<br />
                6. 사랑의 조각들<br />
                7. 망가라치바<br />
                8. 늙어가는 나무들<br />
                9. 마지막 고백<br /><br />

                옮긴이의 말
            </p>,
        int_author:
            <p>
                J.M. 바스콘셀로스 (Jose Mauro De Vasconcelos) (지은이)<br /><br />

                1920년 브라질 히우지자네이루 외곽에 있는 방구시에서 태어났다. 가난으로 인해 불우한 어린 시절을 보냈고, 의대에 진학했지만 학업을 중단하고 권투선수, 바나나 농장 인부, 그림 모델, 어부, 초등학교 교사 등 다양한 직업을 전전했다. 이러한 경험이 문학적 밑바탕이 되어 1942년 《성난 바나나(Banana Brava)》로 작품 활동을 시작했고, 1962년에 발표한 《호징냐, 나의 쪽배(Rosinha, Minha Canoa)》로 평단의 찬사를 받으며 작가로서 입지를 다졌다.
            </p>
    },
    {
        id: 13,
        type: 'recommend',
        title: '키다리 아저씨',
        writer: '진 웹스터',
        image: '../img/longLegs.jpg',
        intro_image: '../img/longLegs_intro.jpg',
        publisher: '윌북',
        publishDate: '2020-05-20',
        compiler: '김율희 ',
        from: '해외',
        category: '소설',
        price: 12800,
        salePer: 10,
        sellCount: 1,
        salesRate: 4560,
        rank: 0,
        summary:
            <p>
                고아 소녀 주디가 대학이라는 새로운 세계를 만나 써 내려간 맑고 유쾌한 편지들, 『키다리 아저씨』. 젊은 여성 번역가들이 현대적 언어로 번역한 걸 클래식 『키다리 아저씨』에서는 주디의 활달하고 당찬 목소리를 그대로 살리고자 노력했다.
            </p>,
        contents:
            <p>
                추천의 글-대답 없는 편지를 기다리는, 보살피지 못한 마음속 내면아이 주디에게 | 정여울<br /><br />

                우울한 수요일<br />
                제루샤 애벗이 키다리 아저씨 스미스 씨에게 보낸 편지들
            </p>,
        int_author:
            <p>
                진 웹스터 (Alice Jane Chandler Webster) (지은이)<br /><br />

                본명은 앨리스 제인 챈들러 웹스터(Alice Jane Chandler Webster)다. 저자는 1901년 배서대학교에서 영문학과 경제학을 전공했으며 학창 시절부터 신문 기자로 활동하며 글쓰기에 대한 열정을 보였다.<br />
                또한 그녀는 일찍부터 교도소와 보육원에 깊은 관심을 가지고 이와 관련된 인권 활동을 펼치기도 했는데, 이러한 관심은 그녀의 작품 배경이 되기도 했다. 진 웹스터는 재학 시절에 창작한 단편 모음집 『패티가 대학에 갔을 때』가 성공하자 『키다리 아저씨』와 『속 키다리 아저씨』를 연이어 발표하면서 작가로서 당당히 자리매김하게 되었다.
            </p>
    },
    {
        id: 14,
        type: 'recommend',
        title: '식물적 낙관',
        writer: '김금희',
        image: '../img/plants.jpg',
        intro_image: '../img/plants_intro.jpg',
        publisher: '문학동네',
        publishDate: '2023-06-01',
        compiler: '',
        from: '국내',
        category: '에세이',
        price: 16500,
        salePer: 10,
        sellCount: 1,
        salesRate: 3054,
        rank: 0,
        summary:
            <p>
                김금희의 발코니 정원에 찾아온 연약하고도 강인한 식물들을 통한 깨달음의 기록이자, 식물을 매개로 만난 다정한 사람들과 만들어낸 환한 순간들의 기록이기도 한 이 책은 작가가 식물과 더불어 살아가며 통과하는 사계절의 풍경을 따라간다.
            </p>,
        contents:
            <p>
                서문 식물 하는 마음 _004<br /><br />

                1부 여름 정원에서 만나면<br /><br />

                내 방의 여름 군락지 _019<br />
                식물적 낙관 _024<br />
                우리는 마켓에 간다 _031<br />
                제주행 일기 _037<br />
                다정한 괭이밥 씨 _043<br />
                헤세와 울프의 여름 정원 _048<br />
                잘 자라는 일 _057<br />
                휴가와 발코니 _062<br /><br />

                2부 이별은 선선한 바람처럼<br /><br />

                삶이라는 덩어리 _071<br />
                집사 일기 _079<br />
                기도를 부탁해 _085<br />
                우리들의 세컨드 스텝 _092<br />
                올리브가 하는 일 _098<br />
                코로키아에 대해 비로소 알게 된 것 _104<br />
                참 괜찮은 제라늄 친구 _112<br />
                내가 아주 어렸을 때의 나무 _118<br />
                유기 식물 _124
            </p>,
        int_author:
            <p>
                김금희 (지은이)<br /><br />

                2009년 한국일보 신춘문예를 통해 작품활동을 시작했다. 소설집 『센티멘털도 하루 이틀』 『너무 한낮의 연애』 『오직 한 사람의 차지』 『우리는 페퍼로니에서 왔어』, 장편소설 『경애의 마음』 『복자에게』, 중편소설 『나의 사랑, 매기』, 연작소설 『크리스마스 타일』, 짧은 소설 『나는 그것에 대해 아주 오랫동안 생각해』, 산문집 『사랑 밖의 모든 말들』 등이 있다.<br />
                신동엽문학상, 젊은작가상 대상, 현대문학상, 우현예술상, 김승옥문학상 대상, 오늘의 젊은 예술가상 등을 수상했다.
            </p>
    },
    {
        id: 15,
        type: 'recommend',
        title: '그랜마북',
        writer: '엘마 판 플리트',
        image: '../img/grandma.jpg',
        intro_image: '../img/grandma_intro.jpg',
        publisher: '반비',
        publishDate: '2020-04-26',
        compiler: '반비 편집부',
        from: '해외',
        category: '에세이',
        price: 16500,
        salePer: 10,
        sellCount: 1,
        salesRate: 2651,
        rank: 0,
        summary:
            <p>
                할머니들의 이야기는 좀처럼 기록되지도, 기억되지도 않는다. 우리 사회에서 평범한 여성의 경험은 별로 중요하지 않고 특별할 것도 없다고 여겨왔기에 그럴지도 모르겠다. 특히 공적 교육을 받고 사회에서 활약할 기회가 거의 주어지지 않은, 자신의 이름 석 자로 불리기도 어려웠던 할머니 세대의 경험은 더더욱 주목받지 못했다.
            </p>,
        contents:
            <p>
                책을 돌려받은 모든 손주분들에게 5<br />
                이 책을 선물받은, 써내려 갈 할머니들께 6<br />
                이 책의 사용법 8<br /><br />

                1부 할머니가 아이였을 때 13<br />
                유년기에 대하여 15<br />
                가족에 대하여 32<br />
                부모님과 형제자매에 대하여 62<br /><br />

                2부 성장, 어른이 된다는 것 83<br />
                배움과 학교에 대하여 85<br />
                청소년기에 대하여 95<br />
                경제적인 자립에 대하여 104<br /><br />

                3부 사랑, 할머니가 된다는 것 115<br />
                사랑에 대하여 117<br />
                결혼과 출산에 대하여 124<br />
                할머니가 되는 것에 대하여 132<br /><br />

                4부 개인으로서의 삶 145<br />
                좋아하는 것들에 대하여 147<br /><br />

                5부 노년 이후의 삶 163<br />
                추억에 대하여 165<br />
                가치와 소망, 그리고 꿈에 대하여 184<br /><br />

                부록 우리 두 사람이 함께 205<br />
                나에 대해 말해주세요 207
            </p>,
        int_author:
            <p>
                엘마 판 플리트 (Elma van Vliet) (지은이)<br /><br />

                2001년 어머니가 갑자기 큰 병을 앓게 되자 엘마는 세상이 무너지는 느낌이었습니다.<br />
                당시에 엘마는 광고홍보회사에 다니며 아주 바쁘게 살아가고 있었고, 그런 삶에 충분히 만족하고 있었습니다. 그런데 엄마가 더 이상 존재하지 않는 시간에 대해 생각이 미치자, 모든 것이 바뀌었지요. 어머니는 필요할 때 항상 그 자리에 있는 사람인 줄 알았던 겁니다.<br />아직 어머니에게 물어보고 싶은 것들이 너무나 많았습니다. 어떤 사람이었는지, 어떤 크고 작은 꿈들을 꾸었는지……. 이 질문들에 대한 답을 듣기 위해 엘마는 『마더북(Mam Vertel Eens)』이라는 책을 만들기로 했습니다.
            </p>,
        name: ''
    },
    {
        id: 16,
        // type:'',
        title: '아들은 아버지의 등을보고 자란다',
        writer: '배정현',
        // compiler:'',
        image: '../img/bjh.jpg',
        price: 777,
        name: '배정현'
    },
    {
        id: 17,
        // type:'',
        title: '삐뽀삐뽀 이유식',
        writer: '배정현',
        // compiler:'',
        image: '../img/bjh01.jpg',
        price: 777,
        name: '배정현'
    },
    {
        id: 18,
        // type:'',
        title: '희상봇 GPT',
        writer: '은희상',
        // compiler:'',
        image: '../img/ehs.jpg',
        price: 777,
        name: '은희상'
    },
    {
        id: 19,
        // type:'',
        title: '승호님은 파워 엘리트',
        writer: '최승호',
        // compiler:'',
        image: '../img/csh.jpg',
        price: 777,
        name: '최승호'
    },
    {
        id: 20,
        // type:'',
        title: '어성은 졸업 축하해',
        writer: '어성은',
        // compiler:'',
        image: '../img/ese.jpg',
        price: 777,
        name: '어성은'
    },
    {
        id: 21,
        // type:'',
        title: '필라테스 여제 어성은',
        writer: '어성은',
        // compiler:'',
        image: '../img/ese01.jpg',
        price: 777,
        name: '어성은'
    },
    {
        id: 22,
        // type:'',
        title: 'MBTI박사 조현주',
        writer: '조현주',
        // compiler:'',
        image: '../img/jhj.jpg',
        price: 777,
        name: '조현주'
    },
    {
        id: 23,
        // type:'',
        title: '찬미씨 잘한다 잘해.. 고수야',
        writer: '김찬미',
        // compiler:'',
        image: '../img/kcm.jpg',
        price: 777,
        name: '김찬미'
    },
    {
        id: 24,
        // type:'',
        title: '김이지 만만해보이는데..만만하지않네',
        writer: '김이지',
        // compiler:'',
        image: '../img/kej.jpg',
        price: 777,
        name: '김이지'
    },
    {
        id: 25,
        // type:'',
        title: '나는 김진...아니 비둘기야',
        writer: '김진휘',
        // compiler:'',
        image: '../img/kjh.jpg',
        price: 777,
        name: '김진휘'
    },
    {
        id: 26,
        // type:'',
        title: '진휘야 학원가자~',
        writer: '김진휘',
        // compiler:'',
        image: '../img/kjh01.jpg',
        price: 777,
        name: '김진휘'
    },
    {
        id: 27,
        // type:'',
        title: '술이 너무 좋은 소라쨩',
        writer: '김소라',
        // compiler:'',
        image: '../img/ksr.jpg',
        price: 777,
        name: '김소라'
    },
    {
        id: 28,
        // type:'',
        title: '노력파는 아무도 못당해',
        writer: '이진기',
        // compiler:'',
        image: '../img/ljk.jpg',
        price: 777,
        name: '이진기'
    },
    {
        id: 29,
        // type:'',
        title: '푸바오 팬 이성룡',
        writer: '이성룡',
        // compiler:'',
        image: '../img/lsr.jpg',
        price: 777,
        name: '이성룡'
    },
    {
        id: 30,
        // type:'',
        title: '너 생각보다 너는 더 잘할 수 있어 우리야',
        writer: '남우리',
        // compiler:'',
        image: '../img/nwr.jpg',
        price: 777,
        name: '남우리'
    },
    {
        id: 31,
        // type:'',
        title: '말이 너무 많아..원희야',
        writer: '오원희',
        // compiler:'',
        image: '../img/owh.jpg',
        price: 777,
        name: '오원희'
    },
    {
        id: 32,
        // type:'',
        title: '너무 착해..가끔 바보같기도..',
        writer: '신혜진',
        // compiler:'',
        image: '../img/shj.jpg',
        price: 777,
        name: '신혜진'
    },
    {
        id: 33,
        // type:'',
        title: '친해지고싶어요..수현님',
        writer: '설수현',
        // compiler:'',
        image: '../img/ssh.jpg',
        price: 777,
        name: '설수현'
    },
    {
        id: 34,
        // type:'',
        title: '댄스~ 댄스~ 댄스여제 유희상',
        writer: '유희상',
        // compiler:'',
        image: '../img/yhs.jpg',
        price: 777,
        name: '유희상'
    },
    {
        id: 35,
        // type:'',
        title: '우리반 멋쟁이 제승이',
        writer: '연제승',
        // compiler:'',
        image: '../img/yjs.jpg',
        price: 777,
        name: '연제승'
    },
    {
        id: 36,
        // type:'',
        title: '지금 잘하고있어',
        writer: 'kdt 4기',
        // compiler:'',
        image: '../img/kdt.jpg',
        price: 777,
        name: 'KDT 4기'
    },
    {
        id: 37,
        // type:'',
        title: '괜찮아 잘하고있어',
        writer: 'kdt 4기',
        image: '../img/kdt01.jpg',
        price: 777,
        name: 'KDT 4기'
    },
    {
        id: 38,
        // type:'',
        title: '정시 퇴근맨 진혁쿤 제승쿤',
        writer: '안진혁 연제승',
        image: '../img/ajh.jpg',
        price: 777,
        name: '안진혁 연제승'
    },
    {
        id: 39,
        // type:'',
        title: '백엔드.. 믿어요 강사님..!',
        writer: '엄미현',
        image: '../img/umh.jpg',
        price: 777,
        name: '강사님'
    },
    {
        id: 40,
        // type:'',
        title: '너무..많아요ㅠ 빨라요ㅠ',
        writer: '엄미현',
        image: '../img/umh01.jpg',
        price: 777,
        name: '강사님'
    },
    {
        id: 41,
        // type:'',
        title: '종종 나오는 버럭쌤ㅎㅎ',
        writer: '엄미현',
        image: '../img/umh02.jpg',
        price: 777,
        name: '강사님'
    },
    {
        id: 42,
        // type:'',
        title: '얘들아? 이거 아니잖아 그치..? 아니라고해 얼른..😢',
        writer: '양세현',
        image: '../img/ysh.jpg',
        price: 777,
        name: '양세현'
    },
    {
        id: 43,
        // type:'',
        title: '후... 주먹이 운다 너네👊👊',
        writer: '김해림 오원희 김이지 어성은',
        image: '../img/punch.jpg',
        price: 777,
        name: '누구 누구일까?'
    },
    {
        id: 44,
        // type:'',
        title: '늘 모른다는 히상봇ㅠ.ㅠ',
        writer: '은희상',
        image: '../img/ehs01.jpg',
        price: 777,
        name: '은희상'
    },


    {
        id: 45,
        type: 'item',
        title: '춘식이 무드등',
        image: '../img/popup01.jpg',
        intro_image: '../img/popup01_intro.jpg',
        price: 11900,
        salePer: 2,
        rank: 0,
    }
]
export const book_list_context = createContext(book_list);


const notice_list = [
    {
        logo: '../img/fox_logo.png',
        id: 1,
        title: '프로젝트 고생많았습니다',
        content: `드디어 오늘 2차 프로젝트 발표날 이네요.
                모두 그동안 고생 정말 많았어요. 결과물이 중요하다면 중요하겠지만..
                오늘 하루 그동안의 고생은 잊고 행복하고 기분좋은 하루가 되길 바랍니다.`,
        image: '../img/notice_content_happy.gif',
        createDate: "2023-08-24",
        hits: 76
    },
    {
        id: 2,
        title: '[이벤트] 나의 최애 도서를 소개해주세요.',
        content: `안녕하세요. 여우책방을 이용하는 고객여러분.
        여러분이 가장 좋아하고 다른 사람에게 추천하고싶은 책이 있으신가요?
        재미있는 책, 의미있는 책, 감명받은 책 등등 여러분의 책을 추천 해주세요!
        `,
        image: '../img/notice_event01.png',
        createDate: "2023-08-09",
        hits: 6
    },
    {
        id: 3,
        title: '8월 택배 없는 날 및 광복절 택배 배송일정 안내',
        content: `안녕하세요 여우책방 입니다.
                8월14일 택배 없는 날과 8월15일 광복절 기간 한샘생활용품 택배 배송일정 안내드립니다.
                아래 일정을 확인하시고 구매해주시길 부탁드리겠습니다.
                감사합니다.`,
        image: '../img/august_delivery.jpg',
        createDate: "2023-08-09",
        hits: 52
    },
    {
        id: 4,
        title: '검색창 이용안내',
        content: '검색창에 각자 이름을 검색해보세요!!!',
        createDate: "2023-07-19",
        hits: 31
    },
    {
        id: 5,
        title: '여우책방 시스템 점검 안내',
        content: `안녕하세요.\n
                여우책방을 이용해 주시는 고객님께 감사드립니다.
                고객님들께 향상된 서비스를 제공하기 위하여 시스템 점검 작업이 진행될 예정입니다.

                --------------------------------- 아  래 -----------------------------

                1. 일정 : 2023년 8월 2일(수) 오전 03:00 ~ 06:00 
                    (약 3시간 예상)      

                2. 작업 내역 : 여우책방 네트워크 업그레이드 작업

                ----------------------------------------------------------------------

                상기 일정 동안 여우책방 이용이 불가능합니다.
                서비스 이용에 불편을 드려 죄송합니다.
                앞으로 더 좋은 서비스로 보답하고자 노력하겠습니다.
                감사합니다.`,
        createDate: "2023-07-12",
        hits: 21
    },
    {
        id: 6,
        title: '카카오톡 채널(플러스 친구) 주의 안내!',
        content: `여우책방 또는 입점업체는 카카오톡으로 주문 거래 유도 또는 환불 & 배송 금액에 대한 
            어떠한 요구도 하지 않습니다.                
            계좌 입금 등을 유도하는 경우 응하지 마시고 여우책방으로 신고해 주세요!                
            여우책방 고객센터 1588-155
            사이트 문의: http://localhost:3000/CustomerServiceCategory/CustomerServiceMailInquires         
            감사합니다.`,
        createDate: "2023-07-05",
        hits: 81
    },
    {
        id: 7,
        title: '여러분 모두 잘하고 있습니다.',
        content: '각자의 방식으로 정말 열심히.. 잘 하고있어요 열분..',
        image: '../img/notice_content_cheerUp.gif',
        createDate: "2023-06-21",
        hits: 108
    },
    {
        id: 8,
        title: '여우책방 시스템 점검 안내',
        content: `안녕하세요.\n
        여우책방을 이용해 주시는 고객님께 감사드립니다.
        고객님들께 향상된 서비스를 제공하기 위하여 시스템 점검 작업이 진행될 예정입니다.

        --------------------------------- 아  래 -----------------------------

        1. 일정 : 2023년 6월 14일(수) 오전 03:00 ~ 06:00 
            (약 3시간 예상)      

        2. 작업 내역 : 여우책방 네트워크 업그레이드 작업

        ----------------------------------------------------------------------

        상기 일정 동안 여우책방 이용이 불가능합니다.
        서비스 이용에 불편을 드려 죄송합니다.
        앞으로 더 좋은 서비스로 보답하고자 노력하겠습니다.
        감사합니다.`,
        createDate: "2023-06-14",
        hits: 77
    },
    {
        id: 9,
        title: '이달의 도서 나눔 이벤트 내용 안내',
        content: '',
        createDate: "2023-06-14",
        hits: 54
    },
    {
        id: 10,
        title: '클릭하지 마세요.',
        content: `클릭하지 말랑게..!!
        들어온김에 크게 웃고 가.`,
        createDate: "2023-06-07",
        image: '../img/notice_content_smile.gif',
        hits: 15
    }
];
export const notice_list_context = createContext(notice_list);

const event_item_list = [
    {
        id: 0,
        title: '8월의 굿즈',
        content: `많은 고객분들께서 참여해주셔서 준비한 모든 상품이 품절된 상태입니다.
        재고 조기 소진으로 인해 이벤트가 조기 종료되었습니다.
                많은 관심과 참여 감사드립니다.`,
        image: '../img/event01.png',
        view_image: '../img/event01_view.png',
        end_image: '../img/event_end_sorry.png',
        date: '2023.08.16 ~ 2023.08.31'
    }
];
export const event_item_list_context = createContext(event_item_list);

const footer_menu_list = [
    {
        id: 1,
        title: '회사소개',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.`
    },
    {
        id: 2,
        title: '이용약관',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.`
    },
    {
        id: 3,
        title: '개인정보처리방침',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.`
    },
    {
        id: 4,
        title: '청소년 보호정책',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.`
    },
    {
        id: 5,
        title: '제휴 마케팅 안내',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.`
    },
    {
        id: 6,
        title: '광고안내',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste earum quibusdam voluptates tempora. Nostrum amet
        nobis eligendi sequi nihil earum mollitia, dolorum quia natus, excepturi distinctio ad accusamus, doloremque
        officia.`
    }
];
export const footer_menu_list_context = createContext(footer_menu_list);