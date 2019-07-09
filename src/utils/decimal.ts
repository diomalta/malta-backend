export default (numero: number): any => {
  const array: Array<string> = numero.toFixed(2).split('.');
  array[0] = array[0].split(/(?=(?:...)*$)/).join('.');
  return array.join(',');
};
