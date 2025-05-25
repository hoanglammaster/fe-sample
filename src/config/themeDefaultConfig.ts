import {
  BLACK,
  GREEN,
  PRIMARY,
  RED,
  WHITE,
  YELLOW,
} from '@/components/layouts/WrapLayout/Theme/colors'
import { ButtonConfig } from '@/components/templates/Example/ThemeConfig/components/ButtonConfig/type'
import { ThemeColorConfig } from '@/components/templates/Example/ThemeConfig/components/ColorThemeConfig/type'
import { FontConfig } from '@/components/templates/Example/ThemeConfig/components/FontConfig/type'

export const themeColorDefaultConfig: ThemeColorConfig = {
  layout: 'Layout2',
  theme: 'CUSTOM',
  firstMainColor: PRIMARY,
  secondMainColor: BLACK,
  thirdMainColor: '#E2E2E2',
  fourthMainColor: '#E2E2E2',
  successColor: GREEN,
  errorColor: RED,
  warningColor: YELLOW,
}

export const fontDefaultConfig: FontConfig = {
  h1Color: '#222222',
  h1Font: 'Helvetica',
  h1Size: 1.5,

  h2Color: '#222222',
  h2Font: 'Helvetica',
  h2Size: 1.25,

  h3Color: '#222222',
  h3Font: 'Helvetica',
  h3Size: 1.125,

  h4Color: '#222222',
  h4Font: 'Helvetica',
  h4Size: 1,

  h5Color: '#222222',
  h5Font: 'Helvetica',
  h5Size: 0.875,

  h6Color: '#222222',
  h6Font: 'Helvetica',
  h6Size: 0.8,

  subtitle1Color: '#222222',
  subtitle1Font: 'Helvetica',
  subtitle1Size: 1,

  subtitle2Color: '#222222',
  subtitle2Font: 'Helvetica',
  subtitle2Size: 0.8125,

  body1Color: '#222222',
  body1Font: 'Helvetica',
  body1Size: 1,

  body2Color: '#222222',
  body2Font: 'Helvetica',
  body2Size: 0.8125,

  captionColor: '#222222',
  captionFont: 'Helvetica',
  captionSize: 0.75,
}

export const buttonDefaultConfig: ButtonConfig = {
  submitButton: {
    textColor: WHITE,
    hoverTextColor: WHITE,
    backgroundColor: PRIMARY,
    backgroundHoverColor: PRIMARY,
    borderColor: PRIMARY,
    borderHoverColor: PRIMARY,
  },
  rejectButton: {
    textColor: '#747475',
    hoverTextColor: '#747475',
    backgroundColor: WHITE,
    backgroundHoverColor: WHITE,
    borderColor: '#DFE0EB',
    borderHoverColor: '#DFE0EB',
  },
  draftButton: {
    textColor: '#747475',
    hoverTextColor: '#747475',
    backgroundColor: WHITE,
    backgroundHoverColor: WHITE,
    borderColor: '#DFE0EB',
    borderHoverColor: '#DFE0EB',
  },
  resetButton: {
    textColor: PRIMARY,
    hoverTextColor: '#FF4956',
    backgroundColor: WHITE,
    backgroundHoverColor: WHITE,
    borderColor: PRIMARY,
    borderHoverColor: '#FF4956',
  },
}
