import React, {useState } from 'react';
import './Home.css'
import './../css/global.css'
import {AiFillHome,AiOutlinePlus,AiOutlineLeft,AiOutlineRight} from 'react-icons/ai'
import {HiUserGroup} from 'react-icons/hi'
import {BiCalendar} from 'react-icons/bi'
import {FaSearch} from 'react-icons/fa'
import {BsThreeDots} from 'react-icons/bs'
import { Link} from 'react-router-dom';
import debounce from 'lodash.debounce';
import moment from 'moment'
import LazyLoad from 'react-lazyload';
import Header from './../../Components/Header'
import {connect} from 'react-redux';
import {FetchFunc} from './../../Redux/Actions'
function Home(props){

    const [dataRender,setDataRender]=useState(props.dataUsers)
    const [stateRender,setStateRender]=useState(1)
    const [isBack,setIsBack]=useState(true)
    const [isNext,setIsNext]=useState(false)
    const [angkaAwal,setAngkaAwal]=useState(0)
    const [angkaMaks,setAngkaMaks]=useState(4)
    const [isHover,setIsHover]=useState(false)
    
   


    
    // useEffect(()=>{
    //     setDataRender(props.dataUsers)
    // },[])


    const renderData3=()=>{
        // angka awal untuk nentuin mau ngedapetin berapa data, karna mau 4. jd start dr 0
        // angka maks untuk nentuin maksimal data buat di loop. jd 4, untuk nextnya karna mau 4 jadi setiap next button + 4
        var simpan =[]
        var id = []
        
        for(var i=angkaAwal; i<dataRender.length; i++){
            if(i<angkaMaks){
                simpan.push(dataRender[i])
                id.push(i+1)        
            }
            // console.log(simpan)
        }
  
        return simpan.map((val,index)=>{
            return (
                <>
                    <div className="personnel" key={index}>
                        <LazyLoad >
                        <div className="index-personnel">
                            <p>Personnel ID : {id[index]}</p>
                            <BsThreeDots className="icon-option" style={{color:'#797979'}}/>
                        </div>
                        <div className="box-for-personnel">
                            <div className="personnel-img">
                                <img src={val.picture.thumbnail} alt="error" id="logo-personnel"></img>
                            </div>
                            <div className="personnel-data">
                                <p style={{fontWeight:800}} >Nama</p>
                                <p>{val.name.first} {val.name.last}</p>
                                <p style={{fontWeight:800}}>Telephone</p>
                                <p>{val.phone}</p>
                                <p style={{fontWeight:800}} id="del">Birthday</p>
                                <p id="del">{moment(val.dob.date).format('DD-MM')}</p>
                                <p style={{fontWeight:800}} id="del">Email</p>
                                <p id="del">{val.email}</p>
                            </div>
                        </div>
                        </LazyLoad>
                    </div>

                </>
            )
            
        })
        
        
        
    }
    const nextPage=()=>{
        // console.log(id)
        console.log(angkaMaks)
        console.log(dataRender.length)
        setStateRender((stateRender+1))
        console.log('state render jadi ' , stateRender,'sekarang jadi', stateRender+1)
        if(stateRender ===7){
            // alert('masuk ke if next page')
            setStateRender(7)
            setIsNext(true)
        }else{
            
            // alert('masuk ke else next page', stateRender)
            setAngkaAwal(angkaAwal+4)
            setAngkaMaks(angkaMaks+4)
            setStateRender(stateRender+1)
            setIsBack(false)
            setIsNext(false)

        }
        console.log(stateRender,'173 + state render')
        
    }

    const previousPage=()=>{
        setStateRender((stateRender-1))
        console.log('state render jadi ' , stateRender, 'sekarang jadi', stateRender-1)   
        if(stateRender<1 || stateRender === 1){
            // alert('masuk ke if previous page')
            setStateRender(1)
            setIsBack(true)
        }else {
            // alert('masuk ke else previous page')
            setAngkaAwal(angkaAwal-4)
            setAngkaMaks(angkaMaks-4)
            setStateRender(stateRender-1)
            setIsBack(false)
            setIsNext(false)
            
        }
        console.log(stateRender,'184 - state render')
    }

    const onChange=debounce(function(name){
        if(name){
            console.log(name)
            filterSearch(name)
            
        }else if(name === ''){
            let dataLocalStorage = JSON.parse(localStorage.getItem('listData'))
            setDataRender(dataLocalStorage)
            
        }
    },1000)

    const filterSearch=(input)=>{
        var filterdata = dataRender.filter((val)=>{
            // return val.nama_product.toLowerCase() === input.toLowerCase()
            return val.name.first.toLowerCase().includes(input.toLowerCase())
        })

        if(filterdata.length === 0 ){
            console.log('data kosong')
        }
        console.log(filterdata)
        // setListData(filterdata)
        setDataRender(filterdata)
    }

  
    
    return (
        
        <>

        
            <div className="box-home">
               <Header/>
                <div className="box-content">
                    <div className="content-left">
                        <div className="box-option">
                            <AiFillHome className="icon-option"/>
                            <p>Beranda</p>
                        </div>
                        <div className="box-option">
                            <HiUserGroup className="icon-option" style={{color:'#4cd1d0'}}/>
                            <p style={{color:'#4cd1d0',fontWeight:'700'}}>Personnel List</p>
                        </div>
                        <div className="box-option">
                            <BiCalendar className="icon-option"/>
                            <p>Daily Attendance</p>
                        </div>
                    </div>
                    <div className="content-right">
                        <div className="box-search">
                            <div className="box-personnel">
                                <p style={{fontSize:'30px',color:'#4cd1d0',fontWeight:'700'}}>PERSONNEL LIST</p>
                                <p style={{fontSize:'20px',color:'gray'}}>List of all Personnels</p>
                            </div>

                            <div className="box-personnel-2">
                                <div className="search-person">
                                    <FaSearch className="icon-option" style={{color:'#4cd1d0'}}/>
                                    <div className="box-input-find">
                                        <input type="text" placeholder="Find Personnel"  style={{border:'none'}} className="input-box"
                                        onMouseEnter={()=>setIsHover(true)}
                                        onMouseLeave={()=>setIsHover(false)}
                                        onChange={(e)=>onChange(e.target.value)}
                                        />
                                        {
                                            isHover?
                                            <>
                                                <div className="hover-box">
                                                    <p>Tekan untuk find Personnel</p>
                                                </div>
                                            </>
                                            :
                                            null
                                        }

                                    </div>
                                </div>
                                <div className="search-person-2">
                                    <p>ADD PERSONNEL</p>
                                    <AiOutlinePlus className="icon-option" style={{color:'white',fontSize:'35px'}}/>
                                </div>
                            </div>
                        </div>
                        <div className="box-render">
                           {/* render data disini */}
                            {renderData3()}
                         
                        </div>

                        <div className="btn-footer">
                            {
                                isBack ?
                            <div className="next-btn" >
                                <AiOutlineLeft className="icon-option-2" value={{color:'#a2a2a2',fontSize:'25px'}} />
                                <p style={{color:'#a2a2a2'}}>Previous Page</p>
                            </div>
                            : 
                            <Link to={`/${stateRender}`}>
                                <div className="next-btn" onClick={previousPage}>
                                    <AiOutlineLeft className="icon-option-2" style={{color:'black',fontSize:'25px'}} />
                                    <p style={{color:'black'}}>Previous Page</p>
                                </div>
                            </Link>
                            }

                            { isNext?
                            <div className="next-btn" >
                                <p style={{color:'#a2a2a2'}}>Next Page</p>
                                <AiOutlineRight className="icon-option-2"  value={{color:'#a2a2a2'}}/>
                            </div>
                            :
                            <Link to={`/${stateRender}`}>
                            <div className="next-btn" onClick={()=>nextPage()} >
                                <p style={{color:'black'}}>Next Page</p>
                                <AiOutlineRight className="icon-option-2" />
                            </div>
                            </Link>
                            
                            }

                        </div>

                    </div>

                </div>

            </div>

            
        </>
    )
}

const Mapstatetoprops=({Auth})=>{
    return {
        ...Auth
    }
}

export default connect(Mapstatetoprops,{FetchFunc})(Home);