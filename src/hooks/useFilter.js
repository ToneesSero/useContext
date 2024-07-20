function useFilter(data, filterValue, filterField, queryValue) {

    function notNull(params) {
        return params !== null && params !== undefined && params !== 'null'
    }
    // Фильтрация по полю
    function filterByField(data, filterValue, filterField) {
        if ( notNull(filterValue) && notNull(filterField)) {
            if (Array.isArray(data) && data.length > 0) {
                data = data.filter((item) => item[filterField] === filterValue)
            }
        }
        return data
    }

    // Поиск по полю
    function queryByField(data, queryValue, queryField, startStr = false) {
        if (queryValue && queryField) {
            if (Array.isArray(data) && data.length > 0) {
                if (startStr) {
                    data = data.filter((item) => findNestedValue(queryField, item).toLowerCase().indexOf(queryValue.toLowerCase()) === 0)
                }
                else {
                    data = data.filter((item) => findNestedValue(queryField, item).toLowerCase().includes(queryValue.toLowerCase()))
                }

            }

        }
        return data
    }

    // Если path передан в формате 'path!!nextpath' то функция будет искать вложенности в объекте
    function findNestedValue(path, item) {
        let nestedData = null
        if (path.includes('!!')) {
            let arrayField = path.split('!!')
            nestedData = item
            for (let i = 0; i < arrayField.length; i++) {
                nestedData = nestedData[arrayField[i]]
            }
        }
        else {
            nestedData = item[path]
        }
        return nestedData ? nestedData : ''
    }

    // Сортировка по полю
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

export { useFilter }