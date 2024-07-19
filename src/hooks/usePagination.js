function usePagination(data, lengthPage) {


    function setPage(currentPage) {
        if (currentPage > 0) {
            if (data && Array.isArray(data) && data.length > 0) {
                if (data.length < lengthPage && currentPage === 1) {
                    return data.slice(0, data.length - 1)
                }
                else if (data.length >= lengthPage) {
                    return data.slice((currentPage - 1) * lengthPage, currentPage * lengthPage)
                }
                else {
                    console.error('Не удалось найти подходящие данные')
                }
            }
        }
        else {
            console.error('Номер страницы не может быть 0 и нже');
        }
    }

    function getArrayPages(currentPage) {
        // Определяет какие страницы будут показываться в пагинации  
        let allPages = []
        if (countPages > 0 && currentPage > 0) {
            for (let i = 1; i <= countPages; i++) {
                // Три первых
                if (i <= 3) {
                    allPages.push(Number(i))
                }
                // Три последних
                if (i >= countPages - 3) {
                    allPages.push(Number(i))
                }
                // текущая и две справа, и две слева (например текущая: 9, значит будут показываться ещё страницы 7,8 И 10,11)
                if ((i >= currentPage - 2) && (i <= currentPage + 2)) {
                    allPages.push(Number(i))
                }
            }
            // Страницы не должны повторяться
            allPages = Array.from(new Set(allPages.sort((a, b) => Number(a) - Number(b))))
        }
        return allPages

    }

    let countPages = null
    if (data && Array.isArray(data) && data.length > 0) {
        countPages = Math.ceil(data.length / lengthPage)        
    }


    return [setPage, getArrayPages, countPages]

}

export { usePagination }