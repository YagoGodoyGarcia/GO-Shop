import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../store'

const Tab = ({ tab, isFilterTab, isActiveTab, handleClick, helperText }) => {
    const snap = useSnapshot(state);

    const activeStyles = isFilterTab && isActiveTab
        ? { backgroundColor: snap.color, opacity: 0.7, borderRadius: '50%' }
        : { backgroundColor: 'transparent', opacity: 1 };

    return (
        <div className='flex flex-col items-center'>
            <div
                key={tab.name}
                className={`tab-btn ${isFilterTab ? 'rounded-full glassmorphism' : 'rounded-4'}`}
                onClick={handleClick}
                style={activeStyles}
            >
                <img
                    src={tab.icon}
                    alt={tab.name}
                    className={`${isFilterTab ? 'w-2/3 h-2/3' : 'w-11/12 h-11/12 object-contain'}`}
                    style={{ filter: 'brightness(0) invert(1)', opacity: isActiveTab ? 1 : 0.6 }}
                />
            </div>
            <div
                className='text-xs mt-[-3px] font-medium'
                style={{ color: isActiveTab ? snap.color : 'rgba(255,255,255,0.4)' }}
            >
                {helperText}
            </div>
        </div>
    )
}

export default Tab
