import MonitorEventDisplay from "./components/moniter";
import './App.css'; // You can create this CSS file to style your app if needed

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>DataDog Dashboard</h1>
      </header>
      <main>
      <MonitorEventDisplay />
      </main>
      <footer>
      <p>&copy; 2024 My DataDog Dashboard. All rights reserved. Create By Balaji</p>

      </footer>
    </div>
  );
}

export default App;








