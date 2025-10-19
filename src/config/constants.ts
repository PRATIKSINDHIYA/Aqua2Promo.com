// Import assets - we'll need to add these to the public folder
export const EditorTabs = [
  {
    name: "colorpicker",
    icon: "/assets/swatch.png",
  },
  {
    name: "designuploader",
    icon: "/assets/file.png",
  },
  {
    name: "logocontrols",
    icon: "/assets/logo-controls.png",
  },
  {
    name: "textcontrols",
    icon: "/assets/text-icon.png",
  },
];

export const FilterTabs = [
  {
    name: "downloadBottle",
    icon: "/assets/download.png",
  },
];

export const DecalTypes = {
  frontLogo: {
    stateProperty: "frontLogoDecal",
    filterTab: "frontLogoBottle",
  },
  backLogo: {
    stateProperty: "backLogoDecal",
    filterTab: "backLogoBottle",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishBottle",
  },
};

export const texturesLogos = [
  {
    name: "Texture 1",
    image: "/assets/texture1.jpeg",
    type: "texture",
  },
  {
    name: "Texture 2",
    image: "/assets/texture2.jpeg",
    type: "texture",
  },
  {
    name: "Texture 3",
    image: "/assets/texture3.jpeg",
    type: "texture",
  },
  {
    name: "Texture 4",
    image: "/assets/texture4.jpeg",
    type: "texture",
  },
  {
    name: "Texture 5",
    image: "/assets/texture5.jpeg",
    type: "texture",
  },
  {
    name: "Front Logo 1",
    image: "/assets/logo1.png",
    type: "frontLogo",
  },
  {
    name: "Front Logo 2",
    image: "/assets/logo2.png",
    type: "frontLogo",
  },
  {
    name: "Back Logo 1",
    image: "/assets/logo1.png",
    type: "backLogo",
  },
  {
    name: "Back Logo 2",
    image: "/assets/logo2.png",
    type: "backLogo",
  },
];