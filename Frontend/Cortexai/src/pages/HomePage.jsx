import { signInWithPopup } from 'firebase/auth'
import api from '../../utils/axios'
import {auth, googleProvider} from '../../utils/firebase'
import {FcGoogle} from 'react-icons/fc'
import getCurrentUser from '../features/getCurrentUser'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import Sidebar from '../components/Sidebar'
import ChatArea from '../components/ChatArea'
import Artifact from '../components/Artifact'


function HomePage() {
const dispatch=useDispatch()
const {userData}=useSelector((state) => state.user) //accessing data from state
console.log("userData", userData)



const handleLogin = async (token) => {
    try {
      console.log("Sending token to backend")

      const { data } = await api.post("/api/auth/login", { token })
      dispatch(setUserData(data))
      console.log("Backend response:", data)

      return data
    } catch (err) {
      console.error("Backend login error:", err)
      throw err
    }
  }


 const googleLogin = async () => {
  try {
    console.log("1. Opening Google login")

    const data = await signInWithPopup(auth, googleProvider)

    console.log("2. Firebase login successful", data.user.email)

    const token = await data.user.getIdToken()

    console.log("3. Got Firebase token")

    await handleLogin(token)

    console.log("4. Backend login successful")

    const datsa=await getCurrentUser()
    console.log("datsa", datsa)

    console.log("5. Current user fetched")

  } catch (err) {
    console.error("LOGIN ERROR:", err)
  }
}
  return (
   < div className='h-screen flex bg-[#0d0f14] text-white overflow-hidden'>
      <Sidebar/>
      <ChatArea/>
      <Artifact/>
      {!userData && (<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur'>
      <div className= 'w-[349px] bg-[#13151c] border border-white/[0.08] rounded-lg p-7 flex flex-col gap-5'>
      <div className= 'flex flex-col gap-1 '>
            <h2 className='text-[24px] font-semibold text-slate-100 tracking-tight'>Welcome to CortexAI</h2>
            <p className='text-[13px] text-slate-500'>Please login to continue using the app.</p>
     </div>
     <button onClick={googleLogin} className='flex  gap-4 bg-white text-black/90  hover:bg-gray-400 font-bold py-2 px-4 rounded'>
        <FcGoogle className="" size={24}/> Continue with Google
      </button>
    </div>
    </div>)}
    </div>

  )
  
}

export default HomePage
