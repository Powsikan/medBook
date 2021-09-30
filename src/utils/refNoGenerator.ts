/* eslint-disable prettier/prettier */
export const refNoGenerator = () => {
  const time = new Date().toTimeString().split(' ')[0].split(':');
  const date = new Date().toLocaleDateString().split('/');
  const ref = date[2] + date[0] + date[1] + time.join('');

  return 'MB-' + ref;
};
