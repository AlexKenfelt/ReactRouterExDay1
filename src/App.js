import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch, 
  NavLink,
  Prompt
} from "react-router-dom";
import { useState } from 'react';

function App(props) {
  return (
    <div>
  <Header />
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route exact path="/products">
      <Products bookFacade={props.bookFacade}/>
    </Route>
    <Route path="/products/:id">
      <Details bookFacade={props.bookFacade}/>
    </Route>
    <Route path="/company">
      <Company />
    </Route>
    <Route path="/add-book">
      <AddBook bookFacade={props.bookFacade}/>
    </Route>
    <Route>
      <NoMacth/>
    </Route>
  </Switch>
</div>

  );
}

function Header() {
  return ( 
   <div>
      <ul className="header">
  <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
  <li><NavLink activeClassName="active" to="/products">Products</NavLink></li>
  <li><NavLink activeClassName="active" to="/add-book">Add Book</NavLink></li>
  <li><NavLink activeClassName="active" to="/company">Company</NavLink></li>
</ul>

    </div>
   );
}
function Home() {
  return ( 
   <div>
      <h2>Home</h2>
    </div>
   );
}
function Products(props) {
  let books = props.bookFacade.getBooks()
  return ( 
   <div>
      <h3>We've {books.length} number of books</h3>
      <ul>{books.map((book => <li key={book.id}> {book.title} <NavLink to={`products/${book.id}`}><button id={book.id}>details</button></NavLink> </li> ))}</ul>
    </div>
   );
}
function Company() {
  return ( 
   <div>
      <h4>Company</h4>
    </div>
   );
}

function NoMacth() {
  return ( 
   <div>
      <h5>nomacth</h5>
    </div>
   );
}

function AddBook(props) {

  const [title, setTitle] = useState("")
  const [info, setInfo] = useState("")

  const newBook = {title: title, info: info}

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(newBook)
    props.bookFacade.addBook(newBook)
  }

  const onChangeHandler = (event) => {
    console.log(event.target.value);
    setTitle(event.target.value)
  }
  
  let [isBlocking, setIsBlocking] = useState(false);
  return ( 
   <div>
     <form onSubmit={handleSubmit} onSubmit={event =>{
      event.preventDefault();
      event.target.reset();
      setIsBlocking(false);
    }}>
     <Prompt
        when={isBlocking}
        message={location =>
          `Are you sure you want to go to ${location.pathname}`
        }
      />
     <input type="text" value={title} onChange={onChangeHandler} onChange={(event) => setIsBlocking(event.target.value.length > 0)}/>
     <input type="text" value={info} onChange={onChangeHandler} onChange={(event) => setIsBlocking(event.target.value.length > 0)}/>
     <input type="submit"/>
      <h6>Add Book</h6>
      </form>
    </div>
   );
 
}

function Details (props){

  const obj = useParams()
  const id = parseInt(obj.id)
  const books = props.bookFacade.getBooks()
  const book = books.find(b => b.id === parseInt(id))
  console.log(book)


  return (
    <div>
      <li key={book.id}> Book title: {book.title} </li>
      <li key={book.id}> Book Id:{book.id} </li>
      <li key={book.id}> Book details: {book.info} </li>
    </div>
  );


}


    


export default App;
