export const opacity = (color, percentage) => ((color + (percentage*255).toString(16).toUpperCase()).slice(0, 9));

export const alphabet = (index) => (String.fromCharCode(65 + index));