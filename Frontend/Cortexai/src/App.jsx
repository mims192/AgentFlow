import { useEffect } from 'react'
import HomePage from './pages/HomePage'
import getCurrentUser from './features/getCurrentUser'
import {Provider, useDispatch} from 'react-redux'
import { store } from './redux/store'
import { setUserData } from './redux/userSlice'
function App() {
  const dispatch=useDispatch()
  useEffect(()=>{
   const getUser=async()=>{
     const data =await getCurrentUser()
     dispatch(setUserData(data?.user || null )) //this way we set/update data of our state
  
   }
   getUser()
  },[])
  
  return (

      <HomePage />

  )
}

export default App
