
async function getCharacter( query = 'https://rickandmortyapi.com/api/character'){
    try {
        return unWrap(await fetch(query))
    } catch (error) {
        return getErrorResponse(error)
    }
}

async function getSingleCharacter( query ){
    try {
        return unWrap(await fetch(query))
    } catch (error) {
        return getErrorResponse(error)
    }
}

async function unWrap(response){
    const json = await response.json()
    //const {dates,page,results,total_pages,total_results} = json
    return {
        ok:true,
        ...json
    }
}

function getErrorResponse(error){
    return {
        results:[],
        ok:false,
        info:{
            "count": 0,
            "pages": 0,
        },
        status:500,
        statusText:error.message
    }
}