import React from 'react'
import CustomButton from './CustomButton'

const MouseMovement = ({ mouseMovement, handleMouseSubmit }) => {

    return (
        <div className='mousemovement-container'>
            <p className='text-sm text-gray-500 my-[-5px]'>Use o mouse para mover o produto.</p>
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