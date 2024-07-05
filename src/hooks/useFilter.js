function useFilter(data, filterValue, filterField, queryValue) {

    function filterByField(data, filterValue, filterField) {
        if (filterValue && filterValue !== 'null') {
            if (Array.isArray(data) && data.length > 0) {
                data = data.filter((item) => item[filterField] === filterValue)
            }
        }
        return data
    }

    function queryByField(data, queryValue, queryField) {
        if (queryValue && queryField) {
            if (Array.isArray(data) && data.length > 0) {
                data =  data.filter((item) => item[queryField].includes(queryValue))
            }
        }
        return data
    }

    function sortByField(data, sortField, sortDirection) {
        if (sortField) {
            // Сортировка числовых полей
            if (Array.isArray(data) && data.length > 0) {
                if (Number.isInteger(data[0][sortField])) {
    
                    if (sortDirection === 'asc') {
                        data = data.sort((a, b) => a[sortField] - b[sortField])
                    }
                    else if (sortDirection === 'desc') {
                        data = data.sort((a, b) => a[sortField] + b[sortField])
                    }
    
                }
                // Сортировка текстовых полей
                else {
    
                    if (sortDirection === 'asc') {
                        data = data.sort((a, b) => a[sortField].toLowerCase().localeCompare(b[sortField].toLowerCase()))
                    }
                    else if (sortDirection === 'desc') {
                        data = data.sort((a, b) => b[sortField].toLowerCase().localeCompare(a[sortField].toLowerCase()))
                    }
    
                }
                return data
            }
        }
    }

    return [filterByField, queryByField, sortByField]

}

export{useFilter}