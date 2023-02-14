function filters(query) {
  const obj = {}
  const query_filters = Object.keys(query).filter(val => {
    return `${query[val]}`.trim() !== ''
  })
  query_filters.forEach(val => {
    obj[val] = query[val]
  })
  return obj
}

export default filters
