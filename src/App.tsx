import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Projects from "./pages/Projects"
import Skills from "./pages/Skills"
import About from "./pages/About"
import Contact from "./pages/Contact"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/projects" element={<Projects />} />

        <Route path="/skills" element={<Skills />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

      </Routes>
    </BrowserRouter>
  )
}