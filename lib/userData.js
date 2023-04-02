import * as authenticate from './authenticate'

export async function  addToFavourites(id){
    
    const token = authenticate.getToken();
    console.log(token)
    const res =  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`,{
        method: 'PUT',
        body : JSON.stringify({id : id}),
        headers:{
            'content-type': 'application/json',
            'Authorization' : `jwt ${token}`
        },
    })

    const result = await res.json();

    if(res.status === 200){
        return result;
    } else{
        return [];
    }
    
}

export async function  removeFromFavourites(id){
    const token = authenticate.getToken();
    const res =  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`,{
        method: 'DELETE',
        body : JSON.stringify({id : id}),
        headers:{
            'content-type': 'application/json',
            'Authorization' : `jwt ${token}`
        },
    })

    const result = await res.json();

    if(res.status === 200){
        return result;
    } else{
        return [];
    }
    
}

export async function  getFavourites(){
    const token = authenticate.getToken();
    const res =  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`,{
        method: 'GET',
        headers:{
            'content-type': 'application/json',
            'Authorization' : `jwt ${token}`
        },
    })

    const result = await res.json();

    if(res.status === 200){
        return result;
    } else{
        return [];
    }
    
}


export async function  addToHistory(id){
    const token = authenticate.getToken();
    const res =  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`,{
        method: 'PUT',
        body : JSON.stringify({id : id}),
        headers:{
            'content-type': 'application/json',
            'Authorization' : `jwt ${token}`
        },
    })

    const result = await res.json();

    if(res.status === 200){
        return result;
    } else{
        return [];
    }
    
}

export async function  removeFromHistory(id){
    const token = authenticate.getToken();
    const res =  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`,{
        method: 'DELETE',
        body : JSON.stringify({id : id}),
        headers:{
            'content-type': 'application/json',
            'Authorization' : `jwt ${token}`
        },
    })

    const result = await res.json();

    if(res.status === 200){
        return result;
    } else{
        return [];
    }
    
}

export async function  getHistory(){
    const token = authenticate.getToken();
    const res =  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`,{
        method: 'GET',
        headers:{
            'content-type': 'application/json',
            'Authorization' : `jwt ${token}`
        },
    })

    const result = await res.json();

    if(res.status === 200){
        return result;
    } else{
        return [];
    }
    
}



