import { useState, useEffect } from 'react';
import './assets/skin/default_skin/css/theme.min.css';
import BaseAlert from './ui/components/Alert/BaseAlert';
import BasePanel from './ui/components/Panel/BasePanel';
import BasePanelLoading from './ui/components/Panel/BasePanelLoading';
import TestButtonSuccess from './ui/components/Buttons/TestButtonSuccess';
import TestButtonError from './ui/components/Buttons/TestButtonError';
import TestHideButton from './ui/components/Buttons/TestHideButton';
import jsonData from './mock/data.json'; //only for dev purpose, replace with your actual API response
import { parseDataForEagletable, getRqSortData } from './utility/eagletableTypeUtils';
import { fetchStep07 } from './features/dataFetcher';
import { Drawer } from './ui/components/Drawer/drawer';
import TestDrawerButton from './ui/components/Buttons/TestDrawerButton';



function App(this: any) {
  // Loading state
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertClassName, setAlertClassName] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerOperation, setDrawerOperation] = useState('');
  const [drawerKeyIdentifier, setDrawerKeyIdentifier] = useState('');


  //in drawer panel state
  const [showAlertDrawer, setShowAlertDrawer] = useState(false);
  const [alertMessageDrawer, setAlertMessageDrawer] = useState('');
  const [alertClassNameDrawer, setAlertClassNameDrawer] = useState('');

  // Data state
  const [data, setData] = useState({});

  // Error state
  const [error, setError] = useState(null);

  const [eagletableData, setEagletableData] = useState({});

  const testMessage = 'This is a test message';
  const testClassName = 'alet alert-danger';

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading to true before fetching data

      try {
        const dataFetched = await fetchStep07();

        if (dataFetched && dataFetched.status === 'success') {

          console.log('dataFetched', dataFetched);

          console.log('dataFetched.data', dataFetched.data);

          console.log('dataFetchedstatus', dataFetched.data.status);

          setData(dataFetched);
          showAlertSuccess(dataFetched.message);
          // Process your data and handle success case
        } else {
          // Handle the error or unsuccessful case
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle any errors here
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();
  }, []);

  // functions to handle the alert
  //show alert success . receive a message, the class name is set in function by default 
  const showAlertSuccess = (successMessage: string) => {
    let className = 'alert alert-success';
    let message = successMessage;
    let visible = true;

    setShowAlert(true);

    BaseAlert({ message: testMessage, className, visible });


  };

  const showAlertError = (errorMessage: string) => {
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

    toggleAlertVisible(testMessage, className, visible);

  };


  const clickhide = () => {
    let testMessage = '';
    let className = '';
    let visible = false;

    toggleAlertVisible(testMessage, className, visible);

  };


  const showError = (errorMessage: string) => {
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
  const showSuccess = (successMessage: string) => {
    let className = 'alert alert-success';
    let message = successMessage;
    let visible = true;

    setShowAlert(visible);

    BaseAlert({ message: message, className, visible });
  };
  const toggleAlertVisible = (alertMessage: string, className: string, visible: boolean) => {
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




  //-------------------------//
  // drawer logic
  //-------------------------//

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);

  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setDrawerOperationValue('', '');

  };

  const openDrawer = (operation: string, keyIdentifer: string) => {
    setIsDrawerOpen(true);
    setDrawerOperationValue(operation, keyIdentifer);
  };

  const setDrawerOperationValue = (operation: string, keyIdentifer: string) => {
    setDrawerOperation(operation);
    setDrawerKeyIdentifier(keyIdentifer);
  };




  const handleClick = () => {
    if (isDrawerOpen) {
      closeDrawer();
    } else {
      openDrawer(
        'test',
        'test'
      );
    }
  };



  const showAlertSuccessDrawer = (successMessage: string) => {
    let className = 'alert alert-success';
    let message = successMessage;
    let visible = true;


    setAlertClassNameDrawer(className);
    setAlertMessageDrawer(message);
    setShowAlertDrawer(visible);
  };
  const showAlertErrorDrawer = (errorMessage: string) => {

    console.log(' show alert error ');
    console.log(errorMessage);
    console.log(' show alert error ');

    let className = 'alert alert-danger';
    let message = errorMessage;
    let visible = true;
    setAlertClassNameDrawer(className);
    setAlertMessageDrawer(message);
    setShowAlertDrawer(visible);

  };



  //convert json to array



  return (

    <div className="App">
      {isLoading ? (
        <BasePanelLoading />
      ) : error ? (
        <BaseAlert message={error} className="alert alert-danger" visible={true} />
      ) :
        (
          <>
            <BaseAlert message={alertMessage} className={alertClassName} visible={showAlert} />
            <Drawer
              closeDrawer={closeDrawer}
              openDrawer={openDrawer}
              drawerOpen={isDrawerOpen}
              isOpen={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
              operation={drawerOperation}
              keyIdentifier={drawerKeyIdentifier}
              alertClassNameDrawer={alertClassNameDrawer}
              alertMessageDrawer={alertMessageDrawer}
              showAlertDrawer={showAlertDrawer}
              showAlertSuccessDrawer={showAlertSuccessDrawer}
              showAlertErrorDrawer={showAlertErrorDrawer}

            >
              <p>Drawer</p>
            </Drawer>
            <h1>Step Seven</h1>
            <BasePanel title={data.data.title}
              data={data}
              showAlertError={showAlertError}
              showAlertSuccess={showAlertSuccess}
              openDrawer={openDrawer}
              isDrawerOpen={isDrawerOpen}
            />
            <TestButtonSuccess onClick={clicksuccess} />
            <TestButtonError onClick={clickerror} />
            <TestHideButton onClick={clickhide} />
            <TestDrawerButton closeDrawer={closeDrawer} openDrawer={openDrawer} drawerOpen={isDrawerOpen} />


          </>
        )}
    </div>

  );
}

export default App;