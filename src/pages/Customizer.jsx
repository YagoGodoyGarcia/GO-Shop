/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "../store";
import { download } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import {
  EditorTabs,
  FilterTabs,
  DecalTypes,
  modelTabs,
} from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import {
  ColorPicker,
  CustomButton,
  FilePicker,
  MouseMovement,
  Tab,
} from "../components";
import { Form } from "./Form";
import { ButtonClose, HeaderModal } from "../styles/modalStyle";

const Customizer = ({ mouseMovement, handleMouseMove }) => {
  const snap = useSnapshot(state);
  const [file, setFile] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });
  const [activeModelTab, setActiveModelTab] = useState({
    tshirt: true,
    poloShirt: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

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
        break;
    }

    setActiveFilterTab((prevState) => ({
      ...prevState,
      [tabName]: !prevState[tabName],
    }));
  };

  const readFile = (type) => {
    reader(file).then((res) => {
      handleDecals(type, res);
      setActiveEditorTab("");
    });
  };

  const handleChangeModel = (model) => {
    setActiveModelTab({
      ...Object.fromEntries(
        Object.keys(activeModelTab).map((name) => [name, name === model])
      ),
    });
    state.model = model;
  };

  const handleFeedbackClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
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
                    handleClick={() => {
                      if (activeEditorTab === tab.name)
                        return setActiveEditorTab("");
                      else setActiveEditorTab(tab.name);
                    }}
                    helperText={tab.helperText}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div className="absolute z-10 top-5 left-5" {...fadeAnimation}>
            <CustomButton
              type="filled"
              title="← Início"
              handleClick={() => (state.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          <motion.div className="absolute z-10 top-5 right-5" {...fadeAnimation}>
            <CustomButton
              type="filled"
              title="Solicitar Orçamento"
              handleClick={handleFeedbackClick}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          {/* Ruisu Studio watermark */}
          <motion.div
            className="absolute z-10 bottom-14 right-5"
            {...fadeAnimation}
          >
            <p className="text-xs font-bold tracking-widest uppercase" style={{ color: 'rgba(183,33,255,0.4)' }}>
              Ruisu Studio
            </p>
          </motion.div>

          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
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

          <motion.div
            key="modelsAI"
            className="absolute top-0 right-0 z-10"
            {...slideAnimation("right")}
          >
            <div className="flex items-center min-h-screen">
              <div className="modeltabs-container tabs">
                <p className="text-xs font-semibold my-[-5px] uppercase tracking-wider" style={{ color: 'rgba(183,33,255,0.7)' }}>Produto</p>
                {modelTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => handleChangeModel(tab.name)}
                    helperText={tab.helperText}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {isModalOpen && (
            <motion.div
              className="fixed inset-0 flex justify-center items-center z-50"
              style={{ background: 'rgba(5,5,8,0.85)', backdropFilter: 'blur(8px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="rounded-xl p-6 w-full max-w-md"
                style={{
                  background: '#0d0d18',
                  border: '1px solid rgba(183,33,255,0.3)',
                  boxShadow: '0 0 40px rgba(183,33,255,0.15)'
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <HeaderModal>
                  <h2 className="text-xl font-bold mb-4" style={{ color: '#ffffff' }}>
                    Solicitar Orçamento
                  </h2>
                  <ButtonClose onClick={closeModal}>✕</ButtonClose>
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
