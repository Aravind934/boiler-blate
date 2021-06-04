import axios from 'axios'

let Url = `http://localhost:8000`

export let registerUser = values =>dispatch=>{
    
    axios.post(`${Url}/user/auth/register`,values).then(result=>{
        dispatch({type:'REGISTER',payload:result.data})
    })
}

export let registerWithGoogle = tokenId => dispatch =>{
    let data = {tokenId}
    axios.post(`${Url}/user/auth/registerWithGoogle`,data).then(result=>{
        dispatch({type:'REGISTER',payload:result.data})
    })
}

export let loginUser = values =>dispatch =>{
    axios.post(`${Url}/user/auth/login`,values).then(result=>{
        if(result.data.token){
            localStorage.setItem('token',result.data.token)

        }
        dispatch({type:'LOGIN',payload:result.data})
    })
}

export let loginWithGoogle = tokenId => dispatch =>{
    let data = {tokenId}
    axios.post(`${Url}/user/auth/loginWithGoogle`,data).then(result=>{
        if(result.data.token){
            localStorage.setItem('token',result.data.token)
        }
        dispatch({type:'LOGIN',payload:result.data})
    })
}

export let forgetPassword =(values)=>dispatch=>{
    axios.post(`${Url}/user/auth/forgetPassword`,values).then(result=>{
        //console.log(result)
        dispatch({type:'FORGET',payload:result.data})
    })
}