import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ id, weather, date, imgUrl, onClick, data }) => {
	
    return (
        <li className="photo_item">
            <a href="#" 
            	className="item" 
            	onClick={(e) => onClick(e)}
        	>
                <img src={imgUrl} alt=""/>
            </a>
        </li>
    )
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  weather: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Card;