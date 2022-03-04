//국산수입 버튼 이벤트 ---------------------------------------------- [start]
const domBtn = document.querySelector('#dom_inc_btn > button:first-child');
const incBtn = document.querySelector('#dom_inc_btn > button:last-child');

function focusBtnChange(focusBtn, otherBtn, color, background_color) {
    otherBtn.style = '';
    focusBtn.style['color'] = color;
    focusBtn.style['background-color'] = background_color;
    focusBtn.style['font-weight'] = 'bold';
}

//focusBtnChange(domBtn, incBtn, 'white', 'rgb(123, 209, 240)');
incBtn.addEventListener('click', () => {
    focusBtnChange(incBtn, domBtn, 'white', 'rgb(123, 209, 240)');
});
domBtn.addEventListener('click', () => {
    focusBtnChange(domBtn, incBtn, 'white', 'rgb(123, 209, 240)');
});
//국산수입 버튼 이벤트 ---------------------------------------------- [end]

//인기매물 슬라이드 ------------------------------------------------- [start]
const psListElem = document.querySelector('#popular_sales_list');   //list
const psImgElem = document.querySelectorAll('.popular_sales_img');  //list개별요소
const psList_Count = psListElem.children.length;                //list개별요소 개수

let plusVal = 0;
function plusPercent(psList_Count) {
    for(let i=1; i<=psList_Count; i++) {
        if((i%3) === 1) {
            plusVal += 30;
        } else {
            plusVal += 35;
        }
        // console.log(i+':'+plusVal)
    }
    return plusVal;
}

psListElem.style.cssText = `width : calc(${plusPercent(psList_Count)}%);`;

psImgElem.forEach((item) => {
    item.style.cssText = `width : calc(30%);`
    let itemkey = Object.keys(psImgElem).find(key => psImgElem[key] === item);
    const psListGap1 = document.createElement('div');              //사이거리
    const psListGap2 = document.createElement('div');              //사이거리
    psListGap1.style.cssText = `width : calc(5%);`;
    psListGap2.style.cssText = `width : calc(5%);`;
    if((itemkey % 3) === 1) {
        $(item).before(psListGap1);
        $(item).after(psListGap2);
    }
});

const prevBtn = document.querySelector('.popPrev');
const nextBtn = document.querySelector('.popNext');

let index = 0;
prevBtn.addEventListener('click', () => {
    if (index === 0) return;
    index = index - 1;
    psListElem.style.marginLeft = `${-index * 100}%`
});

nextBtn.addEventListener('click', () => {
    if (index === 2) return;
    index = index + 1;
    psListElem.style.marginLeft = `${-index * 100}%`
});
//인기매물 슬라이드 ------------------------------------------------- [end]

//제조사, 모델, 상세모델 -------------------------------------------- [start]
var json=null ;
var companyList ; // 제조사 리스트
var modelList;   // 모델리스트
var detailModelList; //세부모델리스트

fetch("/json/MOCK_DATA.json") // json파일 가져오기
    .then(response => {
        return response.json();
    }).then(jsondata =>
    json = jsondata
);

function ko(index){
    companyList = json.result[index].companyList; //0 국산 1 수입 제조사리스트 저장

    var target = option_reset("country_select");
    option_reset("model_select");
    option_reset("detail_model_select");
    for(var i=0; i<companyList.length; i++){ //제조사 옵션에 추가
        var opt = document.createElement("option");
        opt.value = companyList[i].company;

        opt.innerHTML = companyList[i].company;
        target.appendChild(opt);
    }
}

function addChange(e){
    var target = option_reset("model_select");
    option_reset("detail_model_select");
    for(var i=0; i<companyList.length; i++){
        if(e.value == companyList[i].company) {
            modelList= companyList[i].modelList;// 해당 제조사의 모델리스트 담기
        }
    }

    for(var i=0; i<modelList.length; i++){  //선택된 제조사의 모델 옵션에 담기
        var opt = document.createElement("option");
        opt.value = modelList[i].model;
        opt.innerHTML = modelList[i].model;
        target.appendChild(opt);
    }
    if(e.value==='제조사'){
        target.options.length = 1;
    }
}

function addChange2(e){
    var target = option_reset("detail_model_select");
    for(var i=0; i<modelList.length; i++){
        if(e.value == modelList[i].model) {
            detailModelList= modelList[i].detailModelList; //선택된 모델의 세부모델 리스트 담기
        }
    }
    for(var i=0; i<detailModelList.length; i++){ //선택된 모델의 세부모델 옵션에 담기
        var opt = document.createElement("option");
        opt.value = detailModelList[i].detailModel;
        opt.innerHTML = detailModelList[i].detailModel;
        target.appendChild(opt);
    }
}

