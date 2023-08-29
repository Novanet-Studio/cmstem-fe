import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
import presetIcons from '@unocss/preset-icons';
import * as theme from './config/theme.json';

let fontPrimary, fontPrimaryType, fontSecondary, fontSecondaryType;
let fontBase = Number(theme.fonts.font_size.base.replace('px', ''));
let fontScale = Number(theme.fonts.font_size.scale);

let h6 = fontBase / fontBase;
let h5 = h6 * fontScale;
let h4 = h5 * fontScale;
let h3 = h4 * fontScale;
let h2 = h3 * fontScale;
let h1 = h2 * fontScale;

if (theme.fonts.font_family.primary) {
  fontPrimary = theme.fonts.font_family.primary
    .replace(/\+/g, ' ')
    .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, '');
  fontPrimaryType = theme.fonts.font_family.primary_type;
}

if (theme.fonts.font_family.secondary) {
  fontSecondary = theme.fonts.font_family.secondary
    .replace(/\+/g, ' ')
    .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, '');
  fontSecondaryType = theme.fonts.font_family.secondary_type;
}

const getColor = (item: string): string => {
  const mapped: Record<number, string> & { [key: string]: string } = {};

  Object.entries(theme.colors.default.theme_color).forEach(([key, val]) => {
    mapped[key.replace('color_', '')] = val;
  });

  return mapped[item];
};

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetWebFonts({
      fonts: {
        sans: [
          {
            name: 'Nunito Sans',
            weights: ['400', '500', '600', '700', '800', '900'],
          },
          { name: 'sans-serif', provider: 'none' },
        ],
        primary: [
          fontPrimary as string,
          { name: fontPrimaryType as string, provider: 'none' },
        ],
        secondary: [
          fontSecondary as string,
          { name: fontSecondaryType as string, provider: 'none' },
        ],
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      text: theme.colors.default.text_color.default,
      light: theme.colors.default.text_color.light,
      dark: theme.colors.default.text_color.dark,
      color: {
        1: theme.colors.default.theme_color.color_1,
        2: theme.colors.default.theme_color.color_2,
        3: theme.colors.default.theme_color.color_3,
        4: theme.colors.default.theme_color.color_4,
        5: theme.colors.default.theme_color.color_5,
        6: theme.colors.default.theme_color.color_6,
        7: theme.colors.default.theme_color.color_7,
      },
    },
    breakpoints: {
      xs: '340px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1366px',
    },
    container: {
      center: true,
      maxWidth: {
        xs: '330px',
        sm: '520px',
        md: '920px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1690px',
      },
      padding: {
        DEFAULT: '1rem',
      },
    },
  },
  rules: [
    [/^border-color-(\d)$/, ([, d]) => ({ 'border-color': getColor(d) })],
  ],
  shortcuts: {
    'app-gradient':
      'p-8 rounded-2xl  bg-gradient-linear bg-gradient-to-[#E6E7E8] bg-gradient-from-[#FFFFFF] border-gray ring-[#707070] ring ring-offset-10',
    'main-gradient':
      'p-8 rounded-2xl bg-gradient-linear bg-gradient-from-[#FFFFFF] bg-gradient-from-[#E6E7E8]',
    'header-actions__link': 'flex relative transition ease',
    'header-actions__icon': 'text-4xl md:text-[2.45rem] text-black',
    'header-actions__indicator-wrapper':
      'absolute bottom-0 -right-[3px] flex justify-center items-center w-[20px] h-[20px] text-white bg-color-2 rounded-full',
    'header-actions__indicator': 'text-xs leading-4 font-medium not-italic',

    'input-group': 'py-3 pt-2 first:mb-4',
    'input-error': 'border-red-500',
    'auth-form__wrapper': 'p-6 max-w-[26rem] mx-auto mb-4 app-gradient',
    'auth-form__title': 'text-base mb-4 text-black',
    'auth-form__footer': 'py-3 mb-4 mt-2',
    form__group: 'md:mb-2 lg:mb-4',
    'form__btn-group': 'mb-0 mt-4',
    form__label: 'text-xs mb-3 text-dark-800 font-bold md:text-sm',
    form__required: 'ml-1 text-red-500',

    // Block
    'b-header': 'text-center pb-8 md:pb-15',
    'b-title': 'text-sm font-bold text-black md:text-xl',
    'b-content': 'flex flex-col-reverse gap-8 md:(flex-row) lg:gap-12',
    'b-left': 'flex-[0_0_100%] md:flex-[0_0_60%]',
    'b-right': 'flex-[0_0_100%] md:flex-[0_0_35%]',
    'b-subtitle':
      'text-sm text-color-2 mt-0 mb-6 font-bold md:mb-3 lg:text-base',
    'b-link-wrapper': 'flex justify-between items-center',
  },
  preflights: [
    {
      getCSS: () => `
        html {
          font-size: ${fontBase}px;
          box-sizing: border-box;
        }

        h1 {
          @apply text-3xl md:text-3xl lg:text-[${h1}rem];
        }

        h2 {
          @apply lg:text-[${h2}rem];
        }

        h3 {
          @apply lg:text-[${h3}rem];
        }

        h4 {
          @apply lg:text-[${h4}rem];
        }

        h5 {
          @apply lg:text-[${h5}rem];
        }

        h6 {
          @apply lg:text-[${h6}rem];
        }
      `,
    },
  ],
});
