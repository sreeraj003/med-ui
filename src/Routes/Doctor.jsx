import { lazy, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import RequireDoctor from '../context/auth/requireDoctor'
import Signup from "../components/Signup"
import Navbar from '../components/Navbar'
import Otp from '../components/otp'
import Login from '../components/Login'
import SetProfile from '../components/doctorComponents/setProfile'
import DocMain from '../components/doctorComponents/docMain'
import ForgotPassword from '../components/forgotPassword'
import ResetPassword from '../components/resetPassword'
import ErrorFallback from '../components/errorFallback'
import { useDispatch } from 'react-redux'
import useAuth from '../context/hooks/useAuth'
import axios from 'axios'
import { setDoctorData } from '../redux/doctorData'

const Success = lazy(() => import("../components/doctorComponents/success"))
const VideoCall = lazy(() => import('../components/videoCall'))

function Doctor() {
  const dispatch = useDispatch()
  const { setDoctor } = useAuth()
  const doctorToken = localStorage.getItem('doctorToken')
  const history = useNavigate()
  useEffect(() => {
    async function dataCall() {
      if (doctorToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${doctorToken}`;
        await axios.get(import.meta.env.VITE_BASE_URL + `userData`)
          .then(res => {
            if (res.data) {
              if (res.data !== 'unauthorized' || res.data !== 'blocked') {
                dispatch(setDoctorData(res.data))
                setDoctor(true)
              } else {
                history('/login')
              }
            }

          })
      } else {
        setDoctor(false)

      }
    }
    dataCall()
  }, [dispatch, history, setDoctor, doctorToken])
  return (
    <>
      <Navbar value='doctor' />
      <Routes>
        <Route path='/signup' element={<Signup value={'doctor'} />} />
        <Route path='/verify/:token' element={<Otp value={'doctor'} />} />
        <Route path='/login' element={<Login value={'doctor'} />} />
        <Route path='/forgotPassword' element={<ForgotPassword value={'doctor'} />} />
        <Route path='/newPassword/:email' element={<ResetPassword value={'doctor'} />} />
        <Route element={<RequireDoctor />} >
          <Route path='/' element={<DocMain value={'home'} />} />
          <Route path='/setprofile' element={<SetProfile />} />
          <Route path='/schedule' element={<DocMain value={'schedule'} />} />
          <Route path='/appointments' element={<DocMain value={'appointments'} />} />
          <Route path='/consult' element={<DocMain value={'consult'} />} />
          <Route path='/payments' element={<DocMain value={'payments'} />} />
          <Route path='/success' element={<Success />} />
          <Route path='/call/:room' element={<VideoCall value="doctor" />} />
          <Route path='/prescriptions' element={<DocMain value="prescription" />} />
          <Route path='/createPrscription' element={<DocMain value="createPrescription" />} />
          <Route path='/patients' element={<DocMain value="patients" />} />
        </Route>
          <Route path='/*' element={<ErrorFallback value="doctor" />} />
      </Routes>
    </>
  )
}

export default Doctor