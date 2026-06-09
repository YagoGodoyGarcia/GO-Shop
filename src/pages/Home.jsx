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

const Home = () => {
    const snap = useSnapshot(state)

    return (
        <AnimatePresence>
            {snap.intro && (
                <motion.section className='home' {...slideAnimation('left')}>
                    <motion.div className='home-content' {...headContainerAnimation}>
                        <motion.div {...headTextAnimation}>
                            <span className='ruisu-badge mb-4'>
                                IA • Design • Marketing
                            </span>
                            <h1 className='head-text'>
                                Ruisu<br className='xl:block hidden' />Studio
                            </h1>
                        </motion.div>
                        <motion.div className='flex flex-col gap-5' {...headContentAnimation}>
                            <p className='max-w-md font-normal text-base' style={{ color: 'rgba(255,255,255,0.6)' }}>
                                <strong style={{ color: 'rgba(255,255,255,0.9)' }}>Conteúdo que vende.</strong>{" "}
                                Criativos, design e tecnologia para marcas. Transformamos ideias em conteúdo profissional. Visualize e personalize produtos com a sua identidade visual em 3D.
                            </p>

                            <div className='flex items-center gap-3 flex-wrap'>
                                <CustomButton
                                    type="filled"
                                    title="Personalizar agora →"
                                    handleClick={() => state.intro = false}
                                    customStyles="w-fit px-6 py-3 font-bold text-sm neon-pulse"
                                />
                                <a
                                    href="https://youtu.be/-y0-Sula54o"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className='text-sm font-semibold'
                                    style={{ color: 'rgba(183,33,255,0.8)' }}
                                >
                                    Ver portfólio ↗
                                </a>
                            </div>

                            <div className='flex gap-6 mt-2'>
                                <div>
                                    <p className='text-2xl font-black' style={{ color: '#B721FF' }}>Posts</p>
                                    <p className='text-xs' style={{ color: 'rgba(255,255,255,0.4)' }}>Redes Sociais</p>
                                </div>
                                <div style={{ width: '1px', background: 'rgba(183,33,255,0.3)' }} />
                                <div>
                                    <p className='text-2xl font-black' style={{ color: '#00D4FF' }}>ID Visual</p>
                                    <p className='text-xs' style={{ color: 'rgba(255,255,255,0.4)' }}>Identidade</p>
                                </div>
                                <div style={{ width: '1px', background: 'rgba(183,33,255,0.3)' }} />
                                <div>
                                    <p className='text-2xl font-black' style={{ color: '#ffffff' }}>IA</p>
                                    <p className='text-xs' style={{ color: 'rgba(255,255,255,0.4)' }}>Tecnologia</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.section>
            )}
        </AnimatePresence>
    )
}

export default Home
