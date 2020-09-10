export const DISTANCES = {
  NEAR: {
    distMin: 0,
    distMax: 10,
    businessNum: [0, 1, 2, 2, 3, 3, 4, 4, 4, 5, 5]
  },
  MEDIUM: {
    distMin: 11,
    distMax: 30,
    businessNum: [0, 2, 2, 3, 4, 4, 5, 5, 5, 6, 6]
  },
  FAR: { distMin: 31, distMax: 999, businessNum: [0, 3, 3, 4] }
};

export const PRICE_PER_KM = 0.19;
export const ORIGIN = 'Politécnico Jesús Marín'; //TODO (recomendation) origin can be a object with the origin name, position and more information.
export const ORIGIN_POSITION = {
  latitude: 36.718288,
  longitude: -4.446774
};

export const RANGES = {
  NEAR: '0-10',
  MEDIUM: '10-30',
  FAR: '>31'
};
