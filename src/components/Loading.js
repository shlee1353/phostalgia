import React from 'react';

const Loading = ({message}) => (
  <div className="loading_area">
    <div className="message_area">
      <img src="./images/loading.gif" width="33" height="33" alt="로딩 아이콘"/>
      <div className="message">로딩 중 입니다</div>
    </div>
  </div>
)

export default Loading;