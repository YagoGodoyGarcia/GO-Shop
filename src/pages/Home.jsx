import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio'
import {
    headContainerAnimation,
    headTextAnimation,
    headContentAnimation,
    slideAnimation
} from '../config/motion'
import state from '../store'
import { CustomButton } from '../components'
import { rossyPrint } from '../assets'

const Home = () => {
    // test commit check
    const snap = useSnapshot(state)


    return (
        <AnimatePresence>
            {snap.intro && (
                <motion.section className='home' {...slideAnimation('left')}>
                    <motion.div className='home-content' {...headContainerAnimation}>
                        <motion.div {...headTextAnimation}>
                            <h1 className='head-text'>
                                Gráfica<br className='xl:block hidden' />Online
                            </h1>
                        </motion.div>
                        <motion.div className='flex flex-col gap-5' {...headContentAnimation}>
                            <p className='max-w-md font-normal text-gray-600 text-base'>
                                <strong className='text-gray-700 text-center'>Visualze nossos produtos com sua estampa!. </strong>{" "}
                                A Rossy Print é uma gráfica inovadora que oferece uma experiência única de e-commerce, permitindo aos usuários personalizar e visualizar uma vasta gama de produtos em 3D. Nossa plataforma permite que você escolha cores, envie logotipos e texturas.
                            </p>

                            <CustomButton
                                type="filled"
                                title="Carregue sua estampa em nossos produtos"
                                handleClick={() => state.intro = false}
                                customStyles="w-fit px-4 py-2.5 font-bold text-sm "
                            />
                        </motion.div>
                    </motion.div>
                </motion.section>
            )}
        </AnimatePresence>

        
    )
}

export default Home