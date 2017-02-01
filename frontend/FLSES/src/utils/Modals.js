import * as colors from '../styling/Colors';

export const flow = {
  a: {
    left: 'close',
    right: 'refresh',
    title: 'Courses',
  },
  b: {
    left: 'back',
    right: 'menu',
    title: 'Questions',
  },
  c: {
    left: 'back',
    right: 'menu',
    title: 'Answering',
  },
};

export const courseStatusColors = {
  active: colors.secondaryCrimson,
  inactive: colors.secondaryBondiBlue,
  expired: colors.secondaryCreamBrulee,
  other: colors.basicBlack,
};

export const courseStatusFontWeights = {
  active: "700",
  inactive: "400",
  expired: "100",
  other: "900",
};

export const questionStatusColors = {
  active: colors.secondaryCrimson,
  inactive: colors.secondaryCreamBrulee,
  other: colors.basicLime,
};

export const questionStatusFontWeights = {
  active: "700",
  inactive: "400",
  other: "100",
};

export const sceneNavBarTitles = {
  login: null,
  landing: 'Your Courses',
  questions: 'Questions',
  answer: 'Answer',
};