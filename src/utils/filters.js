function filters(query) {
    let obj = {}
    let query_filters = Object.keys(query).filter(val => {
        return `${query[val]}`.trim() != ''
    })
    query_filters.forEach(val => {
        obj[val] = query[val]
    })
    return obj
}

export default filters