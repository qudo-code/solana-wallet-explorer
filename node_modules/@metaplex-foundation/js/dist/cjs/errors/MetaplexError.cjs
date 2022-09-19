'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_virtual/_rollupPluginBabelHelpers.cjs');

/** @group Errors */
class MetaplexError extends Error {
  constructor(input) {
    var _input$options, _input$options2, _input$options3, _input$options4, _input$options5, _input$options6, _input$options7, _input$options8;

    super(input.problem);

    _rollupPluginBabelHelpers.defineProperty(this, "name", 'MetaplexError');

    this.key = `metaplex.errors.${input.key}`;
    this.title = input.title;
    this.problem = overrideWithOptions(input.problem, (_input$options = input.options) === null || _input$options === void 0 ? void 0 : _input$options.problem, (_input$options2 = input.options) === null || _input$options2 === void 0 ? void 0 : _input$options2.problemPrefix, (_input$options3 = input.options) === null || _input$options3 === void 0 ? void 0 : _input$options3.problemSuffix);
    this.solution = overrideWithOptions(input.solution, (_input$options4 = input.options) === null || _input$options4 === void 0 ? void 0 : _input$options4.solution, (_input$options5 = input.options) === null || _input$options5 === void 0 ? void 0 : _input$options5.solutionPrefix, (_input$options6 = input.options) === null || _input$options6 === void 0 ? void 0 : _input$options6.solutionSuffix);
    this.source = input.source;
    this.sourceDetails = input.sourceDetails;
    this.cause = (_input$options7 = input.options) === null || _input$options7 === void 0 ? void 0 : _input$options7.cause;
    this.logs = (_input$options8 = input.options) === null || _input$options8 === void 0 ? void 0 : _input$options8.logs;
    this.message = this.toString(false);
  }

  getCapitalizedSource() {
    if (this.source === 'sdk' || this.source === 'rpc') {
      return this.source.toUpperCase();
    }

    return this.source[0].toUpperCase() + this.source.slice(1);
  }

  getFullSource() {
    const capitalizedSource = this.getCapitalizedSource();
    const sourceDetails = this.sourceDetails ? ` > ${this.sourceDetails}` : '';
    return capitalizedSource + sourceDetails;
  }

  toString(withName = true) {
    const logs = this.logs != null ? `\n\n[ Logs: ${this.logs.join(' |$> ')} ]` : '';
    const causedBy = this.cause ? `\n\nCaused By: ${this.cause}` : '';
    return (withName ? `[${this.name}] ` : '') + `${this.title}` + `\n>> Source: ${this.getFullSource()}` + `\n>> Problem: ${this.problem}` + `\n>> Solution: ${this.solution}` + causedBy + logs + '\n';
  }

}

const overrideWithOptions = (defaultText, override, prefix, suffix) => {
  return [prefix, override !== null && override !== void 0 ? override : defaultText, suffix].filter(text => !!text).join(' ');
};

exports.MetaplexError = MetaplexError;
//# sourceMappingURL=MetaplexError.cjs.map
