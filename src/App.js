
import "./App.css";
import Weather from "./components/Weather";

function App() {
  return (
    <div className="app">
      <h1>Weather Report</h1>
      <p>Search for the weather in your city</p>

      <Weather />
    </div>
  );
}

export default App;