import React,{useEffect,useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";



function App() {
 
  const[posts,setPosts] = useState([]);
  useEffect(() => {
   
    const getPosts = () => {
      axios
        .get('http://localhost:9090/api/posts')
        .then(response => {
          setPosts(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.log('Server Error', error);
        });
    }    
    getPosts();
  },[]);

  return (
    <div className="App">
      <header className="App-header">
      <h2>Client App For Posts</h2>
        <table>
          <tr>
            <th>Post ID</th>
            <th>Title</th>
            <th>Create Date</th>
            <th>Update Date</th>            
          </tr> 
          {posts.map(post => (  
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.created_at}</td>
              <td>{post.updated_at}</td>                  
            </tr>
          ))}
        </table>    
    
      </header>
    </div>
  );
}

export default App;
