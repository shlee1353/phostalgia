import React from 'react';
import PropTypes from 'prop-types';
import Photo from './Photo';

const List = ({filteredData, handleShowDetail}) => {

    const handleClick = (e, i) => {
        e.preventDefault();
        handleShowDetail(true, i, filteredData.length)
    }

	const dataToGallery = (data) => {
		return data.map((data, i) => {
			return (
				<Photo
                    {...data}
					key={i}
                    onClick={(e)=>handleClick(e, i)}
				/>
			)
		})
	}

    return(
        <div className="photo_area">
            <ul className="photo_list">
            	{dataToGallery(filteredData)}
            </ul>
        </div>
    );
}

List.propTypes = {
  filteredData: PropTypes.array.isRequired,
  handleShowDetail: PropTypes.func.isRequired
}

export default List;
