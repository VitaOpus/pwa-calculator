import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineLayerStyles,
  defineTokens,
} from '@chakra-ui/react';

const layerStyles = defineLayerStyles({
  container: {
    description: 'container styles',
    value: {
      color: 'black',
      // background: "gray.50",
      // border: "2px solid",
      // borderColor: "gray.500",
    },
  },
});

const tokens = defineTokens({
  colors: {
    black: { value: '#000000' },
    white: { value: '#ffffff' },
    gray: {
      800: { value: '#1a202c' }, // _dark background
    },
  },
});

const customConfig = defineConfig({
  // semanticTokens,
  strictTokens: true,
  cssVarsRoot: ':where(:root, :host)',
  cssVarsPrefix: 'ck',
  globalCss: {
    'html, body': {
      margin: 0,
      padding: 0,
      colorPalette: 'gray', // Change this to any color palette you prefer
    },
  },
  theme: {
    // textStyles,
    layerStyles,
    tokens,
  },
});
export const system = createSystem(defaultConfig, customConfig);
