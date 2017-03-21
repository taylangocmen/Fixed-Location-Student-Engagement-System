import * as colors from '../styling/Colors';
import {opacity} from '../utils/Functions';

export const flow = {
  a: {
    left: 'logout',
    title: 'Courses',
    right: 'refresh',
  },
  b: {
    left: 'back',
    title: 'Questions',
    right: 'menu',
  },
  c: {
    left: 'back',
    title: 'Answering',
    right: 'menu',
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
  inactive: colors.secondaryBondiBlue,
  expired: colors.secondaryCreamBrulee,
  other: colors.basicLime,
};

export const questionStatusFontWeights = {
  active: "700",
  inactive: "400",
  other: "100",
};

export const answerStatusColors = {
  correct: opacity(colors.accentFrostee, 0.85),
  submitted: opacity(colors.accentJordyBlue, 0.45),
  chosen: opacity(colors.accentGreyNurse, 0.65),
  free: colors.basicWhite
};

export const answerStatusFontWeight = {
  correct: "400",
  submitted: "400",
  chosen: "300",
  free: "300"
};

export const sceneNavBarTitles = {
  login: null,
  landing: 'Your Courses',
  questions: 'Questions',
  answer: 'Answer',
};