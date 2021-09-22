/* eslint-disable prettier/prettier */
const prepareForUpdate = (obj: any) => {
  obj._lastChangedAt = undefined;
  obj.createdAt = undefined;
  obj.owner = undefined;
  obj.updatedAt = undefined;
  for (const propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
  return obj;
};
export default prepareForUpdate;
