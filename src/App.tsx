import { useState,useEffect } from 'react';
import './assets/skin/default_skin/css/theme.min.css';
import BaseAlert from './ui/components/Alert/BaseAlert';
import BasePanel from './ui/components/Panel/BasePanel';
import BasePanelLoading from './ui/components/Panel/BasePanelLoading';
import TestButtonSuccess from './ui/components/Buttons/TestButtonSuccess';
import TestButtonError from './ui/components/Buttons/TestButtonError';
import TestHideButton from './ui/components/Buttons/TestHideButton';




function App() {
  // Loading state
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertClassName, setAlertClassName] = useState('');

  // Data state
  const [data, setData] = useState({});

  // Error state
  const [error, setError] = useState(null);

  const testMessage = 'This is a test message';
  const testClassName = 'alet alert-danger';

  useEffect(() => {
    // Simulate an API request with a delay
    setTimeout(() => {
      // Replace this with your actual API fetch logic
      // For now, we're just simulating a successful fetch
      const fakeData = { message: 'Data from API' };
      setData(fakeData);
      setIsLoading(false); // Set loading to false once data is fetched
    }, 2000); // Simulated 2-second delay
  }, []);


  // functions to handle the alert
  //show alert success . receive a message, the class name is set in function by default 
  const showAlertSuccess = (successMessage:string) => {
    let className = 'alert alert-success';
    let message = successMessage;
    let visible = true;

    setShowAlert(true);

    BaseAlert({ message: testMessage, className, visible });

    
};

const showAlertError = (errorMessage:string) => {
    let className = 'alert alert-danger';
    let message = errorMessage;
  let visible = true;

    setShowAlert(true);

  BaseAlert({ message: testMessage, className, visible });
};


//for ui testing purpose
const clicksuccess = () => {
  let testMessage = 'test success message';
  let className = 'alert alert-success';
  let visible = true;


  toggleAlertVisible(testMessage, className, visible);
};

  const clickerror = () => {
    let testMessage = 'test error message';
    let className = 'alert alert-danger';
    let visible = true;

    toggleAlertVisible(testMessage,className,visible);

};


  const clickhide = () => {
    let testMessage = '';
    let className = '';
    let visible = false;

    toggleAlertVisible(testMessage, className, visible);

  };


const showError = (errorMessage:string) => {
    let className = 'alert alert-danger';
    let message = errorMessage;
    let visible = true;

    setShowAlert(true);

  BaseAlert({ message: message, className, visible });
};

/**
 * This function shows a success alert
 * @param successMessage 
 */
const showSuccess = (successMessage:string) => {
  let className = 'alert alert-success';
  let message = successMessage;
  let visible = true;

  setShowAlert(visible);

  BaseAlert({ message: message, className, visible });
};
const toggleAlertVisible = (alertMessage:string,className:string,visible:boolean) => {
    setShowAlert(visible);
    setAlertMessage(alertMessage);
    setAlertClassName(className);
};


  const jsonToArray = (json: any) => {
    let result = [];
    for (let key in json) {
      result.push([key, json[key]]);
    }
    return result;
  };

  //convert json to object
  const jsonToObject = (json: string) => {
    let result = {};
    for (let key in json) {
      result[key] = json[key];
    }
    return result;
  };

















  //convert json to array



  return (
    <div className="App">
      {isLoading ? (
        <BasePanelLoading />
      ) : error ? (
        <BaseAlert message={error} className="alert alert-danger" visible={true}/>
      ) : 
      (
        <>
          <BaseAlert message={alertMessage} className={alertClassName} visible={showAlert} />

          <h1>Step Seven</h1>
          <BasePanel title="Step Seven" data={JSON.parse(JSON.stringify(data)).message} />
              <TestButtonSuccess onClick={clicksuccess} />
              <TestButtonError onClick={clickerror} />
              <TestHideButton onClick={clickhide} />

        </>
      )}
    </div>
  );
}

export default App;