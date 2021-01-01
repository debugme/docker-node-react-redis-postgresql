const fibonacci = (term) => {
  if (term < 2) return 1
  let p = 1
  let q = 1
  for (let i = 1; i < term; ++i) {
    ;[p, q] = [q, p + q]
  }
  return q
}

module.exports.fibonacci = fibonacci
