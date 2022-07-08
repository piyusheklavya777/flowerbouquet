
import * as util from 'util';
import _ from 'lodash';

export default class Logger {
  context: {};
  constructor() {
    this.context = {};
  }

  async info(message, obj = {}) {
    console.log({ message, context: this.context, details: obj });
  }

  async error(message, obj = {}) {
    console.log('error', message, { context: this.context, details: obj });
  }

  async warn(message, obj = {}) {
    console.log('warn', message, { context: this.context, details: obj });
  }

  async silly(message, obj = {}) {
    console.log(util.inspect({ message, details: obj }, false, null, true));
  }

  setContext(context) {
    if (_.isPlainObject(context)) {
      this.context = context;
    }
  }

  getContext() {
    return this.context;
  }

  updateContext(context) {
    if (_.isPlainObject(context)) {
      _.assign(this.context, { ...this.context, ...context });
    }
  }

  clearContext() {
    this.context = {};
  }
}