function option_reset(str){
    var target = document.getElementById(`${str}`)
    target.options.length = 1;
    return target;
}
//제조사, 모델, 상세모델 -------------------------------------------- [end]

//고객센터 > 질문게시판/공지사항 ------------------------------------- [start]
const qna_board_btn = document.querySelector('#qn_btns > button:first-child');  //질문게시판버튼
const notice_board_btn = document.querySelector('#qn_btns > button:last-child');//공지사항버튼
const qna_boardElem = document.querySelector('#qn_mini_board > div:first-child');//질문게시판
const notice_boardElem = document.querySelector('#qn_mini_board > div:last-child');//공지사항

focusBtnChange(qna_board_btn, notice_board_btn, 'white', 'rgb(113, 216, 253)');
notice_boardElem.style.cssText = 'border-bottom: 1px solid rgb(113, 216, 253);';

qna_board_btn.addEventListener('click', () => {
    focusBtnChange(qna_board_btn, notice_board_btn, 'white', 'rgb(113, 216, 253)');
    qna_boardElem.style.cssText = "display: flex;";
    notice_boardElem.style.display = "none";
    notice_boardElem.style.cssText = 'border-bottom: 1px solid rgb(113, 216, 253);';
});
notice_board_btn.addEventListener('click', () => {
    focusBtnChange(notice_board_btn, qna_board_btn, 'white', 'rgb(113, 216, 253)');
    notice_boardElem.style.display = "flex";
    qna_boardElem.style.cssText = 'display: none; border-bottom: 1px solid rgb(113, 216, 253);';
});

//고객센터 > 보험료 조회
const insurance_btn = document.querySelector('#insurance_btn');
const insurance_boardElem = document.querySelector('#insurance_board');

insurance_btn.addEventListener('click', () => {
    if(insurance_boardElem.style.display === "block") {
        insurance_boardElem.style.display = "none";
    } else {
        insurance_boardElem.style.display = "block";
    }
});
//고객센터 > 질문게시판/공지사항 ------------------------------------- [end]
const btnSubmit = document.querySelector('#btnSubmit');
btnSubmit.addEventListener('click',input_check)//submit 클릭

function input_check(){
    const manufacturer = document.getElementById('country_select').value;
    const model = document.getElementById('model_select').value;
    const detail_model = document.getElementById('detail_model_select').value;
    if(manufacturer==='제조사') {
        alert("검색할 제조사를 선택해 주십시오")
    }else{
        myFetch.get(`/ajax/vehicle/homSearch`, data => {
            if(data.length==0){
                alert('검색결과가 없습니다.')
            }else{
                localStorage.setItem("cast", JSON.stringify(data));
                location.href='vehicle/list';
            }
        },{
            'manufacturer':manufacturer==="제조사"?null:manufacturer,
            'model':model==="모델"?null:model,
            'detail_model':detail_model==="세부모델"?null:detail_model
        });
    }
}

//날씨정보 뿌리기 ---------------------------------------------- [start]
const API_KEY = "871242005db9771ca1c90b14fd7046bd"; /*회원가입을 하면 자동으로 키발급해준다*/

let weatherIcon = {
    '01' : 'fas fa-sun',
    '02' : 'fas fa-cloud-sun',
    '03' : 'fas fa-cloud',
    '04' : 'fas fa-cloud-meatball',
    '09' : 'fas fa-cloud-sun-rain',
    '10' : 'fas fa-cloud-showers-heavy',
    '11' : 'fas fa-poo-storm',
    '13' : 'far fa-snowflake',
    '50' : 'fas fa-smog'
};

function onGeoOk(position){ /*position: 함수의 기본객체 user의 위치를 얻는다*/
    const lat = position.coords.latitude; //위도가져오기
    const lon = position.coords.longitude; //경도가져오기
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`; /*경도, 위도, api키를 넣어 날씨정보를 가져온다
    units=metric : 온도를 섭씨로 변환(옵션이다)*/
    fetch(url).then(res => /*fetch는 프로미스(당장 뭔가일어나지않고 시간이좀걸린뒤 일어남)임 응답을 then으로 받음*/
        res.json()).then((data) =>{
        const weather = document.querySelector('#weather span:nth-child(1)');
        const city = document.querySelector('#weather span:nth-child(2)');
        const icon = document.querySelector('#weather span:nth-child(3)');
        weather.innerText = `${data.weather[0].main}/${data.main.temp}`;
        city.innerText = data.name;
        icon.className = weatherIcon[(data.weather[0].icon).substr(0,2)];
    });
}
function onGeoError(){
    alert('위치 및 날씨정보를 불러올수 없습니다.');
}
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError); /*브라우저에서 위치좌표(위도,경도)를줌 첫번째인자: 성공했을때 두번째인자: 실패했을때*/
//날씨정보 뿌리기 ---------------------------------------------- [end]
