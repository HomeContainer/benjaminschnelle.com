class UIService {
  constructor() {
    this.breakPoints = [
      { name: 'extraSmall', max: 480 },
      { name: 'small', min: 480, max: 768 },
      { name: 'medium', min: 768, max: 992 },
      { name: 'large', min: 992, max: 1200 },
      { name: 'extraLarge', min: 1200, max: 1920 },
      { name: 'huge', min: 1920 }
    ];
  }

  calculateBreakPointFlags(width) {
    return this.breakPoints.reduce((flags, { name, min, max }) => {
      const newFlags = Object.assign({}, flags);
      newFlags[name] = (!min || width > min) && (!max || width <= max);
      return newFlags;
    }, {});
  }

  getScreen(state) {
    const is = state.get('is').toObject();
    return this.breakPoints.reverse().find(
      (breakPoint) => is[breakPoint.name]
    ).name;
  }
}

export default new UIService();
