const INITIAL_STATE = {
    id:0,
    dataUsers:[],    
    isLogin:false,
    isLoading:false
}

export default (state =INITIAL_STATE,action)=>{
    switch(action.type){
        
        case 'LOGIN':
            console.log('auth reducer jalan')
            return {...state,isLogin:true,isLoading:false,dataUsers:action.dataUsers}

        case 'LOGOUT':
                return {INITIAL_STATE}

        case 'FETCHDATA':
            return {...state,isLoading:false,dataUsers:action.dataUsers}        

        default : return state
    }
}