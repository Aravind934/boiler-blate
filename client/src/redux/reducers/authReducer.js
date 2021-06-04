let reducer = (state='',action)=>{
    switch(action.type){
        case 'REGISTER':
            state = action.payload
            return state
        case 'LOGIN':
            state = action.payload
            return state
        case 'FORGET':
            state = action.payload
            return state
        case 'RESET':
            state = ''
            return state
        default:
            return state
    }
}

export default reducer