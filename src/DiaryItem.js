import { useRef, useState } from "react";

const DiaryItem = ({
  onEdit,
  onRemove,
  author,
  content,
  created_date,
  emotion,
  id,
}) => {
  const [isEdit, setIsEdit] = useState(false); // 수정중인지 아닌지를 판단하는 boolean형 state
  const toggleIsEdit = () => setIsEdit(!isEdit); // toggleIsEdit 함수가 호출 되면 isEdit의 값을 반전시킴
  const [localContent, setLocalContent] = useState(content);
  const localContentInput = useRef();

  const handleRemove = () => {
    if (window.confirm(`${id} 번째 일기를 정말 삭제하시겠습니까?`)) {
      console.log(`삭제한 일기 ID = ${id} 번 째 일기 데이터`);
      onRemove(id);
    }
  };

  const handleQuietEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }
    if (window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

  const onClick = () => {
    console.log(`${id} 번째 일기입니다.`);
    alert(`${id} 번째 일기입니다.`);
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {author} | 감 정 점 수 : {emotion}
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={handleQuietEdit}>수정취소</button>
          <button onClick={handleEdit}>수정완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}> 삭제하기 </button>
          <button onClick={toggleIsEdit}>수정하기</button>
          <button onClick={onClick}> 정보보기 </button>
        </>
      )}
    </div>
  );
};

export default DiaryItem;
