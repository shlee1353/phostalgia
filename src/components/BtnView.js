import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { photoViewSelect } from '../actions/photoOption';

const BtnView = ({ addClass, name, value, photoViewSelect, isActive, icon, ariaLabel }) => (
  <button
    type='button'
    name={name}
    className={`btn ${addClass} ${isActive ? 'active' : ''}`}
    aria-label={ariaLabel ? ariaLabel : ''}
    onClick={() => photoViewSelect(name)}
  >
    {value ? value : 
      <i className={`fa ${icon}`} role='presentation' />
    }
  </button>
);

const mapStateToProps = (state, ownProps) => ({
  isActive: ownProps.name === state.photoOption.photo_view
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  photoViewSelect: bindActionCreators(photoViewSelect, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BtnView);