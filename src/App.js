import { Route } from 'react-router-dom';
import './App.css';
import BoardList from "./board/BoardList";
import BoardDetail from "./board/BoardDetail";
import BoardWrite from './board/BoardWrite';

function App() {
  return (
    <>
      <Route path="/" component={BoardList} exact={true} />
      <Route path="/board" component={BoardList} exact={true} />
      <Route path="/board/write" component={BoardWrite} />
      <Route path="/board/detail/:boardIdx" component={BoardDetail} />
    </>
  );
}

export default App;
