import React from 'react'
import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions/visibilityFilter'

const FilterButton = ({ isActive, name, onClick }) => (
  <button
    type='button'
    className={`btn ${isActive ? 'active' : ''}`}
    onClick={onClick}
  >
    {name}
  </button>
);

const mapStateToProps = (state, ownProps) => ({
  isActive: ownProps.filter === state.visibilityFilter
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setVisibilityFilter(ownProps.filter))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterButton)