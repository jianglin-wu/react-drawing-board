import React from 'react';
import DrawingBoard from './DrawingBoard';
import EditWarp from './EditWarp';
import './style.css';

export default function App() {
  return (
    <div className="container">
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <DrawingBoard className="work-area">
        <EditWarp defaultPosition={{ left: 0, top: 0 }}>
          <div>hello</div>
        </EditWarp>
        <EditWarp defaultPosition={{ left: 200, top: 0 }}>
          <div>world</div>
        </EditWarp>
        <EditWarp
          defaultPosition={{ left: 0, top: 200 }}
          defaultSize={{ width: 200, height: 100 }}
        >
          <img src="https://blog-cdn.hahhub.com/assets/c4315f40e314e782a80b47cb1e51f600.jpg" />
        </EditWarp>
      </DrawingBoard>
    </div>
  );
}
