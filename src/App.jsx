import './App.css'
import MainNavbar from "./components/MainNavbar.jsx";
import {Carousel} from "flowbite-react";
import LinkList from "./components/LinkList.jsx";

function App() {

  return (
    <>
      <MainNavbar/>
      <div className="flex mt-4">
        <div className="w-1/3">
          <LinkList/>
        </div>
        <div className="h-56 sm:h-64 xl:h-80 w-2/3 2xl:h-96">
          <Carousel>
            <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..."/>
            <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..."/>
            <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..."/>
            <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..."/>
            <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..."/>
          </Carousel>
        </div>
      </div>
    </>
  )
}

export default App
