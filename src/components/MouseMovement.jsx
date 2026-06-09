import React from 'react'
import CustomButton from './CustomButton'

const MouseMovement = ({ mouseMovement, handleMouseSubmit }) => {
    return (
        <div className='mousemovement-container'>
            <p className='text-xs my-[-5px]' style={{ color: 'rgba(255,255,255,0.5)' }}>
                Arraste o produto com o mouse.
            </p>
            <CustomButton
                type="filled"
                title={mouseMovement ? "Desativar" : "Ativar"}
                handleClick={handleMouseSubmit}
                customStyles="font-bold text-sm"
            />
        </div>
    )
}

export default MouseMovement
