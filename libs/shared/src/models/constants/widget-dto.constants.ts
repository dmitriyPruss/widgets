const regExps = {
  coord: /^[1-9][0-9]{0,2}$/,
  price: /^(?!0+[0-9])[0-9]{1,12}(?:\.\d{1,2})?$/, 
  title: /^[A-Za-z0-9_-]*$/
}
  
export default regExps;