export interface INumberDictionary {
  [key: string ]: number;
}
export interface IColor extends INumberDictionary {
  black: number;
  blue: number;
  darkBlue: number;
  gray: number;
  white: number;
  green: number;
  turquoise: number;
  skin: number;
  lightBlue: number;
  lightGreen: number;
}
export const color: IColor = {
  black: .1,
  blue: .2,
  darkBlue: .3,
  gray: .4,
  white: .5,
  green: .6,
  turquoise: .7,
  skin: .8,
  lightBlue: .9,
  lightGreen: 1,
};

export interface INeckline extends INumberDictionary {
  round: number;
  v: number;
}

export const neckline: INeckline = {
  round: .1,
  v: 1,
};

export interface ITrainingInformation {
  color: number;
  hasPrinting: number;
  neckline: number;
  price: number;
}

export interface IShirt {
  trainingInformation: ITrainingInformation;
  imageFile: string;
  wanted: number;
}
export const shirts: IShirt[] = [
  {
    trainingInformation: {
      color: color.black,
      hasPrinting: 0,
      neckline: neckline.round,
      price: 19.99,
    },
    imageFile: 'cl_black_nl_circle_hp_false_prc_1999.jpg',
    wanted: 0
  },
  {
    trainingInformation: {
      color: color.blue,
      hasPrinting: 0,
      neckline: neckline.round,
      price: 19.99,
    },
    imageFile: 'cl_blue_nl_circle_hp_false_prc_1999.jpg',
    wanted: 0,
  },
  {
    trainingInformation: {
      color: color.darkBlue,
      hasPrinting: 1,
      neckline: neckline.round,
      price: 29.99,
    },
    imageFile: 'cl_darkblue_nl_circle_hp_true_prc_2999.jpg',
    wanted: 0,
  },
  {
    trainingInformation: {
      color: color.gray,
      hasPrinting: 0,
      neckline: neckline.v,
      price: 9.99,
    },
    imageFile: 'cl_gray_nl_v_hp_false_prc_999.jpg',
    wanted: 0,
  },
  {
    trainingInformation: {
      color: color.white,
      hasPrinting: 0,
      neckline: neckline.v,
      price: 9.99,
    },
    imageFile: 'cl_white_nl_v_hp_false_prc_999.jpg',
    wanted: 0,
  },
  {
    trainingInformation: {
      color: color.green,
      hasPrinting: 0,
      neckline: neckline.round,
      price: 17.99,
    },
    imageFile: 'cl_green_nl_circle_hp_false_prc_1799.jpg',
    wanted: 0,
  },
  {
    trainingInformation: {
      color: color.blue,
      hasPrinting: 0,
      neckline: neckline.round,
      price: 17.99,
    },
    imageFile: 'cl_blue_nl_circle_hp_false_prc_1799.jpg',
    wanted: 0,
  },
  {
    trainingInformation: {
      color: color.turquoise,
      hasPrinting: 1,
      neckline: neckline.round,
      price: 15.99,
    },
    imageFile: 'cl_turqoise_nl_circle_hp_true_prc_1599.jpg',
    wanted: 0,
  },
  {
    trainingInformation: {
      color: color.skin,
      hasPrinting: 1,
      neckline: neckline.round,
      price: 15.99,
    },
    imageFile: 'cl_skin_nl_circle_hp_true_prc_1599.jpg',
    wanted: 0,
  },
  {
    trainingInformation: {
      color: color.darkBlue,
      hasPrinting: 1,
      neckline: neckline.round,
      price: 15.99,
    },
    imageFile: 'cl_darkblue_nl_circle_hp_true_prc_1599.jpg',
    wanted: 0,
  },
  {
    trainingInformation: {
      color: color.turquoise,
      hasPrinting: 1,
      neckline: neckline.round,
      price: 15.99,
    },
    imageFile: 'cl_turqoise_nl_circle_hp_true_prc_1599_1.jpg',
    wanted: 0,
  },
  {
    trainingInformation: {
      color: color.darkBlue,
      hasPrinting: 1,
      neckline: neckline.round,
      price: 15.99,
    },
    imageFile: 'cl_darkblue_nl_circle_hp_true_prc_1599_1.jpg',
    wanted: 0,
  },
  {
    trainingInformation: {
      color: color.lightBlue,
      hasPrinting: 0,
      neckline: neckline.round,
      price: 19.99,
    },
    imageFile: 'cl_lightblue_nl_circle_hp_false_prc_1999.jpg',
    wanted: 0,
  },
  {
    trainingInformation: {
      color: color.lightGreen,
      hasPrinting: 0,
      neckline: neckline.round,
      price: 19.99,
    },
    imageFile: 'cl_lightgreen_nl_circle_hp_false_prc_1999.jpg',
    wanted: 0,
  },
  {
    trainingInformation: {
      color: color.skin,
      hasPrinting: 0,
      neckline: neckline.round,
      price: 19.99,
    },
    imageFile: 'cl_skin_nl_circle_hp_false_prc_1999.jpg',
    wanted: 0,
  },
  {
    trainingInformation: {
      color: color.gray,
      hasPrinting: 0,
      neckline: neckline.round,
      price: 19.99,
    },
    imageFile: 'cl_gray_nl_circle_hp_false_prc_1999.jpg',
    wanted: 0,
  },
];
