import Header from "../../components/header/Header"
import Navbar from "../../components/navbar/Navbar"

const Home = () => {
  return (
    <div className="home">
        <Header headerType="addVals"/>
        <Navbar navbarType="main"/>
    </div>
  )
}

export default Home