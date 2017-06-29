import React from 'react'
import FilterButton from './FilterButton'

const Filter = () => (
  <div className='filter_area'>
    <FilterButton filter='SHOW_ALL' name='All' />
    <FilterButton filter='SHOW_SUNNY' name='Sunny' />
    <FilterButton filter='SHOW_CLOUDY' name='Cloudy' />
    <FilterButton filter='SHOW_RAINY' name='Rainy' />
    <FilterButton filter='SHOW_SNOWY' name='Snowy' />
  </div>
);

export default Filter