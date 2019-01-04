export default {
  capitalizeFirstLetter: string => string.charAt(0).toUpperCase() + string.slice(1),

  getRandomInt: (min, max) => Math.floor(Math.random() * ((max - min) + 1)) + min,

  clone: (collection, property) => collection.map(item => (property ? item[property] : item)),

  unique: array => {
    const t = {}
    return array.filter(item => {
      if (Object.prototype.hasOwnProperty.call(t, item)) {
        return false
      }
      return (t[item] = true)
    })
  },

  sortByKey: (list, key) => list.sort((a, b) => {
    if (a[key] < b[key]) {
      return -1
    } else if (a[key] > b[key]) {
      return 1
    }
    return 0
  }),

}
