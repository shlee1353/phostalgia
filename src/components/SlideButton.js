import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const slideButton = ({ name, onClick }) => {
	return(
		<div className="btn_box">
			<button
	            className="slide_btn"
	            type='button'
	          	onClick={onClick}
	        >
	        	{name}
	        </button>
		</div>
	)
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch, ownProps) => ({
	onClick: () => { dispatch(actions.slidePhoto(ownProps.filter))}
});

export default connect(mapStateToProps, mapDispatchToProps)(slideButton)