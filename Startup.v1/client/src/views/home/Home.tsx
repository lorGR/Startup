import { useState } from "react"
import Header from "../../components/header/Header"
import Navbar from "../../components/navbar/Navbar"

const Home = () => {

  const [addMealForm, setAddMealForm] = useState(false);

  return (
    <div className="home">
      <Header headerType="addVals" addMealForm={addMealForm} setAddMealForm={setAddMealForm} />
      <Navbar navbarType="main" />
      {addMealForm &&
        <div>
          addMealForm
        </div>
      }
    </div>
  )
}

export default Home