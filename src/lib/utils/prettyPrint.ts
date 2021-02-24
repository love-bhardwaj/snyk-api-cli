import * as util from 'util';

export default (obj: object) => {
  console.log(JSON.stringify(obj, null, 4));
};
