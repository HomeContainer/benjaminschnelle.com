class UIService {
  constructor() {
    this.breakPoints = {
      extraSmall: { max: 480 },
      small: { min: 480, max: 768 },
      medium: { min: 768, max: 992 },
      large: { min: 992, max: 1200 },
      extraLarge: { min: 1200, max: 1920 },
      huge: { min: 1920 }
    };
  }

  calculateBreakPointFlags(width) {
    return Object.keys(this.breakPoints).reduce((flags, breakPoint) => {
      const newFlags = Object.assign({}, flags);
      const { min, max } = this.breakPoints[breakPoint];
      newFlags[breakPoint] = (!min || width > min) && (!max || width <= max);
      return newFlags;
    }, {});
  }
}

export default new UIService();
