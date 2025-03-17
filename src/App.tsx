import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';

const App: React.FC = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/SignIn" />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUp />} />
    </Routes>
  </Router>
  );
};

export default App;