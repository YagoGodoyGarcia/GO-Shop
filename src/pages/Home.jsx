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

const SERVICES = [
    {
        label: 'Posts & Reels',
        desc: 'Conteúdo que converte',
        color: '#B721FF',
    },
    {
        label: 'Identidade Visual',
        desc: 'Marca com personalidade',
        color: '#00D4FF',
    },
    {
        label: 'Produtos 3D',
        desc: 'Merch da sua marca',
        color: '#B721FF',
    },
    {
        label: 'Criação com IA',
        desc: 'Upscale, GPT Images & +',
        color: '#00D4FF',
    },
]

const Home = () => {
    const snap = useSnapshot(state)

    const handleGoToCustomizer = () => {
        state.intro = false
        state.isModalOpen = false
    }

    const handleRequestQuote = () => {
        state.intro = false
        state.isModalOpen = true
    }

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

                        <motion.div className='flex flex-col gap-6' {...headContentAnimation}>
                            <p className='max-w-md font-normal text-base' style={{ color: 'rgba(255,255,255,0.6)' }}>
                                <strong style={{ color: 'rgba(255,255,255,0.9)' }}>Conteúdo que vende.</strong>{' '}
                                Criativos, design e tecnologia para marcas. Transformamos ideias em conteúdo profissional.
                            </p>

                            {/* Service cards */}
                            <div className='grid grid-cols-2 gap-2 max-w-xs'>
                                {SERVICES.map((s) => (
                                    <div
                                        key={s.label}
                                        className='flex flex-col gap-0.5 px-3 py-2 rounded-lg'
                                        style={{
                                            background: 'rgba(13,13,24,0.7)',
                                            border: `1px solid ${s.color}33`,
                                            transition: 'border-color 0.2s',
                                        }}
                                    >
                                        <span className='text-xs font-bold' style={{ color: s.color }}>{s.label}</span>
                                        <span className='text-xs' style={{ color: 'rgba(255,255,255,0.4)' }}>{s.desc}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTAs */}
                            <div className='flex items-center gap-3 flex-wrap'>
                                <CustomButton
                                    type="filled"
                                    title="Personalizar produto →"
                                    handleClick={handleGoToCustomizer}
                                    customStyles="w-fit px-5 py-2.5 font-bold text-sm neon-pulse"
                                />
                                <button
                                    onClick={handleRequestQuote}
                                    className='px-5 py-2.5 rounded-md text-sm font-bold transition-all'
                                    style={{
                                        border: '1px solid rgba(183,33,255,0.5)',
                                        color: '#B721FF',
                                        background: 'rgba(183,33,255,0.08)',
                                    }}
                                >
                                    Pedir orçamento
                                </button>
                            </div>

                            <a
                                href="https://youtu.be/-y0-Sula54o"
                                target="_blank"
                                rel="noopener noreferrer"
                                className='text-xs font-semibold w-fit'
                                style={{ color: 'rgba(183,33,255,0.6)' }}
                            >
                                Ver portfólio ↗
                            </a>
                        </motion.div>
                    </motion.div>
                </motion.section>
            )}
        </AnimatePresence>
    )
}

export default Home
