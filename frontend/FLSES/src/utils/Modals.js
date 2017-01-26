import * as colors from '../styling/Colors';

export const flow = {
  a: {
    left: 'logout',
    right: 'menu',
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
  other: colors.basicLime,
};

export const courseStatusFontWeights = {
  active: "700",
  inactive: "400",
  other: "100",
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

export const scenesByIndex = [
  'login',
  'landing',
  'questions',
  'answer',
];

export const sceneNavBarTitles = {
  login: null,
  landing: 'Your Courses',
  questions: 'Questions',
  answer: 'Answer',
};