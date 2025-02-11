import { Routes, Route } from "react-router-dom";
import Desktop from "./Desktop";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Desktop />} />
      <Route path="/route-chart" element={<div>Route Chart</div>} />
      <Route path="/keeb-viewer" element={<div>Keeb Viewer</div>} />
      <Route path="/projects" element={<div>Projects</div>} />
    </Routes>
  );
}

export default App;
