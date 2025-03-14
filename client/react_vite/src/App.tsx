import './App.css'
import {LoginPage} from "@/pages/login.tsx";


function App() {

  return (
    <>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginPage />
        </div>
      </div>
    </>
  )
}

export default App
