function usePagination(data, lengthPage) {

    function setPage(currentPage) {        
        if(currentPage > 0){
            if(data && Array.isArray(data) && data.length>0){
                if(data.length < lengthPage && currentPage==1){
                    return data.slice(0,data.length-1)
                }
                else if (data.length >= lengthPage){
                    return data.slice((currentPage-1)*lengthPage, currentPage*lengthPage)
                }
                else{
                    console.error('Не удалось найти подходящие данные')
                }
            }
        }  
        else{
            console.error('Номер страницы не может быть 0 и нже');
        }              
    }

    let countPages = null
    if(data && Array.isArray(data) && data.length > 0){
        countPages = Math.ceil(data.length / lengthPage)
    }
    

    return [setPage,countPages]

}

export{usePagination}