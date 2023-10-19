import "./sharedlayout.scss";
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

export default function SharedLayout() {
  return (
    <div className='layout'>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}
