import './App.css';
import {useState} from 'react';
import axios from 'axios';
function App() {
  const [user, setUser] = useState({})
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [secret, setSecret] = useState('')
  const baseURL = 'https://test-bwau.onrender.com'
  axios.defaults.withCredentials = true
  const handleSubmit = async (e) =>{
    e.preventDefault()
    try{
      const res = await axios.post(baseURL + '/login', {name, password})
      console.log(res)
      const {accessToken} = res.data
      setUser({accessToken: accessToken})
    }catch(err){
      setUser({})
      console.log(err)
    }
  }
  const getSecret = async () =>{
    try{
      const res = await axios.get(baseURL + '/secret', {headers: {
        Authorization: `Bearer ${user.accessToken}`
      }})
      console.log(res)
      const {msg} = res.data
      setSecret(msg)
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className="App">
      {user.accessToken ? 
    <div>
      <h1>U logged in</h1>
      <h3>{secret}</h3>
      <button onClick={getSecret}>get secret</button>
    </div>
    :
    <div>
      <form onSubmit={handleSubmit}>
        <input
        placeholder='name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
        <input
        placeholder='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <button>Log in</button>
      </form>
    </div>  
    }
    </div>
  );
}

export default App;
