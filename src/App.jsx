import { BrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import { Hero, Navbar, Tech } from "./components";

const About = lazy(() => import("./components/About"));
const Experience = lazy(() => import("./components/Experience"));
const Feedbacks = lazy(() => import("./components/Feedbacks"));
const Works = lazy(() => import("./components/Works"));
const Contact = lazy(() => import("./components/Contact"));
const StarsCanvas = lazy(() => import("./components/canvas/Stars"));

const App = () => {
  return (
      <BrowserRouter>
          <div className='bg-pattern bg-cover bg-no-repeat bg-center overflow-hidden'>
            {/* <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'> */}
            <div>
              <Navbar />
              <Hero />
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <About/>
              <Experience /> 
              <Tech />
              <Works /> 
              <Feedbacks /> 
              <div className='relative z-0'>
                <Contact />
                {/* <StarsCanvas />  */}
              </div> 
            </Suspense>
          </div>
      </BrowserRouter>
  );
}

export default App;
