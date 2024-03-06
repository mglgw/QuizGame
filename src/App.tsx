import './App.css'
import {store} from "./store";
import {Provider} from "react-redux";
import QuizGameModeSelector from "./components/quizGameModeSelector.tsx";
import {start} from "./connection.ts";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Background from "./components/background.tsx";
import Glitch from "./components/glitch.tsx";
start();
function App() {

  return (
      <Provider store={store}>
          <div className={'flex flex-col items-center w-full z-10 relative'}>
              <Glitch text={"Quiz Game!"} style={"LogoFont"}/>
          </div>
          <QuizGameModeSelector/>
          <ToastContainer stacked={true}/>
          <Background/>
     </Provider>
  )
}

export default App
