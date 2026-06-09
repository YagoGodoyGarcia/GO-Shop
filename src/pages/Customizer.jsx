/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "../store";
import { download } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes, modelTabs } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import { ColorPicker, CustomButton, FilePicker, MouseMovement, Tab } from "../components";
import { Form } from "./Form";
import { ButtonClose, HeaderModal } from "../styles/modalStyle";

const MODEL_LABELS = {
  tshirt: 'Camiseta',
  poloShirt: 'Polo',
  mug: 'Caneca',
  diary: 'Caderno',
};

const Customizer = ({ mouseMovement, handleMouseMove }) => {
  const snap = useSnapshot(state);
  const [file, setFile] = useState("");
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "mouseMovement":
        return (
          <MouseMovement
            mouseMovement={mouseMovement}
            handleMouseSubmit={handleMouseSubmit}
          />
        );
      default:
        return null;
    }
  };

  const handleMouseSubmit = () => {
    handleMouseMove();
    setActiveEditorTab("");
  };

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = result;
    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
    }
    setActiveFilterTab((prev) => ({ ...prev, [tabName]: !prev[tabName] }));
  };

  const readFile = (type) => {
    reader(file).then((res) => {
      handleDecals(type, res);
      setActiveEditorTab("");
    });
  };

  const handleChangeModel = (model) => {
    state.model = model;
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          {/* Left: editor tools */}
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() =>
                      setActiveEditorTab((cur) => (cur === tab.name ? "" : tab.name))
                    }
                    isActiveTab={activeEditorTab === tab.name}
                    helperText={tab.helperText}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          {/* Top-left: back + product context */}
          <motion.div className="absolute z-10 top-5 left-5 flex items-center gap-3" {...fadeAnimation}>
            <CustomButton
              type="filled"
              title="← Início"
              handleClick={() => {
                state.intro = true;
                state.isModalOpen = false;
              }}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
            <span
              className="text-xs font-semibold px-3 py-1.5 rounded-full hidden sm:block"
              style={{
                background: 'rgba(183,33,255,0.12)',
                border: '1px solid rgba(183,33,255,0.3)',
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              {MODEL_LABELS[snap.model] || snap.model}
              <span
                className="inline-block w-2.5 h-2.5 rounded-full ml-2 align-middle"
                style={{ background: snap.color }}
              />
            </span>
          </motion.div>

          {/* Top-right: download + quote */}
          <motion.div className="absolute z-10 top-5 right-5 flex items-center gap-2" {...fadeAnimation}>
            <button
              onClick={downloadCanvasToImage}
              title="Baixar mockup"
              className="w-10 h-10 flex items-center justify-center rounded-lg transition-all"
              style={{
                background: 'rgba(183,33,255,0.1)',
                border: '1px solid rgba(183,33,255,0.3)',
              }}
            >
              <img src={download} alt="download" className="w-5 h-5" style={{ filter: 'brightness(0) invert(1)', opacity: 0.7 }} />
            </button>
            <CustomButton
              type="filled"
              title="Solicitar Orçamento"
              handleClick={() => (state.isModalOpen = true)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          {/* Bottom: filter tabs */}
          <motion.div className="filtertabs-container" {...slideAnimation("up")}>
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
                helperText={tab.helperText}
              />
            ))}
          </motion.div>

          {/* Right: model selector */}
          <motion.div
            key="modelsAI"
            className="absolute top-0 right-0 z-10"
            {...slideAnimation("right")}
          >
            <div className="flex items-center min-h-screen">
              <div className="modeltabs-container tabs">
                <p
                  className="text-xs font-semibold my-[-5px] uppercase tracking-wider"
                  style={{ color: 'rgba(183,33,255,0.7)' }}
                >
                  Produto
                </p>
                {modelTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    isActiveTab={snap.model === tab.name}
                    handleClick={() => handleChangeModel(tab.name)}
                    helperText={tab.helperText}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Watermark */}
          <motion.div className="absolute z-10 bottom-14 right-5" {...fadeAnimation}>
            <p className="text-xs font-bold tracking-widest uppercase" style={{ color: 'rgba(183,33,255,0.35)' }}>
              Ruisu Studio
            </p>
          </motion.div>

          {/* Quote modal */}
          {snap.isModalOpen && (
            <motion.div
              className="fixed inset-0 flex justify-center items-center z-50 overflow-y-auto py-6"
              style={{ background: 'rgba(5,5,8,0.85)', backdropFilter: 'blur(8px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => { if (e.target === e.currentTarget) state.isModalOpen = false; }}
            >
              <motion.div
                className="rounded-xl p-6 w-full max-w-lg mx-4"
                style={{
                  background: '#0d0d18',
                  border: '1px solid rgba(183,33,255,0.3)',
                  boxShadow: '0 0 60px rgba(183,33,255,0.12)',
                }}
                initial={{ scale: 0.85, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.85, opacity: 0, y: 20 }}
              >
                <HeaderModal>
                  <div>
                    <h2 className="text-xl font-bold" style={{ color: '#ffffff' }}>
                      Solicitar Orçamento
                    </h2>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      Preencha e entraremos em contato em breve
                    </p>
                  </div>
                  <ButtonClose onClick={() => (state.isModalOpen = false)}>✕</ButtonClose>
                </HeaderModal>
                <Form />
              </motion.div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
