import React from 'react'

const Photo = ({ onClick, imgUrl, select }) => (
  <li className={`list_item ${select ? 'today_recommend' : ''}`}>
    <a
      className='list_link'
      onClick={onClick}
    >
      <img src={imgUrl} alt='' />
    </a>
  </li>
);

export default Photo