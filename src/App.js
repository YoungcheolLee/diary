import { useState, useRef } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

// 다이어리 리스트 더미데이터 추가
// const dummyList = [
//   {
//     id: 1,
//     author: "이영철",
//     content: "dummyData1",
//     emotion: 5,
//     created_date: new Date().getTime(), //시간 객체 추가
//   },
//   {
//     id: 2,
//     author: "이영철2",
//     content: "dummyData2",
//     emotion: 1,
//     created_date: new Date().getTime(), //시간 객체 추가
//   },
//   {
//     id: 3,
//     author: "이영철3",
//     content: "dummyData3",
//     emotion: 3,
//     created_date: new Date().getTime(), //시간 객체 추가
//   },
// ];

function App() {
  const [data, setData] = useState([]);
  const dataId = useRef(0);
  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  return (
    <div className="App.js">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} />
    </div>
  );
}

export default App;
