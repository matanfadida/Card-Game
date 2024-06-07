import Game from './components/Game/Game'

const DUMMY_DYTAILS = {
  Bear:"Bear-value",
  Camel:"Camel-value",
  // Donkey:"Donkey-value",
  // Rabbit:"Rabbit-value",
  // Zebra:"Zebra-value",
  // Dog:"Dog-value",
  // Deer:"Deer-value",
  // Fox:"Fox-value",
}
function App() {
  return (
    <Game animals={DUMMY_DYTAILS}/>
  );
}

export default App;
