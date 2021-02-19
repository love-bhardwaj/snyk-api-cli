import * as util from 'util';

export default (obj: object) => {
  return util.inspect(obj, {
    showHidden: false,
    depth: null,
    colors: true,
  });
};
