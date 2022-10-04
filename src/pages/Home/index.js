import React from 'react';
import {useState} from 'react';
import { Header } from '../../components/Header';
import background from '../../assets/background.png';
import perfil from '../../assets/perfil.jpg';
import ItemList from '../../components/ItemList';

import './styles.css';

function App() {
  const [user, setUser] =useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [repos, setRepos] = useState({});

  const handleGetData = async () => {

    const userData = await fetch(`https://api.github.com/users/${user}`);
    const meuUser = await userData.json();

    if(meuUser.name != null){
      const {avatar_url, name, bio, login} = meuUser;

        setCurrentUser({avatar_url, name, bio, login});
      const reposData = await fetch(`https://api.github.com/users/${user}`);
      const newRepos = await reposData.json();
      
      if(newRepos.length){
        setRepos({newRepos});
      }
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <img src={background} className="background" alt="background app" />
        <div className='info'>
          <div>
            <input 
            name="usuario" 
            value={user} 
            onChange = {event => setUser(event.target.value)} 
            placeholder='@username' 
            />
            <button onClick={handleGetData}>Buscar</button>
          </div>
          {currentUser?.name ? (<>
          <div className="perfil">
            <img 
              src={currentUser.avatar_url} 
              className="profile" 
              alt="imagem de perfil" 
            />
            <div>
              <h3>{currentUser.name}</h3>
              <span>@{currentUser.login}</span>
              <p>{currentUser.bio}</p>
            </div>            
          </div>
          <hr />
          </>
            ): null}
          {repos ? (
          <div>
            <h4 className="repositorio">Repositórios</h4>
            <ItemList title="Teste1" description="teste de descrição" />
            <ItemList title="Teste2" description="teste de descrição" />
            <ItemList title="Teste3" description="teste de descrição" />
          </div>
          ): null}
        </div>
      </div>
    </div>
  );
}

export default App;
