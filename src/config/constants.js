import { swatch, fileIcon, ai, logoShirt, stylishShirt, mouse, poloShirt, mug, diary } from "../assets";

export const EditorTabs = [
  {
    name: "colorpicker",
    icon: swatch,
    helperText: "Cor",
  },
  {
    name: "filepicker",
    icon: fileIcon,
    helperText: "Arquivo",
  },
  /**
  {
    name: "aipicker",
    icon: ai,
    helperText: "AI",
  }, */
  {
    name: "mouseMovement",
    icon: mouse,
    helperText: "Mover",
  }
];

export const FilterTabs = [
  {
    name: "logoShirt",
    icon: logoShirt,
    helperText: "Logo",
  },

  {
    name: "stylishShirt",
    icon: stylishShirt,
    helperText: "Texture",
  },
];
export const modelTabs = [ // Limit helpertext length to 6-7 characters
  {
    name: "Camiseta",
    icon: logoShirt, // TODO: change to tshirt icon
    helperText: "Camiseta",
  },
  {
    name: "Camiseta Polo",
    icon: poloShirt, // TODO: change to poloShirt icon
    helperText: "Polo",
  },
  {
    name: 'Caneca',
    icon: mug, // TODO: change to mug icon
    helperText: "Caneca",
  },
  {
    name: 'Caderno',
    icon: diary, // TODO: change to diary icon
    helperText: 'Caderno',
  }
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
