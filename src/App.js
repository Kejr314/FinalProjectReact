import './App.css';
import { useState } from 'react'

function App() {

  let logo = 'ReactBlog';
  // let title = ['남자 코트 추천', '강남 우동 맛집', '파이썬 독학'];
  // let [글제목, b] = useState(title);
  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']);
  let [좋아요, 좋아요변경] = useState([1, 2, 3]);
  let [modal, setModal] = useState(false); // 모달창 상태 표현. 형식은 자유. ex) 보임 : true, 1, 열림 / 안보임 : false, 0, 닫힘 등
  let [detailTitle, setDetailTitle] = useState(0); // 2. 현재 UI (상세페이지의 제목)의 상태를 state로 만들기. 0 = 첫번째 글 제목, 2 = 두번째 글 제목, 3 = 세변째 글 제목

  // 가나다순정렬
  function arrayTitle() {
    let copy = [...글제목].sort();
    글제목변경(copy);
  }

  // 글 제목 수정
  function changeTitle() {
    let copy = [...글제목];
    copy[0] = '여자 코트 추천';
    글제목변경(copy);
  }

  return (
    <div className="App">
      <div className="black-nav">
        <h4>{ logo }</h4>
      </div>

      <button onClick={ arrayTitle }>가나다순정렬</button>
      {/* <button onClick={ changeTitle }>글 수정</button> */}

      {/* <div className="list">
        <h4 onClick={ ()=>{ setModal(!modal)}}>{ 글제목[0] } <span onClick={ () => { 좋아요변경(좋아요 + 1) } }>👍</span> { 좋아요 } </h4>  
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4 onClick={ ()=>{ setModal(!modal)} }>{ 글제목[1] }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4 onClick={ ()=>{ setModal(!modal)} }>{ 글제목[2] }</h4>
        <p>2월 17일 발행</p>
      </div> */}


      {
        글제목.map(function(a, i) {
          return (
            <div className="list" key={i}>
              {/* <h4 onClick={ ()=>{ setModal(!modal)}}>{ a } <span onClick={ () => { 좋아요변경(좋아요 + 1) } }>👍</span> { 좋아요 } </h4> */}
              <div className="layout">
                <h4 onClick={ ()=>{ setModal(!modal); setDetailTitle(i)}}>{ 글제목[i] } </h4> {/* 3. state 종류에 따라서 UI가 어떻게 보일지 작성. setDetailTitle(i) 추가 */}
                <span className="favoriteButton" 
                  onClick={ () => {
                    let copy = [...좋아요];
                    copy[i] = copy[i] + 1;
                    좋아요변경(copy)
                  } }> 👍 { 좋아요[i] } 
                </span> 
              </div>
              <p>2월 17일 발행</p>
            </div>
          )}
        )
        
      }
      {
        modal === true ? <Modal 글제목={글제목} 글제목변경={글제목변경} detailTitle={detailTitle}/> : null
      }
      
    </div>
  );
}

function Modal(props) {
  // let [detailTitle, setDetailTitle] = useState(0);
  return(
    // 1. html, css 만들기
    <div className="modal">
      <h4>{props.글제목[props.detailTitle]}</h4> {/* 4. detailTitle 이라는 스위치를 0, 1, 2로 바꿔주면 그때마다 알맞은 글이 모달창에 표시됨 */}
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={() => { 
        let copy = [...props.글제목];
        copy[0] = '여자 코트 추천';
        props.글제목변경(copy)}}>글 수정
      </button>
    </div>
  )
}

export default App;
