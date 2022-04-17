import './App.css';
import { RegisterForm } from './components/RegisterForm';

function App() {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-5">
          <RegisterForm />
        </div>
        <div className="col-md-7 my-auto">
          <img className="img-fluid w-100" src="https://www.kindpng.com/picc/m/541-5412391_online-register-icon-png-transparent-png.png" alt=""/>
        </div>
      </div>
    </div>
  );
}

export default App;
