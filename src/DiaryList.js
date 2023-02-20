import React from 'react'
import DiaryItem from './DiaryItem'

export default function DiaryList({onEdit, diaryList, onRemove}) {
  return (
    <div className='DiaryList'>
      <h2>일기리스트</h2>
      <h4>{diaryList.length}개가 있습니다.</h4>
      <div>
        {diaryList.map((it) => (
          <DiaryItem key={it.id} {...it} onEdit={onEdit} onRemove={onRemove} />    
        ))}
      </div>
    </div>
  )
}

DiaryList.defaultProps= {
  diaryList: []
}