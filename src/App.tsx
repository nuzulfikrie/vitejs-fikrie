import { useState } from 'react';
import './assets/skin/default_skin/css/theme.min.css';
import PlanForm from './forms/PlanForm';

function App() {

  return (
    <div className="App">
      <h1>Create New Plan</h1>
      <PlanForm />
    </div>
  );
}

export default App;
