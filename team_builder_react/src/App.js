import {
  Routes,
  Route
} from "react-router-dom";
//https://v5.reactrouter.com/web/guides/quick-start#:~:text=1st%20Example%3A%20Basic%20Routing

import Build from './pages/Build';
import Input from './pages/Input';
import Home from './pages/Home';

const App = () => {
  return (
    // https://stackoverflow.com/questions/70589529/react-router-v6-not-rendering#:~:text=)%20%7B%0A%20%20%20%20return%20(-,%3CRoutes%3E%0A%20%20%20%20%20%20%20%20%3CRoute%20path%3D%22/%22%20element%3D%7B%3CHome%20/%3E%7D%20/%3E%0A%20%20%20%20%20%20%20%20%3CRoute%20path%3D%22/details%22%20element%3D%7B%3CDetails%20/%3E%7D%20/%3E%0A%20%20%20%20%20%20%20%20%3CRoute%20path%3D%22/contact%22%20element%3D%7B%3CContact%20/%3E%7D%20/%3E%0A%20%20%20%20%20%20%3C/Routes%3E,-)%3B%0A%20%20%7D%0A%7D
    <Routes>
      <Route path="/input" element={<Input />} />
      <Route path="/build" element={<Build />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
