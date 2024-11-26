import './App.css';
import React from 'react';
import { useState } from 'react'

function App() {

  let logo = 'ReactBlog';
  // let title = ['남자 코트 추천', '강남 우동 맛집', '파이썬 독학'];
  // let [글제목, b] = useState(title);
  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']);
  let [좋아요, 좋아요변경] = useState([0, 0, 0]);
  // 모달창 상태 표현. 형식은 자유. ex) 보임 : true, 1, 열림 / 안보임 : false, 0, 닫힘 등
  let [modal, setModal] = useState(false); 
  // 2. 현재 UI (상세페이지의 제목)의 상태를 state로 만들기. 0 = 첫번째 글 제목, 2 = 두번째 글 제목, 3 = 세변째 글 제목
  let [detailTitle, setDetailTitle] = useState(0);
  let [detailDate, setDetailDate] = useState(0)
  // user가 입력한 값 저장하는 state 
  let [입력값, 입력값변경] = useState(""); 
  // 날짜
  let [dates, setDates] = useState(["2024-11-15", "2024-11-16", "2024-11-17"]);
  
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

  // 글 추가
  function addNotice() {
    // 글제목 추가
    let titleCopy = [...글제목];
    titleCopy.unshift(입력값);
    글제목변경(titleCopy);
    
    // 좋아요 추가
    let favoriteCopy = [...좋아요];
    favoriteCopy.unshift(0);
    좋아요변경(favoriteCopy);

    // 날짜 추가
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let noticeDate = `${year}-${month}-${day}`;
    console.log(noticeDate);
    let dateCopy = [...dates];
    dateCopy.unshift(noticeDate);
    setDates(dateCopy);

    // 입력 필드 초기화
    입력값변경('');
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
              <div>
                {/* <h4 onClick={ ()=>{ setModal(!modal)}}>{ a } <span onClick={ () => { 좋아요변경(좋아요 + 1) } }>👍</span> { 좋아요 } </h4> */}
                {/* 3. state 종류에 따라서 UI가 어떻게 보일지 작성. setDetailTitle(i) 추가 */}
                <h4 onClick={ ()=>{ setModal(!modal); setDetailTitle(i)}}>{ 글제목[i] }  
                  <span className="favoriteButton" 
                    onClick={ (e) => {
                      e.stopPropagation();
                      let copy = [...좋아요];
                      copy[i] = copy[i] + 1;
                      좋아요변경(copy)
                    } }> 👍  
                  </span> { 좋아요[i] } 
                </h4>
                <p> { dates[i] } </p>
              </div>
              <button onClick={() => { 
                let copy = [...글제목];
                copy.splice(i, 1);
                글제목변경(copy)}}>삭제</button>
            </div>
          )}
        ) 
      }
      <div className="addNotice">
        <input onChange={(e) => { 입력값변경(e.target.value)}}></input>
        {/* trim() 은 공백을 제거해주기 때문에 공백만 입력된 경우도 입력값이 비어있는 것으로 간주 */}
        <button onClick={ addNotice } disabled={!입력값.trim()}>글발행</button> 
      </div>

      {
        modal === true ? <Modal 글제목={글제목} 글제목변경={글제목변경} detailTitle={detailTitle} dates={dates} detailDate={detailDate}/> : null
      }
      
      <Modal2></Modal2>
    </div>
  );
}

function Modal(props) {
  // let [detailTitle, setDetailTitle] = useState(0);
  return(
    // 1. html, css 만들기
    <div className="modal">
      {/* 4. detailTitle 이라는 스위치를 0, 1, 2로 바꿔주면 그때마다 알맞은 글이 모달창에 표시됨 */}
      <h4>{props.글제목[props.detailTitle]}</h4> 
      <p><b>날짜</b> {props.dates[props.detailDate]}</p>
      <p><b>상세내용</b></p>
      <button onClick={() => { 
        let copy = [...props.글제목];
        copy[0] = '여자 코트 추천';
        props.글제목변경(copy)}}>글 수정
      </button>
    </div>
  )
}
class Modal2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name : 'kim',
      age : 20
    }
  }
  render() {
    return (
      <div>안녕 {this.state.age}
        <button onClick={() => {
          this.setState({age : 21})
        }}>버튼</button>
      </div>
    )
  }
}


export default App;
