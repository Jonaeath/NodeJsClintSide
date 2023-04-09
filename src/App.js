import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUser] = useState();

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);


const handelfrom = event =>{
     event.preventDefault(); 
     const name = event.target.name.value;
     const email = event.target.email.value;
     const user = {name,email};
     console.log(user); 

     fetch('http://localhost:5000/users', {
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify(user)
     })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const newUser = [...users, data];
            setUser(newUser);
      })
      .catch(error =>console.error(error))


       event.target.reset(user); 
};

  return (
    <div className="App">
      <h1>User:{users?.length}</h1>
      <form onSubmit={handelfrom}>
        <label >First name:</label>
        <br />
        <input type="text"  name="name" placeholder="name" />
        <br />
        <label >Email:</label>
        <br />
        <input type="email"  name="email" placeholder="email"/>
        <button>Add User</button>
      </form>
      <div>
        {users?.map(user => (
          <h1 key={user}>
            {user?.email} {user?.name}
          </h1>
        ))}
      </div>
    </div>
  );
}

export default App;
