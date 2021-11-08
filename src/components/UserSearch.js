import React from 'react';
import Selected from './Selected';

const UserSearch = ({ sorted, setSorted }) => {

    return (
        <div>
            <input
                type='text'
                value={sorted.select}
                onChange={event => setSorted({ ...sorted, select: event.target.value })}
                placeholder="Search by name"
            />
            <div>
                <Selected
                    defaultValue="Filter by state"
                    value={sorted.filter}
                    onChange={element => setSorted({ ...sorted, filter: element })}
                    options={[
                        { value: 'IA', name: 'IA' },
                        { value: 'AR', name: 'AR' }                       
                    ]} />
            </div>

        </div>
    );
};

export default UserSearch;