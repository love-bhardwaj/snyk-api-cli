import * as util from 'util';

export default function (obj: object) {
  console.log(
    util.inspect(obj, {
      showHidden: false,
      depth: null,
      colors: true,
    }),
  );
}
