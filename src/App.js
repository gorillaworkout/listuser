import React,{useEffect,useState} from 'react';
import './App.css';
import {Switch,Route} from 'react-router-dom'
import Home from './Pages/Home/Home'
import {useDispatch} from 'react-redux'
import axios from 'axios'
import {FetchFunc} from './Redux/Actions'
function App() {
  const dispatch = useDispatch()

  const [loading,setLoading]=useState(true)
  const fetchData=()=>{
    axios.get(`https://randomuser.me/api/?results=28`)
    .then((res)=>{
      console.log('line 16 app js')
        // console.log(res.data)
        // setDataRender(res.data.results)
        if(res.data.results){
          console.log('line 20 app js')
          console.log(res.data.results)
          localStorage.setItem('listData',JSON.stringify(res.data.results))
          dispatch(FetchFunc(res.data.results))

        }else {
          setLoading(false)
        }
    }).catch((err)=>{
        console.log(err)
    }).finally(()=>{
      setLoading(false)
    })
}


  useEffect(()=>{
    let dataLocalStorage = JSON.parse(localStorage.getItem('listData'))

    if(localStorage.length == 0){
      // alert('masuk ke if ls')
      fetchData()
    }else {
      dispatch(FetchFunc(dataLocalStorage))
      setLoading(false)
    }
  
  

  },[])

  if(loading){
    return(
        <div className='d-flex justify-content-center align-items-center' style={{height:"100vh", width:"100vw"}}>
            {/* {FullPageLoading(loading,100,'#0095DA')} */}
            <p>Loading</p>
        </div>
    )
  }


  return (
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/:id' component={Home}/>
    </Switch>

  )
  
}

export default App;
