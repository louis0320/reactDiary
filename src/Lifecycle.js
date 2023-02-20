import React, {useEffect, useState} from 'react'

const UnmountTest = () => {
  useEffect(()=> {
    console.log("마운트!!");
    return() => {
      console.log("언마운트!")
    }
  },[]);
  return (
    <div>
      Unmount Testing Component
    </div>
  )
}

const Lifecycle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);
  return (
    <div style={{padding:20}}>
      <button onClick={toggle}>ON/OFF</button>
      {isVisible && <UnmountTest/>}
    </div>
  )
}

export default Lifecycle
