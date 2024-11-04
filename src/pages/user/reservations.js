import Navbar from "../../components/navs/nav";
import Sidebar from "../../components/Sidebar/usersidebar";
import ReservationList from "../../components/ReservationList";


export default function Reservation() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 ">
        <Navbar />

        <div className="relative md:pt-32  pt-10"> 
      </div>
        <div className="px-4 md:px-10 mx-auto w-full m-2">
          
         <ReservationList/>
         
        </div>
        
       
      </div>
    </>
  );
}