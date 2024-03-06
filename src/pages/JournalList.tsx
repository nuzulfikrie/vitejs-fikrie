import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { PrimeReactProvider } from 'primereact/api';
import { Card } from 'primereact/card';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';

import URL_LINKS from '../constants/urls';
import { fetchData, postData, deleteData } from '../services/dataService'; // Assume this is a new service file for API calls

const JournalList = () => {
  const projectId = localStorage.getItem('course_id');
  const userId = localStorage.getItem('user_id');

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [enableCheckBox, setEnableCheckBox] = useState(false);
  const [dataTable, setDataTable] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const [selectedRows, setSelectedRows] = useState([]);
  const [subthemeOptions, setSubthemeOptions] = useState([]); // [Subtheme selection options]

  const toast = useRef<Toast>(null);

  useEffect(() => {
    fetchDataSource();
  }, []);

  const fetchDataSource = async () => {
    setLoading(true);
    try {
      if (!projectId || !userId) {
        showError('Project ID or User ID is missing');
      }

      const linkFetch1 =
        URL_LINKS.STEP_SIX_DATA.value + projectId + '/' + userId;

      const linkFetch2 =
        URL_LINKS.FETCH_ALL_JOURNAL.value + projectId + '/' + userId;

      const dataResponse = await fetchData(linkFetch1);
      console.log('--- data  ---');
      console.log(dataResponse);
      setData(dataResponse);
      console.log('--- data  ---');
      console.log(dataResponse);

      setSubthemeOptions(dataResponse.data.subthemes);

      const dataTableResponse = await fetchData(linkFetch2);
      console.log('--- data response 2 ---');
      console.log(dataTableResponse.data.data);
      console.log('--- data response 2 ---');

      setDataTable(dataTableResponse.data.data);
    } catch (error: any) {
      console.log('Error:', error.message);
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEnableCheckBox = (enable: boolean) => {
    setEnableCheckBox(enable);
    if (!enable) {
      setSelectedRows([]); // Clear the selected rows when disabling checkbox
    }
  };

  const handleRefresh = () => {
    fetchDataSource();
  };

  const handleAddNewJournal = () => {
    setShowAddModal(true);
  };

  const handleModalClose = () => {
    setShowAddModal(false);
  };

  const showSuccess = (message: string) => {
    toast.current?.show({
      severity: 'success',
      summary: 'Success',
      detail: message,
      life: 3000,
    });
  };

  const showInfo = (message: string) => {
    toast.current?.show({
      severity: 'info',
      summary: 'Info',
      detail: message,
      life: 3000,
    });
  };

  const showWarn = (message: string) => {
    (toast.current as Toast)?.show({
      severity: 'warn',
      summary: 'Warning',
      detail: message,
      life: 3000,
    });
  };

  const showError = (message: string) => {
    toast.current?.show({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: 3000,
    });
  };

  {
    /* modal */
  }

  const handleAddModalVisible = (visible: boolean): void => {
    setShowAddModal(visible);
  };

  {
    /* modal */
  }

  {
    /*
  -- Journal handling methods --
  */
  }
  const onSaveAddJournal = async (journalData: any) => {
    console.log('--- on save add journal --');
  };

  const deleteMultipleJournalsClick = async () => {
    const selections = selectedRows.map((row: any) => row.id);

    if (selections.length === 0) {
      showWarn('Please select at least one journal to delete');
      return;
    }
  };

  {
    /*
  -- Journal handling methods --
  */
  }

  return (
    <>
      <PrimeReactProvider>
        <div>
          <Card>
            <div className='p-d-flex p-jc-between p-ai-center'>
              <Button
                icon='fa fa-refresh'
                label='Refresh'
                onClick={handleRefresh}
                disabled={loading}
                style={{ color: 'white' }}
              />
              <Button
                icon='fa fa-plus'
                label='Add New Journal'
                severity='success'
                onClick={handleAddNewJournal}
              />
              {/* Enable checkbox for multiple selection */}
              {enableCheckBox ? (
                <Button
                  label='Disable Checkbox'
                  severity='warning'
                  onClick={() => handleEnableCheckBox(false)}
                />
              ) : (
                <Button
                  label='Enable Checkbox'
                  severity='info'
                  onClick={() => handleEnableCheckBox(true)}
                />
              )}
              {enableCheckBox && selectedRows.length > 0 ? (
                <Button
                  icon='fa fa-trash'
                  label='Delete Multiple Journals'
                  severity='danger'
                  onClick={() => deleteMultipleJournalsClick()}
                />
              ) : (
                <Button
                  icon='fa fa-trash'
                  label='Delete Multiple Journals'
                  severity='danger'
                  onClick={() => deleteMultipleJournalsClick()}
                  disabled
                />
              )}
            </div>
            {loading ? (
              <div className='card'>
                <ProgressSpinner
                  style={{ width: '50px', height: '50px' }}
                  strokeWidth='8'
                  fill='var(--surface-ground)'
                  animationDuration='.5s'
                />
              </div>
            ) : (
              <div className='card'>
                <DataTable
                  value={dataTable}
                  loading={loading}
                  paginator
                  rows={5}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  selection={selectedRows}
                  onSelectionChange={(e) => setSelectedRows(e.value)}
                  tableStyle={{ minWidth: '50rem' }}
                >
                  {/* Define columns and data */}
                  {/* column, select,id, author,titile, journal name, year, volumn, issue, page, doi, created on ,action  */}
                  {
                    // Enable checkbox for multiple selection
                    enableCheckBox && (
                      <Column
                        selectionMode='multiple'
                        headerStyle={{ width: '3rem' }}
                      />
                    )
                  }
                  <Column field='id' header='ID' />
                  <Column field='author' header='Author' />
                  <Column
                    field='article_title'
                    header='Title'
                    body={(rowData: any) => {
                      //dangerously set inner html
                      return (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: rowData.article_title,
                          }}
                        />
                      );
                    }}
                  />
                  <Column field='journal_name' header='Journal Name' />
                  <Column
                    field='year'
                    header='Year'
                    body={(rowData: any) => {
                      //dangerously set inner html
                      return (
                        <div
                          dangerouslySetInnerHTML={{ __html: rowData.year }}
                        />
                      );
                    }}
                  />
                  <Column
                    field='volume'
                    header='Volume'
                    body={(rowData: any) => {
                      //dangerously set inner html
                      return (
                        <div
                          dangerouslySetInnerHTML={{ __html: rowData.volume }}
                        />
                      );
                    }}
                  />
                  <Column
                    field='issue'
                    header='Issue'
                    body={(rowData: any) => {
                      //dangerously set inner html
                      return (
                        <div
                          dangerouslySetInnerHTML={{ __html: rowData.issue }}
                        />
                      );
                    }}
                  />
                  <Column
                    field='page'
                    header='Page'
                    body={(rowData: any) => {
                      //dangerously set inner html
                      return (
                        <div
                          dangerouslySetInnerHTML={{ __html: rowData.page }}
                        />
                      );
                    }}
                  />
                  <Column
                    field='doi'
                    header='DOI'
                    body={(rowData: any) => {
                      //dangerously set inner html
                      return (
                        <div
                          dangerouslySetInnerHTML={{ __html: rowData.doi }}
                        />
                      );
                    }}
                  />
                  <Column field='created' header='Created On' />
                  <Column
                    body={(rowData: any) => {
                      return (
                        <div>
                          <>
                            <Link to={`/stepsix/editJournal/${rowData.id}`}>
                              <Button
                                label='Edit'
                                className='p-button-sm p-button-info'
                                style={{ color: 'white' }}
                              />
                            </Link>
                          </>
                          {enableCheckBox && (
                            <>
                              <Button
                                label='Delete'
                                className='p-button-sm p-button-danger'
                                onClick={() => {
                                  showWarn('Delete journal');
                                }}
                              />
                            </>
                          )}
                        </div>
                      );
                    }}
                  />
                </DataTable>
              </div>
            )}
          </Card>

          <Toast ref={toast} />
        </div>
      </PrimeReactProvider>
    </>
  );
};

export default JournalList;
