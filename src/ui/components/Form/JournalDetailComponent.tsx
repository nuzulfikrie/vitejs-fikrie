import React, { useEffect, useRef, useState } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { CheckboxChangeEvent } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';
import { InputTextarea } from 'primereact/inputtextarea';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { Skeleton } from 'primereact/skeleton';
import JournalDetailCheckboxesComponent from './JournalDetailCheckboxesComponent';
import { DropdownChangeEvent } from 'primereact/dropdown';
import VideoModal from '../Modal/VideoModal';
import PanelAbstractData from '../Panel/PanelAbstractData';
import axios from 'axios';
import URL_LINKS from '../../../constants/urls';
import ContentDataTable from '../Modal/ContentDataTable';
import PanelA from '../Modal/PanelA';
interface Subtheme {
  name: string;
  key: string;
}

interface JournalDetailsComponentProps {
  userId: string;
  formik: any;
  getFormErrorMessage: (name: any) => JSX.Element | null;
  isFormFieldInvalid: (name: any) => boolean;
  authorPodColor: string;
  articleSupportStudyColor: string;
  articleDoesNotSupportStudyColor: string;
  neededSupportStudyColor: string;
  subthemeSelections: [];
  selected: any[];
  showWarn: (message: string) => void;
  setVisible: (visible: boolean) => void;
  setLoading: (loading: boolean) => void;
  resetAllDataInFields: () => void;
  resetAllDataInFieldsToInitial: () => void;
  retrieveVideo: (key: string, userId: string) => any;
  videoData: any;
  panelAbstractData: string;
  panelVisible: boolean;
  panelAbstractLoading: boolean;
  retrieveAbstract: (doi: string, provider: string) => void;
  journalMetadata: any;
  setJournalMetadata: (journalMetadata: any) => void;
  isConfirmDialogVisible: boolean;
  setIsConfirmDialogVisible: (isConfirmDialogVisible: boolean) => void;
  setChooseMetadata: (chooseMetadata: boolean) => void;
  insertTemplate: () => void;
  panelBVisible: boolean;
  panelBLoading: boolean;
  panelAVisible: boolean;
  panelALoading: boolean;
  setPanelALoading: (panelALoading: boolean) => void;
  ProcessUseMetadata: (doi: string) => void;
}

