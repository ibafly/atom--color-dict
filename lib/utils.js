export default {
  getHexesInAHexsOnlyLine: function (line) {
    const regex = /^(?:\s*([0-9a-f]{6}|[0-9a-f]{3}))+\s*$/gi
    return line.match(regex)
  }
}
