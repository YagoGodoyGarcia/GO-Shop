/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
//import config from '../config/config';
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

  //   const handleConfirmOrder = () => {
  //     // Aqui você pode adicionar a lógica para processar o pedido
  //     console.log("Pedido confirmado", {
  //       customerName,
  //       customerEmail,
  //       address,
  //       quantity,
  //       file,
  //     });
  //     closeModal();
  //     window.open("https://wa.link/4nn54l", "_blank");
  //   };

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
                {EditorTabs.map((tab, index) => (
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
              title="Voltar"
              handleClick={() => (state.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Fazer pedido"
              handleClick={handleFeedbackClick}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab, index) => (
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
                <p className="text-sm text-gray-500 my-[-5px]">Modelos</p>
                {modelTabs.map((tab, index) => (
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
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-lg p-6 w-full max-w-md"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              >
                <HeaderModal>
                <h2 className="text-xl font-bold mb-4">Detalhes do Pedido</h2>
                <ButtonClose onClick={() => closeModal()}>X</ButtonClose>
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
