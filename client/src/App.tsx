import TaskManager from './components/TaskManager';

function App() {
  return (
    <div className="App">
      <div className="bg-gray-100 p-4 mb-4">
        <h1 className="text-2xl font-bold text-center">Welcome to Task Manager App</h1>
      </div>
      <TaskManager />
    </div>
  );
}

export default App;
