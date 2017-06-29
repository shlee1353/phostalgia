import React, { Component } from 'react';
import FilterButton from './FilterButton'

class Filter extends Component {

    render() {
        return(
            <ul className="filter_list">
                 <FilterButton filter='sunny' name='sunny' />
                 <FilterButton filter='cloudy' name='cloudy' />
                 <FilterButton filter='rainy' name='rainy' />
                 <FilterButton filter='snowy' name='snowy' />
            </ul>
        );
    }
}

export default Filter;