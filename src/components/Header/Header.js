import React from 'react'

const Header = ({ handlePhotoSettingToggle }) => {
  const isActive = true;
  return (
    <header id='header' className='header' role='banner'>
      <div className='layout_inner'>
        <h1 className='logo'>
          <a href='/'>PHOSTALGIA</a>
        </h1>
        <button
          className={`btn_setting ${isActive ? 'active' : ''}`}
          aria-label='설정'
          onClick={handlePhotoSettingToggle}
        >
          <i className='fa fa-cog' role='presentation' />
        </button>
      </div>
    </header>
  )
};

export default Header
