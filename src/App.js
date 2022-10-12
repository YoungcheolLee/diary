import React, {
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useReducer,
} from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import Lifecycle from "./Lifecycle";

// API 호출용 주소
// https://jsonplaceholder.typicode.com/comments

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.date,
        created_date,
      };
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    case "EDIT": {
      return state.map((it) =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it
      );
    }
    default:
      return state;
  }
};

/*DiaryStateContext를 export만 하는 이유?
  - export default는 파일 하나당 하나밖에 쓸 수 없기 때문에 비구조화 할당을 통해 내보내줌
*/
export const DiaryStateContext = React.createContext();

export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  // 컴포넌트가 마운트 되는 시점에 API를 호출하는 메서드
  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    dispatch({ type: "INIT", data: initData });
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = (author, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: { onRemove, author, content, emotion, id: dataId.current },
    });

    dataId.current += 1;
  };

  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
  }, []);

  //memoizedDispatches를 useMemo로 감싸주는 이유는 App컴포넌트가 재생성이 될 때 재생성 되지 않게 하기 위함 (최적화)
  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, []);

  /* useMemo 사용 예제
  1. 감정점수(emotion)가 3 이상이면 기분 좋은일기, 이하면 기분 나쁜일기로 설정한 getDiaryAnalysis() 함수 생성
  2. 일기를 삭제하거나 수정 했을 때도 getDiaryAnalysis()를 실행함.
  3. 하지만 수정과 삭제에는 감정점수를 변환하는 기능이 없기 때문에 getDiaryAnalysis()를 실행하는 의미가 없음
  4. 따라서 일기 데이터의 길이가 변환이 될 때만 getDiaryAnalysis() 를 실행하게 함 */

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App.js">
          <Lifecycle />
          <DiaryEditor />
          <div>전체 일기 : {data.length}</div>
          <div>기분 좋은 일기 계수 : {goodCount}</div>
          <div>기분 나쁜 일기 계수 : {badCount}</div>
          <div>기분 좋은 일기 비율 : {goodRatio}%</div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
