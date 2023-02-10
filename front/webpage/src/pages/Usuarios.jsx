import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'

import { getAllUsers, reset } from "../features/auth/authSlice"
import UserItem from "../components/UserItem"
import SearchBar from "../components/SearchBar"

function Usuarios() {
  const dispatch = useDispatch()
  const [search,setSearch] = useState('')

  const { users, isLoading, isError, message } = useSelector((state) => state.auth)

  const [usersfilter,setUsersFilter] = useState(users)

  useEffect(()=>{

    if(isError){
      console.log(message)
    }else{
      dispatch(getAllUsers())
    }
  
    return ()=>{
      dispatch(reset())
    }

  },[isError,message,dispatch])

  useEffect(() => {

    setUsersFilter((prevState)=>users.filter((user)=>{return Object.values(user).join('').toLowerCase().includes(search.toLowerCase())}))
    
  }, [search])

  useEffect(() => {
    setUsersFilter(users)
  }, [users])

  if(isLoading){
    return (
      <Spinner/>
    ) 
  }

  return (
    <>
      <SearchBar setSearch={setSearch}/>
        <section className="content">
          {usersfilter.length > 0 ? (
          <div>
            <div className="grupos">
              {usersfilter.slice().sort((a,b)=> a.usuario.toUpperCase()>b.usuario.toUpperCase() ? 1:a.usuario.toUpperCase()<b.usuario.toUpperCase() ? -1:0)
.map((user)=>(
                <UserItem key={user.id} usuario={user}/>
              ))}
            </div>
          </div>):(<h3>No hay ningun usuario</h3>)}
        </section>
        <br /><br />
    </>
  )
}

export default Usuarios