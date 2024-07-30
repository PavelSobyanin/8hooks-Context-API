import './App.css';
import List from './components/TaskOne/List/List';
import JsonFetch from './components/TaskTwo/JsonFetch/JsonFetch';


function App() {

  return (
    <>
      <h1>Задача 1!</h1>
        <List />
      <h1>Задача 2!</h1>
        <JsonFetch />
    </>
  )
}

export default App
