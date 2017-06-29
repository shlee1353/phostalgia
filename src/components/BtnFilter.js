import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { photoFilterSelect } from '../actions/photoOption';

const BtnFilter = ({ addClass, name, value, photoFilterSelect, isActive, icon, ariaLabel }) => (
  <button
    type='button'
    name={name}
    className={`btn ${addClass} ${isActive ? 'active' : ''}`}
    aria-label={ariaLabel ? ariaLabel : ''}
    onClick={() => photoFilterSelect(name)}
  >
    {value ? value : 
      <i className={`fa ${icon}`} role='presentation' />
    }
  </button>
);

const mapStateToProps = (state, ownProps) => ({
  isActive: ownProps.name === state.photoOption.photo_filter
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  photoFilterSelect: bindActionCreators(photoFilterSelect, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BtnFilter);