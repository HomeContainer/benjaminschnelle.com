class UIService {
  constructor() {
    this.breakPoints = {
      extraSmall: 480,
      small: 768,
      medium: 992,
      large: 1200,
      extraLarge: 1920
    };
  }

  calculateBreakPointFlags(width) {
    const { extraSmall, small, medium, large, extraLarge } = this.breakPoints;
    return {
      extraSmall: extraSmall <= width,
      small: small <= width,
      medium: medium <= width,
      large: large <= width,
      extraLarge: extraLarge <= width
    };
  }
}

export default new UIService();