const JournalDetailComponent: React.FC<JournalDetailsComponentProps> = ({
  userId,
  formik,
  getFormErrorMessage,
  isFormFieldInvalid,
  authorPodColor,
  articleSupportStudyColor,
  articleDoesNotSupportStudyColor,
  neededSupportStudyColor,
  subthemeSelections,
  selected,
  showWarn,
  setVisible,
  setLoading,
  resetAllDataInFields,
  resetAllDataInFieldsToInitial,
  retrieveVideo,
  videoData,
  panelAbstractData,
  panelVisible,
  panelAbstractLoading,
  retrieveAbstract,
  journalMetadata,
  setJournalMetadata,
  isConfirmDialogVisible,
  setIsConfirmDialogVisible,
  setChooseMetadata,
  insertTemplate,
  panelBVisible,
  panelBLoading,
  panelAVisible,
  panelALoading,
  setPanelALoading,
  ProcessUseMetadata,
}): JSX.Element => {
  interface Subtheme {
    name: string;
    key: string;
    construct: string;
  }

  interface Provider {
    name: string;
    code: string;
  }

  const providerSelection: Provider[] = [
    { name: 'IEEE', code: 'ieee' },
    { name: 'Springer', code: 'springer' },
    { name: 'Elsevier', code: 'elsevier' },
    { name: 'Pubmed', code: 'pubmed' },
    { name: 'Reset', code: 'reset' },
  ];

  const [loadingMetadata, setLoadingMetadata] = useState<boolean>(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null,
  );
  const [modalVideoVisible, setModalVideoVisible] = useState(false);
  const [selectedSubthemes, setSelectedSubthemes] = useState<Subtheme[]>([]);
  const [buttonloading] = useState<boolean>(false);

  const onCategoryChange = (e: CheckboxChangeEvent) => {
    console.log('--- checkboxchangeevent');

    console.log(e);

    let _selectedSubthemes = [...selectedSubthemes];

    if (e.checked) _selectedSubthemes.push(e.value);
    else
      _selectedSubthemes = _selectedSubthemes.filter(
        (subtheme) => subtheme.key !== e.value.key,
      );
    console.log('--- _selectedSubthemes');

    console.log(_selectedSubthemes);
    console.log('--- _selectedSubthemes');

    setSelectedSubthemes(_selectedSubthemes);
  };
  // Function to organize subthemes by construct
  const groupByConstruct = (subthemes: any[]) => {
    return subthemes.reduce((acc, subtheme) => {
      const construct = subtheme.construct;
      if (!acc[construct]) {
        acc[construct] = [];
      }
      acc[construct].push(subtheme);
      return acc;
    }, {});
  };

  const confirmTemplate = () => {
    confirmDialog({
      message: 'Are you sure you want to proceed use template?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'accept',
      accept: insertTemplate,
      reject: reject,
    });
  };

  useEffect(() => {
    const initialSelectedSubthemes = subthemeSelections.filter((_, index) =>
      selected.includes(index),
    );

    console.log('-- initialSelectedSubthemes --');
    console.log(initialSelectedSubthemes);
    console.log('-- initialSelectedSubthemes --');
    setSelectedSubthemes(initialSelectedSubthemes);
  }, [selected, subthemeSelections]);

  const toast = useRef(null);
  const callVideo = (e: any) => {
    // code logic here
    e.preventDefault();
    console.log('callVideo', userId);

    retrieveVideo('step06', userId);
    setModalVideoVisible(true);
  };
  const retrieveAbstractData = () => {
    // code logic here
    //read doi and selected provider

    setLoadingMetadata(true);

    console.log('--- retrieveMetadata ---');
    let doi = formik.values.doi;
    let providerSelected = selectedProvider ? selectedProvider.code : null;

    if (!doi) {
      showWarn('DOI is required');
    }

    if (!providerSelected) {
      showWarn('Provider is required');
    }

    retrieveAbstract(doi || '', providerSelected || '');

    setTimeout(() => {
      setLoadingMetadata(false);
    }, 2000);
  };

  const handleDropDown = (e: DropdownChangeEvent) => {
    console.log('--- value ---');
    console.log(e.value);
    console.log('--- value ---');
    if (e.value.code === 'reset') {
      setSelectedProvider(null);
    } else {
      setSelectedProvider(e.value);
    }
  };

  const retrieve = () => {
    console.log('--retrieve--');
  };

  const resetModalForm = () => {
    // code logic here
    // reset form
    formik.resetForm();
  };

  const onCancel = () => {
    // code logic here
    // reset form
    formik.resetForm();
    // close modal
    setVisible(false);
  };

  const confirmDialogMetadata = () => {
    let doi = formik.values.doi;

    if (!doi) {
      showWarn('DOI is required');
      return;
    }

    // Retrieve metadata
    const url = `${URL_LINKS.FETCH_METADATA.value}`;
    axios
      .post(url, { doi: doi })
      .then((response) => {
        if (response.data.status === 'success') {
          // Ensure the data structure of response is as expected
          let data = response.data.data;

          // Instead of calling confirmDialog directly, set state here
          setJournalMetadata(data);
          setIsConfirmDialogVisible(true); // This state will be used to control the visibility of the dialog
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        showWarn('Error fetching metadata');
      });
  };

  const clearform = () => {
    // code logic here
    // will clear the form content
    //set formik values to empty
    setLoading(true);
    resetAllDataInFields();
  };

  const reject = () => {
    showWarn('You have rejected');
  };
  const confirmClearForm = () => {
    confirmDialog({
      message: 'Are you sure you want to proceed clear form?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: clearform,
      reject: reject,
    });
  };

  return (
    <>
      <ConfirmDialog />
      {isConfirmDialogVisible && (
        <ConfirmDialog
          visible={isConfirmDialogVisible}
          onHide={() => setIsConfirmDialogVisible(false)}
          content={
            journalMetadata && (
              <ContentDataTable
                doi={formik.values.doi}
                journalMetadata={journalMetadata}
                setChooseMetadata={setChooseMetadata}
                setIsConfirmDialogVisible={setIsConfirmDialogVisible}
                panelALoading={panelALoading}
                setPanelALoading={setPanelALoading}
                ProcessUseMetadata={ProcessUseMetadata}
              />
            )
          }
        />
      )}
      <form onSubmit={formik.handleSubmit} className='flex flex-column gap-2'>
        <Toast ref={toast} />
        <VideoModal
          videoData={videoData}
          modalVideoVisible={modalVideoVisible}
          setModalVideoVisible={setModalVideoVisible}
        />
        {/* Repeat the following pattern for each field */}

        {/*
        panel A start
        */}
        <PanelA
          formik={formik}
          loadingMetadata={loadingMetadata}
          retrieveAbstractData={retrieveAbstractData}
          selectedProvider={selectedProvider}
          providerSelection={providerSelection}
          confirmDialogMetadata={confirmDialogMetadata}
          panelALoading={panelALoading}
          panelAVisible={panelAVisible}
          getFormErrorMessage={getFormErrorMessage}
          isFormFieldInvalid={isFormFieldInvalid}
          callVideo={callVideo}
          handleDropDown={handleDropDown}
          confirmTemplate={confirmTemplate}
        />
        {/*
        panel A end
        */}
        <Divider />
        <PanelAbstractData
          panelVisible={panelVisible}
          dataLoading={panelAbstractLoading}
          dataAbstract={panelAbstractData}
          dataDoi={formik.values.doi}
        />

        <Splitter style={{ height: '600px' }}>
          <SplitterPanel className='flex flex-column' size={60} minSize={60}>
            {panelBLoading && panelBVisible ? (
              <Skeleton shape='rectangle' width='100%' height='100px' />
            ) : (
              <>
                <label htmlFor='description'>
                  What is the article about and authors's point of departure ?
                </label>
                <InputTextarea
                  id='article_about_content'
                  name='article_about_content'
                  rows={4}
                  cols={30}
                  style={{ color: authorPodColor, borderColor: authorPodColor }}
                  className={classNames({
                    'p-invalid': isFormFieldInvalid('article_about_content'),
                  })}
                  value={formik.values.article_about_content}
                  onChange={(e) => {
                    formik.setFieldValue(
                      'article_about_content',
                      e.target.value,
                    );
                  }}
                />
                {getFormErrorMessage('article_about_content')}{' '}
              </>
            )}
            {panelBLoading && panelBVisible ? (
              <Skeleton shape='rectangle' width='100%' height='100px' />
            ) : (
              <>
                <label htmlFor='description'>
                  How the article support your study ?
                </label>

                <InputTextarea
                  id='article_support_study_content'
                  name='article_support_study_content'
                  rows={4}
                  cols={30}
                  className={classNames({
                    'p-invalid': isFormFieldInvalid('article_about_content'),
                  })}
                  value={formik.values.article_about_content}
                  style={{
                    color: articleSupportStudyColor,
                    borderColor: articleSupportStudyColor,
                  }}
                  onChange={(e) => {
                    formik.setFieldValue(
                      'article_support_study_content',
                      e.target.value,
                    );
                  }}
                />
                {getFormErrorMessage('article_support_study_content')}
              </>
            )}

            {panelBLoading && panelBVisible ? (
              <Skeleton shape='rectangle' width='100%' height='100px' />
            ) : (
              <>
                <label htmlFor='description'>
                  How the article does not support your study ?
                </label>
                <InputTextarea
                  id='article_does_not_support_study_content'
                  name='article_does_not_support_study_content'
                  rows={4}
                  cols={30}
                  style={{
                    color: articleDoesNotSupportStudyColor,
                    borderColor: articleDoesNotSupportStudyColor,
                  }}
                  className={classNames({
                    'p-invalid': isFormFieldInvalid(
                      'article_does_not_support_study_content',
                    ),
                  })}
                  value={formik.values.article_does_not_support_study_content}
                  onChange={(e) => {
                    formik.setFieldValue(
                      'article_does_not_support_study_content',
                      e.target.value,
                    );
                  }}
                />
                {getFormErrorMessage('article_does_not_support_study_content')}
              </>
            )}
            {panelBLoading && panelBVisible ? (
              <Skeleton shape='rectangle' width='100%' height='100px' />
            ) : (
              <>
                <label htmlFor='description'>
                  What else is needed to support your study ? (Your POD)
                </label>
                <InputTextarea
                  id='needed_support_study_content'
                  name='needed_support_study_content'
                  rows={4}
                  cols={30}
                  style={{
                    color: neededSupportStudyColor,
                    borderColor: neededSupportStudyColor,
                  }}
                  className={classNames({
                    'p-invalid': isFormFieldInvalid(
                      'needed_support_study_content',
                    ),
                  })}
                  value={formik.values.needed_support_study_content}
                  onChange={(e) => {
                    formik.setFieldValue(
                      'needed_support_study_content',
                      e.target.value,
                    );
                  }}
                />
                {getFormErrorMessage('needed_support_study_content')}
              </>
            )}
          </SplitterPanel>
          <SplitterPanel
            className='flex justify-content-left'
            size={20}
            minSize={10}
          >
            <Card>
              <label htmlFor='article_about_page'>Page</label>
              <div className='card flex justify-content-center'>
                <InputText
                  name='article_about_page'
                  value={formik.values.article_about_page}
                  onChange={() => {}}
                />

                {getFormErrorMessage('article_about_page')}
              </div>

              <label htmlFor='article_support_study_page'>Page</label>

              <div className='card flex justify-content-center'>
                <InputText
                  name='article_support_study_page'
                  value={formik.values.article_support_study_page}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
                />

                {getFormErrorMessage('article_support_study_page')}
              </div>
            </Card>
          </SplitterPanel>

          <SplitterPanel className='flex justify-content-left' size={20}>
            <JournalDetailCheckboxesComponent
              subthemeSelections={subthemeSelections}
              selected={selected}
              onCategoryChange={onCategoryChange}
            />
          </SplitterPanel>
        </Splitter>

        {getFormErrorMessage('doi')}
        {/* Continue for other fields */}
        <div className='card flex flex-wrap gap-3'>
          <Button type='submit' label='Submit' severity='success' />
          <Button
            type='reset'
            label='Reset'
            onClick={resetAllDataInFieldsToInitial}
            severity='warning'
          />
          <Button
            type='button'
            label='Cancel'
            onClick={onCancel}
            severity='secondary'
          />
          <Button
            type='button'
            label='Clear Form'
            onClick={confirmClearForm}
            severity='danger'
          />
        </div>
      </form>
    </>
  );
};

export default JournalDetailComponent;
