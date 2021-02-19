import * as util from 'util';

export default (obj: object) => {
  console.log(
    util.inspect(obj, {
      showHidden: false,
      depth: null,
      colors: true,
    }),
  );
};
