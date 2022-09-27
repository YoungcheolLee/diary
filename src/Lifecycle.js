import React, { useEffect, useState } from "react";

const UnmountTest = () => {
  useEffect(() => {
    console.log("Mount!");
    return () => {
      //Unmount 시점에 실행되게 됨
      console.log("UnMount!");
    };
  }, []);
  return <div>UnMonunt Testing Component</div>;
};

const LifeCycle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);
  // * useEffct 실습예제 *

  //const [count, setCount] = useState(0);
  //const [text, setText] = useState("");
  // useEffect(() => {
  //   console.log("Mount!");
  // }, []);

  // useEffect(() => {
  //   console.log("Update!");
  // });

  // useEffect(() => {
  //   console.log(`count is update : ${count}`);
  //   if (count >= 5) {
  //     alert("count가 5를 넘었습니다. 따라서 count를 초기화 합니다.");
  //     setCount(1);
  //   }
  // }, [count]);

  // useEffect(() => {
  //   console.log(`text is update : ${text}`);
  // }, [text]);

  return (
    <div style={{ padding: 20 }}>
      <button onClick={toggle}>ON/OFF</button>
      {isVisible && <UnmountTest />}
    </div>
  );
};

export default LifeCycle;
