import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const filterButton = ({ isActive, name, onClick }) => {
	return(
		<li className="filter_item">
			<button
			    type='button'
			    className={`item_btn ${isActive ? 'active' : ''}`}
			    onClick={onClick}
			>
				{name}
			</button>
		</li>
	)
};

const mapStateToProps = (state, ownProps) => ({
	isActive: ownProps.filter === state.filter.currentFilter
});
const mapDispatchToProps = (dispatch, ownProps) => ({
	onClick: () => { dispatch(actions.filterCondition(ownProps.filter))}
});

export default connect(mapStateToProps, mapDispatchToProps)(filterButton)