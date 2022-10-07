import React from "react";
import DiaryItem from "./DiaryItem.js";

const DiaryList = ({ onEdit, onRemove, diaryList }) => {
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map(
          (
            it // 더미데이터의 요소 하나하나가 it 에 담김
          ) => (
            <DiaryItem
              key={it.id}
              {...it}
              onEdit={onEdit}
              onRemove={onRemove}
            />
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
