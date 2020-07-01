const hour = (new Date()).getHours()
module.exports = {
  'hour': hour,
  'theme': hour > 7 && hour < 18 ? 'light' : 'dark'
}