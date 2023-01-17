class Theme {
  constructor(quill, options) {
    this.quill = quill;
    this.options = options;
    this.modules = {};
  }

  init() {
    Object.keys(this.options.modules).forEach(name => {
      // 挂载options中module配置
      if (this.modules[name] == null) {
        this.addModule(name);
      }
    });
  }

  addModule(name) {
    // 导入模块类
    const ModuleClass = this.quill.constructor.import(`modules/${name}`);
    // 实例化各个module
    this.modules[name] = new ModuleClass(
      this.quill,
      this.options.modules[name] || {},
    );
    return this.modules[name];
  }
}
Theme.DEFAULTS = {
  modules: {},
};
Theme.themes = {
  default: Theme,
};

export default Theme;
