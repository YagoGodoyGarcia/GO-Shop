import { swatch, fileIcon, mouse, logoShirt, stylishShirt, poloShirt, mug, diary } from "../assets";

export const EditorTabs = [
  {
    name: "colorpicker",
    icon: swatch,
    helperText: "Cor",
  },
  {
    name: "filepicker",
    icon: fileIcon,
    helperText: "Logo",
  },
  {
    name: "mouseMovement",
    icon: mouse,
    helperText: "Girar",
  },
];

export const FilterTabs = [
  {
    name: "logoShirt",
    icon: logoShirt,
    helperText: "Ícone",
  },
  {
    name: "stylishShirt",
    icon: stylishShirt,
    helperText: "Estampa",
  },
];

export const modelTabs = [
  {
    name: "tshirt",
    icon: logoShirt,
    helperText: "Camiseta",
  },
  {
    name: "poloShirt",
    icon: poloShirt,
    helperText: "Polo",
  },
  {
    name: "mug",
    icon: mug,
    helperText: "Caneca",
  },
  {
    name: "diary",
    icon: diary,
    helperText: "Caderno",
  },
];

export const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
};
