import React from 'react';

const Selected = ({ options, defaultValue, value, onChange }) => {
    
    return (
        <select value={value}
            onChange={event => onChange(event.target.value)}
        >
            <option disabled={true} value="">{defaultValue}</option>
            {options.map(option => {
                return (<option key={option.value} value={option.value}>
                    {option.name}
                </option>)
            })}

        </select>
    );
};

export default Selected;