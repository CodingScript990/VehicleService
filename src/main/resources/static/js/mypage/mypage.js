{

    const titleElem = document.querySelector('#mypage_title');
    const iuser = document.querySelector('#iuser');

    const pageContainerElem = document.querySelector('#like_container');
    const ulElem = pageContainerElem.querySelector('nav > ul');
    let currentPage = 1; //현재 페이지
    let maxPage = 1;
    const recordCount = 5; //레코드 수
    const pagingCount = 5; //페이징의 페이징 수

    if(titleElem){ //마이페이지 돌아가기
        titleElem.addEventListener('click', ()=>{
            location.href=`/mypage/userinfo`;
        });
    }

    if(iuser ==null){ //비로그인상태에서 마이페이지 접근 시 로그인창으로
        location.href = `/user/login`;
    }

    function jjimEvent(pk, target){ //좋아요 이벤트
        let selliboard = pk;

        let iElem = target.querySelector('i');
        if (iElem.classList.contains('fa-regular')){//찜
            iElem.classList.remove('fa-regular');
            iElem.classList.add('fa-solid');
            target.classList.add('btn-outline-danger');

            myFetch.get(`/ajax/vehicle/likes/${selliboard}`);
        }else { //찜 취소
            iElem.classList.remove('fa-solid');
            iElem.classList.add('fa-regular');
            target.classList.remove('btn-outline-danger');

            myFetch.delete(`/ajax/vehicle/dellikes/${selliboard}`);
        }
    }

    const getList = () => {
        myFetch.get(`/ajax/mypage/likes`, data => {
            makeRecordList(data);
        }, { currentPage, recordCount });
    }

    const getMaxPageVal = () => {
        myFetch.get('/ajax/mypage/maxpage', data => {
            maxPage = data.result;
            pagecount();
        }, {recordCount});
    }
    getMaxPageVal();

    const pagecount = () => {
        ulElem.innerHTML = null;
        const calcPage = parseInt((currentPage - 1) / pagingCount);
        const startPage = (calcPage * pagingCount) + 1;
        const lastPage = (calcPage + 1) * pagingCount;

        if(startPage > 1) {
            makePagingItem('&lt;', () => {
                currentPage = startPage - 1;
                getList();
                pagecount();
            });
        }
        for(let i=startPage; i<=(lastPage > maxPage ? maxPage : lastPage); i++) {
            makePagingItem(i, () => {
                if(currentPage !== i) {
                    currentPage = i;
                    getList();
                }
            });
        }
        if(maxPage > lastPage) {
            makePagingItem('&gt;', () => {
                currentPage = lastPage + 1;
                getList();
                pagecount();
            });
        }
    }

    const makePagingItem = (val, cb) => {
        const liElem = document.createElement('li');
        liElem.className = 'page-item page-link pointer';
        liElem.innerHTML = val;
        liElem.addEventListener('click', cb);
        ulElem.appendChild(liElem);
    }

    const makeRecordList = list =>{
        const likeresult = document.querySelector('#like_result > .row');

        if(likeresult){
            likeresult.innerHTML = '';
            list.forEach(item =>{
                const resultdiv = document.createElement('div');
                resultdiv.className = "col";
                resultdiv.innerHTML =`
                    <div class="container shadow-sm bg-white g-2">
                        <div class="row">
                            <input type="hidden" value="${item.selliboard}">
                            <picture class="col-sm col-md-3 g-3">
                                <img class="img-fluid" src="/vehicleImg/${item.selliboard}/${item.mainimg}" alt="이미지 없음">
                            </picture>
                            <div class="col-sm col-md-9 g-3">
                                <h4 class="result_title">${item.detail_model}</h4>
                                <p>${item.price}만원</p>
                                <p>${item.trading_area}</p>
                            </div>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button type="button" class="btn btn-primary position-relative">
                                유저1
                                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    5
                                    <span class="visually-hidden">읽지않은메세지</span>
                                </span>
                            </button>
                            </div>
                `;
                let fullBtnDiv = document.createElement('div');
                fullBtnDiv.classList.add('g-4')
                fullBtnDiv.innerHTML = `
                            <div class="d-flex justify-content-end align-items-center">
                                <button type="button" class="btn jjimBtn" onclick="jjimEvent(${item.selliboard}, this);">
                                    <i class="fa-regular fa-heart"></i>좋아요
                                </button>
                            </div>                            
                            `;

                let nonBtnDiv = document.createElement('div');
                nonBtnDiv.classList.add('g-4')
                nonBtnDiv.innerHTML = `
                            <div class="d-flex justify-content-end align-items-center">                            
                                <button type="button" class="btn jjimBtn btn-outline-danger" onclick="jjimEvent(${item.selliboard}, this);">
                                    <i class="fa-solid fa-heart"></i>좋아요
                                </button>
                            </div>
                            `;

                if(iuser){
                    myFetch.get(`/ajax/vehicle/sellike?selliboard=${item.selliboard}`,data=>{
                        switch (data){
                            case 1:
                                resultdiv.querySelector('.g-2').append(nonBtnDiv)
                                break;
                            case 0:
                                resultdiv.querySelector('.g-2').append(fullBtnDiv)
                                break;
                        }
                    });
                }
                likeresult.appendChild(resultdiv);

                window.sessionStorage.getItem("loginUser")
                const imgElem = resultdiv.querySelector('.img-fluid');
                const titleElem = resultdiv.querySelector('.result_title');
                detailevent(imgElem);
                detailevent(titleElem);

                function detailevent(param) {
                    param.addEventListener('click', () => {
                        location.href = `/vehicle/detail?selliboard=${item.selliboard}`;
                    })
                }
            })
        }
    }
    function jjimAll(){
        if(confirm("정말로 모두 삭제하시겠습니까?")){
            myFetch.delete(`/ajax/mypage/dellikes`);
            window.location.href =`/mypage/like`;
        }
    }
    getList();
}