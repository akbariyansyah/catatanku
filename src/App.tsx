
import { Routes, Route } from "react-router-dom";
import { NavigationMenuDemo } from './NavigationMenu'

import { Home } from "./Home";
import { Task } from "./Task";

function App() {
  return (
    <>
      <div className='w-1000px mx-auto mt-5 pl-5 rounded-lg'>
        <NavigationMenuDemo />
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/task" element={<Task />} />
      

            {/* wildcard fallback */}
            <Route path="*" element={<div>404 — Page not found</div>} />
          </Routes>
        </div>
      </div>

    </>
  )
}

export default App
