import Game from './components/Game/Game'

const DUMMY_DYTAILS = {
  Bear:"Bear",
  Camel:"Camel",
  Donkey:"Donkey",
  Rabbit:"Rabbit",
  Zebra:"Zebra",
  Dog:"Dog",
  Deer:"Deer",
  Fox:"Fox",
}
function App() {
  return (
    <Game animals={DUMMY_DYTAILS}/>
  );
}

export default App;
