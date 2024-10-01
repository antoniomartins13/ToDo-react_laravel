import axios from 'axios';
import './App.css';
import Rotas from './routes/routes';


axios.interceptors.request.use(function(config){
  const token = localStorage.getItem("authToken");
  if(token){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function (error){
  return Promise.reject(error);
})

function App() {
  return (
    <div className="App">
      <Rotas/>
    </div>
  );
}

export default App;
