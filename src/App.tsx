import React, { useState, useEffect, useRef } from 'react';
import {
  Card,
  DataTable,
  Button,
  Dialog,
  ProgressSpinner,
  Toast,
} from 'primereact';
import URL_LINKS from './constants/urls';
import { fetchDataService } from './services/dataService'; // Assume this is a new service file for API calls

const App = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const projectId = localStorage.getItem('course_id');
      const userId = localStorage.getItem('user_id');

      const dataResponse = await fetchDataService(
        URL_LINKS.STEP_SIX_DATA.value,
        projectId,
        userId,
      );
      setData(dataResponse);

      const dataTableResponse = await fetchDataService(
        URL_LINKS.FETCH_ALL_JOURNAL.value,
        projectId,
        userId,
      );
      setDataTable(dataTableResponse);
    } catch (error: any) {
      showToast('warn', 'Data Fetch Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchData();
  };

  const handleAddNewJournal = () => {
    setShowAddModal(true);
  };

  const handleModalClose = () => {
    setShowAddModal(false);
  };

  const showToast = (severity: string, summary: string, detail: any) => {
    if (toast.current) {
      toast.current.show({ severity, summary, detail });
    }
  };

  return (
    <div>
      <Card>
        <div className='p-d-flex p-jc-between p-ai-center'>
          <Button label='Refresh' onClick={handleRefresh} disabled={loading} />
          <Button label='Add New Journal' onClick={handleAddNewJournal} />
        </div>
        {loading ? (
          <div className='p-d-flex p-jc-center'>
            <ProgressSpinner />
          </div>
        ) : (
          <DataTable value={dataTable}>
            {/* Define columns and data */}
          </DataTable>
        )}
      </Card>
      <Dialog visible={showAddModal} onHide={handleModalClose}>
        {/* Modal content */}
      </Dialog>
      <Toast ref={toast} />
    </div>
  );
};

export default App;
