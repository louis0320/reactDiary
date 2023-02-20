import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import "./App.css";

export default function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const getData = async() => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments')
      .then((res)=>res.json());

    const initData = res.slice(0,20).map((it)=> {
      return {
        author: it.email,
        content : it.body,
        emotion : Math.floor(Math.random() * 5) +1,
        created_date : new Date().getTime(),
        id : dataId.current++
      }
    })

    setData(initData);
  };

  useEffect(()=> {
    getData();
  },[]);


  const onCreate = useCallback(
    (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    //함수형 업데이트
    setData((data)=>[newItem, ...data]);
    },
    []
  );

  const onRemove = (targetId) => {
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  const getDiaryAnalysis = useMemo(()=> {
    const goodCount = data.filter((it)=>it.emotion >=3).length;
    const badCount = data.length - goodCount;
    const goodRatio = Math.floor((goodCount /data.length) * 100);
    return {goodCount,badCount,goodRatio};
  },[data.length]);

  // getDiaryAnalysis() => getDiaryAnalysys로 변경 함수가 아닌 값으로 사용한다.
  const {goodCount, badCount, goodRatio} = getDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 갯수 : {goodCount}</div>
      <div>기분 나쁜 일기 갯수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}
