import { useState } from 'react';
import './assets/skin/default_skin/css/theme.min.css';
import BasePanel from './ui/components/Panel/BasePanel';
import BaseAlert from './ui/components/Alert/BaseAlert';

function App() {

  //Loading state
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  //data
  const [data, setData] = useState({});

  const testMessage = 'This is a test message';
  const testClassName = 'alert alert-danger';

  return (
    <div className="App">
      <BaseAlert message={testMessage} className={testClassName} />
      <h1>Step Seven</h1>
      <BasePanel/>
    </div>
  );
}

export default App;
