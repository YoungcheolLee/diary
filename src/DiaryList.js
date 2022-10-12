import React, { useContext } from "react";
import { DiaryStateContext } from "./App.js";
import DiaryItem from "./DiaryItem.js";

const DiaryList = () => {
  const diaryList = useContext(DiaryStateContext);
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map(
          (
            it // 더미데이터의 요소 하나하나가 it 에 담김
          ) => (
            <DiaryItem key={it.id} {...it} />
          )
        )}
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  dummyList: [],
};

export default DiaryList;
