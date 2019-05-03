export default {
  getHexesInAHexesOnlyLine: function (line) {
    const regex = /(?<=^\s*|\s*)(#[0-9a-f]{6}|#[0-9a-f]{3})(?=((#[0-9a-f]{6}|#[0-9a-f]{3})|\s*|\s*$))/gi
    return line.match(regex)
  }
}
