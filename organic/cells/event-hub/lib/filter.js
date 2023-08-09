const templateFilter = {
  extractFirstName: function (fullname) {
    const names = fullname.split(' ')

    if (names.length > 2) {
      return names[1]
    } else {
      return names[0]
    }
  },
}

module.exports = templateFilter
