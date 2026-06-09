import React from 'react'
import { SketchPicker } from 'react-color'
import { useSnapshot } from 'valtio'
import state from '../store'

const ColorPicker = () => {
    const snap = useSnapshot(state);

    return (
        <div className='absolute left-full ml-3'>
            <SketchPicker
                color={snap.color}
                disableAlpha
                presetColors={[
                    "#B721FF",
                    "#7B2FBE",
                    "#00D4FF",
                    "#ffffff",
                    "#0d0d18",
                    "#ff4d6d",
                    "#FF96AD",
                    "#EFBD4E",
                    "#80C670",
                    "#726DE8",
                    "#2CCCE4",
                    "#353934",
                ]}
                onChange={(color) => state.color = color.hex}
            />
        </div>
    )
}

export default ColorPicker
