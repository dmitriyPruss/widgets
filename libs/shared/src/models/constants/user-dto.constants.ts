const regExps = {
  lastName: /^([A-Z][a-z]+)?(-[A-Z][a-z]*)?$/,
  name: /^[A-Z][a-z]+(-[A-Z][a-z]*)?$/,
  password: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&_*].*)/    
}

export default regExps;