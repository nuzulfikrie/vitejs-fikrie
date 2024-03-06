import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useJournal } from '../Journal/JournalContext'; // Adjust the import path as needed
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Card } from 'primereact/card';
import { classNames } from 'primereact/utils';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import VideoModal from '../ui/components/Modal/VideoModal';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import PanelAbstractData from '../ui/components/Panel/PanelAbstractData';
import { Divider } from 'primereact/divider';
import JournalDetailCheckboxesComponent from '../ui/components/Form/JournalDetailCheckboxesComponent';
import { CheckboxChangeEvent } from 'primereact/checkbox';
import { InputTextarea } from 'primereact/inputtextarea';

import {
  parseAuthors,
  generateInTextCitation,
  generateCitationUsingDoi,
} from '../services/citationService';

interface EditJournalProps {
  journalId: string;
  toast: React.RefObject<Toast>;
  showSuccess: (message: string) => void;
  showWarn: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
  projectId: string | null;
  userId: string | null;
  subthemeOptions: Subtheme[];
  journalColors: journalColors;
}
interface Subtheme {
  name: string;
  key: string;
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
interface Subtheme {
  name: string;
  key: string;
}

interface subtheme {
  name: string;
  key: string;
  construct: string;
}
interface Metadata {
  title: string;
  authors: string;
  journal: string;
  location: string;
  url: string;
  year: string;
  volume: string;
  issue: string;
  page: string;
}

interface journalColors {
  author_pod_color: string;
  article_support_study_color: string;
  article_dontsupport_study_color: string;
  your_pod_color: string;
}

const EditJournal: React.FC<EditJournalProps> = ({
  journalId,
  toast,
  showSuccess,
  showWarn,
  showError,
  showInfo,
  projectId,
  userId,
  subthemeOptions,
  journalColors,
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null,
  );

  const [selected, setSelected] = useState([0]);
  console.log('--- jounral colors----');
  console.log(journalColors);
  console.log('--- jounral colors----');

  const authorPodColor = journalColors.author_pod_color;
  const articleSupportStudyColor = journalColors.article_support_study_color;
  const articleDoesNotSupportStudyColor =
    journalColors.article_dontsupport_study_color;
  const neededSupportStudyColor = journalColors.your_pod_color;

  const defaultValues = {
    doi: '',
    article_title: '',
    authors: '',
    journal_name: '',
    location: '',
    year: '',
    volume: '',
    issue: '',
    page: '',
    article_about_content: '',
    article_support_study_content: '',
    article_does_not_support_study_content: '',
    needed_support_study_content: '',
    article_about_page: '',
    article_support_study_page: '',
    article_does_not_support_study_page: '',
    needed_support_study_page: '',
    selection: [],
  };

  const {
    control,
    reset,
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues });

  const PageTitle = `Edit journal ${journalId}`;
  const {
    loadingMetadata,
    fetchMetadata,
    fetchAbstract,
    callVideo,
    videoData,
  } = useJournal();

  const onSubmit = async (data: any) => {
    console.log('Form data:', data);
    showSuccess('Form submitted!');
    // Here you would typically send the form data to a server or another data handling function
  };

  const getFormErrorMessage = (name: string | number) => {
    return errors[name] ? (
      <small className='p-error'>{errors[name]?.message.toString()}</small>
    ) : (
      <small className='p-error'>&nbsp;</small>
    );
  };

  const retrieveMetadata = async (doi: string) => {
    if (!doi) {
      showWarn('DOI is required');
      return;
    }
    try {
      const dataFetchedMetadata = await fetchMetadata(doi);

      if (dataFetchedMetadata !== undefined) {
        setValue('article_title', dataFetchedMetadata[0].data);
        setValue('authors', dataFetchedMetadata[1].data);
        setValue('journal_name', dataFetchedMetadata[7].data);
        setValue('location', dataFetchedMetadata[7].data);
        setValue(
          'doi',
          dataFetchedMetadata[5].data
            ? dataFetchedMetadata[5].data.split('doi.org/')[1]
            : '',
        );
        setValue(
          'year',
          dataFetchedMetadata[2].data
            ? dataFetchedMetadata[2].data.toString()
            : '',
        );
        setValue('volume', dataFetchedMetadata[4].data);
        setValue('issue', dataFetchedMetadata[6].data);
        setValue('page', dataFetchedMetadata[3].data);
        showSuccess('Metadata fetched successfully');
      }
    } catch (error) {
      showError('Error fetching metadata');
    }
  };

  const clearForm = (): void => {
    reset();
    showInfo('Form cleared');
  };

  const reject = () => {
    showError('action canceled');
  };
  const confirmTemplate = (): void => {
    let authorString = getValues('authors');
    let year = getValues('year');
    let doi = getValues('doi');

    if (!authorString) {
      showError('Author is required');
    }

    if (!year) {
      showError('Year is required');
    }

    console.log('--- confirm template ---');
    console.log(doi);
    console.log('--- confirm template ---');

    console.log('--- confirm template authorString ---');
    console.log(authorString);
    console.log('--- confirm template  authorString---');
    if (doi.length === 0) {
      let authorsObject = parseAuthors(authorString);
      var inTextCitation = generateInTextCitation(authorsObject, year);

      setValue('article_about_content', `${inTextCitation} states that`);
      setValue(
        'article_support_study_content',
        `${inTextCitation} highlighted on`,
      );
      setValue(
        'article_does_not_support_study_content',
        `However ${inTextCitation} only focused on`,
      );
      setValue(
        'needed_support_study_content',
        `Therefore based on ${inTextCitation} my study will focus on`,
      );

      showSuccess('Template inserted');
    } else {
      console.log('--- confirm template  with doi ---');

      generateCitationUsingDoi(doi)
        .then((data) => {
          var inTextCitation = data;
          console.log('--- data ---');
          console.log(data);
          setValue('article_about_content', `${inTextCitation} states that`);
          setValue(
            'article_support_study_content',
            `${inTextCitation} highlighted on`,
          );
          setValue(
            'article_does_not_support_study_content',
            `However ${inTextCitation} only focused on`,
          );
          setValue(
            'needed_support_study_content',
            `Therefore based on ${inTextCitation} my study will focus on`,
          );

          showSuccess('Template inserted');
        })
        .catch((error) => {
          showError('Error fetching citation' + error);
        });
    }
  };

  const confirmUseMetadata = () => {
    confirmDialog({
      message: 'Are you sure you want to to insert template?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'accept',
      accept: () => confirmTemplate(),
      reject: () => reject(),
    });
  };

  {
    /*
  - for abstract
 */
  }

  const [loadingAbstract, setLoadingAbstract] = useState<boolean>(false);

  const [panelAbstractLoading, setPanelAbstractLoading] =
    useState<boolean>(false);
  const [panelAbstractVisible, setPanelAbstractVisible] =
    useState<boolean>(false);

  const [panelAbstractData, setPanelAbstractData] = useState<string>(null);
  {
    /*
           panelVisible={panelVisible}
            dataLoading={panelAbstractLoading}
            dataAbstract={panelAbstractData}

*/
  }
  const [selectedSubthemes, setSelectedSubthemes] = useState<Subtheme[]>([]);
  const [modalVideoVisible, setModalVideoVisible] = useState(false);

  const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);

  function handleDropDown(e: DropdownChangeEvent): void {
    if (e.value.code === 'reset') {
      setSelectedProvider(null);
    } else {
      setSelectedProvider(e.value);
    }
  }

  function onCategoryChange(e: CheckboxChangeEvent): void {
    let _selectedSubthemes = [...selectedSubthemes];

    // Check if the checkbox with index 0 is checked
    if (e.checked && e.value === 0) {
      // Flush out the array and add only this item
      _selectedSubthemes = [e.value];
    } else if (e.checked && e.value !== 0) {
      // Add the checked item if it's not already in the array and it's not the special index 0 case
      _selectedSubthemes.push(e.value);
    } else {
      // If the item is unchecked, remove it from the array
      _selectedSubthemes.splice(_selectedSubthemes.indexOf(e.value), 1);
    }

    //check if in _selectedSubthemes contains 0
    if (_selectedSubthemes.includes(0)) {
      _selectedSubthemes = [0];
    }

    setSelectedSubthemes(_selectedSubthemes);

    setSelected(_selectedSubthemes);
  }

  interface CheckboxItem {
    name: string;
    key: string;
    construct: string;
  }

  function getKeyFromSelectedIndex(
    items: CheckboxItem[],
    selectedIndex: number,
  ): string | null {
    // Check if the selected index is within the bounds of the array
    if (selectedIndex >= 0 && selectedIndex < items.length) {
      return items[selectedIndex].key;
    } else {
      // Return null or an appropriate value if the index is out of bounds
      return null;
    }
  }

  return (
    <div>
      <Toast ref={toast} />

      <Card title={PageTitle} style={{ marginTop: '5px' }}>
        <VideoModal
          videoData={videoData}
          modalVideoVisible={modalVideoVisible}
          setModalVideoVisible={setModalVideoVisible}
        />
        {/* Repeat the following pattern for each field */}

        {/** button set start */}
        <div className='card flex flex-wrap gap-2'>
          <Button
            label='Video'
            severity='info'
            icon='pi pi-video'
            style={{ color: 'white' }}
            onClick={() => callVideo()}
          />
          <Button
            label='Retrieve Abstract'
            icon='pi pi-check'
            loading={loadingAbstract}
            style={{ color: 'white' }}
            onClick={(e) => {
              e.preventDefault();
              const doi = getValues('doi');
              if (!doi) {
                showWarn('DOI is required');
                return;
              }
              setPanelAbstractLoading(true);
              // Assuming fetchAbstract is an async function and returns a Promise
              fetchAbstract(doi, selectedProvider?.code ?? '')
                .then((data) => {
                  setPanelAbstractData(data);
                  setPanelAbstractVisible(true);
                  showSuccess('Abstract fetched successfully');
                })
                .catch((error) => {
                  console.error('Failed to fetch abstract:', error);
                  // Optionally handle error state here
                  showError('Failed to fetch abstract');
                })
                .finally(() => {
                  setPanelAbstractLoading(false);
                });
            }}
          />
          <div className='card flex justify-content-center'>
            <Dropdown
              value={selectedProvider}
              onChange={handleDropDown}
              options={providerSelection}
              optionLabel='name'
              placeholder='Select a Provider'
              className='w-full md:w-14rem'
            />
          </div>
        </div>

        {/** button set end */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-column gap-2'
        >
          <div className='flex flex-column gap-2 py-2'>
            <span className='p-float-label gap-2'>
              <Controller
                name='doi'
                control={control}
                rules={{ required: 'DOI is required.' }}
                render={({ field, fieldState }) => (
                  <>
                    <label
                      htmlFor={field.name}
                      className={classNames({ 'p-error': errors.doi })}
                    ></label>
                    <span className='p-float-label'>
                      <InputText
                        id={field.name}
                        value={field.value}
                        className={classNames({
                          'p-invalid': fieldState.error,
                        })}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      <label htmlFor={field.name}> DOI </label>
                      {loadingMetadata ? (
                        <>
                          <Button
                            icon='pi pi-spin pi-spinner'
                            type='button'
                            style={{ color: 'white' }}
                            label='Retrieving Metadata....'
                            disabled={true}
                          />
                        </>
                      ) : (
                        <>
                          <i className='pi pi-search' />
                          <Button
                            icon='pi pi-search'
                            type='button'
                            style={{ color: 'white' }}
                            label='Retrieve Metadata'
                            onClick={() => setIsConfirmDialogVisible(true)}
                            severity='danger'
                          />
                        </>
                      )}
                    </span>
                    {getFormErrorMessage(field.name)}
                  </>
                )}
              />
            </span>
          </div>

          <Controller
            name='article_title'
            control={control}
            rules={{ required: 'Article title is required.' }}
            render={({ field, fieldState }) => (
              <>
                <label
                  htmlFor={field.name}
                  className={classNames({ 'p-error': errors.article_title })}
                ></label>
                <span className='p-float-label'>
                  <InputText
                    id={field.name}
                    value={field.value}
                    className={classNames({
                      'p-invalid': fieldState.error,
                    })}
                    style={{
                      width: '100%',
                    }}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  <label htmlFor={field.name}> Article Title </label>
                </span>
                {getFormErrorMessage(field.name)}
              </>
            )}
          />
          <Controller
            name='authors'
            control={control}
            rules={{ required: 'Authors is required.' }}
            render={({ field, fieldState }) => (
              <>
                <label
                  htmlFor={field.name}
                  className={classNames({ 'p-error': errors.authors })}
                ></label>
                <span className='p-float-label'>
                  <InputText
                    id={field.name}
                    value={field.value}
                    className={classNames({
                      'p-invalid': fieldState.error,
                    })}
                    style={{
                      width: '100%',
                    }}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  <label htmlFor={field.name}> Authors </label>
                </span>
                {getFormErrorMessage(field.name)}
              </>
            )}
          />

          <Controller
            name='journal_name'
            control={control}
            rules={{ required: 'Journal Name is required.' }}
            render={({ field, fieldState }) => (
              <>
                <label
                  htmlFor={field.name}
                  className={classNames({ 'p-error': errors.journal_name })}
                ></label>
                <span className='p-float-label'>
                  <InputText
                    id={field.name}
                    value={field.value}
                    className={classNames({
                      'p-invalid': fieldState.error,
                    })}
                    style={{
                      width: '100%',
                    }}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  <label htmlFor={field.name}> Journal Name </label>
                </span>
                {getFormErrorMessage(field.name)}
              </>
            )}
          />

          <Controller
            name='location'
            control={control}
            rules={{ required: 'Location is required.' }}
            render={({ field, fieldState }) => (
              <>
                <label
                  htmlFor={field.name}
                  className={classNames({ 'p-error': errors.location })}
                ></label>
                <span className='p-float-label'>
                  <InputText
                    id={field.name}
                    value={field.value}
                    className={classNames({
                      'p-invalid': fieldState.error,
                    })}
                    style={{
                      width: '100%',
                    }}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  <label htmlFor={field.name}>Location</label>
                </span>
                {getFormErrorMessage(field.name)}
              </>
            )}
          />

          <Controller
            name='year'
            control={control}
            rules={{
              required: 'Year is required',
              pattern: {
                value: /^\d{4}$/,
                message: 'Year must be a 4-digit number',
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <label
                  htmlFor={field.name}
                  className={classNames({ 'p-error': errors.year })}
                ></label>
                <span className='p-float-label'>
                  <InputText
                    id={field.name}
                    value={field.value}
                    className={classNames({
                      'p-invalid': fieldState.error,
                    })}
                    style={{
                      width: '100%',
                    }}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  <label htmlFor={field.name}> Year </label>
                </span>
                {getFormErrorMessage(field.name)}
              </>
            )}
          />
          <Controller
            name='volume'
            control={control}
            rules={{ required: 'Volume is required' }}
            render={({ field, fieldState }) => (
              <>
                <label
                  htmlFor={field.name}
                  className={classNames({ 'p-error': errors.volume })}
                ></label>
                <span className='p-float-label'>
                  <InputText
                    id={field.name}
                    value={field.value}
                    className={classNames({
                      'p-invalid': fieldState.error,
                    })}
                    style={{ width: '100%' }}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  <label htmlFor={field.name}>Volume</label>
                </span>
                {getFormErrorMessage(field.name)}
              </>
            )}
          />
          <Controller
            name='issue'
            control={control}
            rules={{ required: 'Issue is required' }}
            render={({ field, fieldState }) => (
              <>
                <label
                  htmlFor={field.name}
                  className={classNames({ 'p-error': errors.issue })}
                ></label>
                <span className='p-float-label'>
                  <InputText
                    id={field.name}
                    value={field.value}
                    className={classNames({
                      'p-invalid': fieldState.error,
                    })}
                    style={{
                      width: '100%',
                    }}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  <label htmlFor={field.name}>Issue</label>
                </span>
                {getFormErrorMessage(field.name)}
              </>
            )}
          />

          {/* Add more fields as needed */}
          <div className='card flex flex-wrap justify-content-left gap-4'>
            <Button
              label='Insert Template'
              severity='info'
              onClick={confirmUseMetadata}
              icon='pi pi-verified'
            />
          </div>
          <Divider />
          <PanelAbstractData
            panelVisible={panelAbstractVisible}
            dataLoading={panelAbstractLoading}
            dataAbstract={panelAbstractData}
            dataDoi={getValues('doi')}
          />

          <Splitter style={{ height: '600px' }}>
            <SplitterPanel className='flex flex-column' size={60} minSize={60}>
              <Controller
                name='article_about_content'
                control={control}
                rules={{ required: 'Description is required.' }}
                render={({ field, fieldState }) => (
                  <>
                    <label htmlFor={field.name}>
                      What is the article about and authors's point of departure
                      ?
                    </label>
                    <InputTextarea
                      id={field.name}
                      {...field}
                      rows={4}
                      cols={30}
                      style={{
                        color: authorPodColor,
                        borderColor: authorPodColor,
                        width: '100%',
                      }}
                      className={classNames({ 'p-invalid': fieldState.error })}
                    />
                    {getFormErrorMessage(field.name)}
                  </>
                )}
              />

              <Controller
                name='article_support_study_content'
                control={control}
                rules={{ required: 'This is required.' }}
                render={({ field, fieldState }) => (
                  <>
                    <label htmlFor={field.name}>
                      What is the article about and authors's point of departure
                      ?
                    </label>
                    <InputTextarea
                      id={field.name}
                      {...field}
                      rows={4}
                      cols={30}
                      style={{
                        color: articleSupportStudyColor,
                        borderColor: articleSupportStudyColor,
                        width: '100%',
                      }}
                      className={classNames({ 'p-invalid': fieldState.error })}
                    />
                    {getFormErrorMessage(field.name)}
                  </>
                )}
              />

              <Controller
                name='article_does_not_support_study_content'
                control={control}
                rules={{ required: 'This is required.' }}
                render={({ field, fieldState }) => (
                  <>
                    <label htmlFor={field.name}>
                      How the article does not support your study ?
                    </label>
                    <InputTextarea
                      id={field.name}
                      {...field}
                      rows={4}
                      cols={30}
                      style={{
                        color: articleDoesNotSupportStudyColor,
                        borderColor: articleDoesNotSupportStudyColor,
                        width: '100%',
                      }}
                      className={classNames({ 'p-invalid': fieldState.error })}
                    />
                    {getFormErrorMessage(field.name)}
                  </>
                )}
              />

              <Controller
                name='needed_support_study_content'
                control={control}
                rules={{ required: 'This is required.' }}
                render={({ field, fieldState }) => (
                  <>
                    <label htmlFor={field.name}>
                      What else is needed to support your study ? (Your POD)
                    </label>
                    <InputTextarea
                      id={field.name}
                      {...field}
                      rows={4}
                      cols={30}
                      style={{
                        color: neededSupportStudyColor,
                        borderColor: neededSupportStudyColor,
                        width: '100%',
                      }}
                      className={classNames({ 'p-invalid': fieldState.error })}
                    />
                    {getFormErrorMessage(field.name)}
                  </>
                )}
              />
            </SplitterPanel>
            <SplitterPanel
              className='flex justify-content-left'
              size={20}
              minSize={10}
            >
              <Card>
                <div className='card flex justify-content-center'>
                  <Controller
                    name='article_about_page'
                    control={control}
                    rules={{ validate: (value) => (value ? true : undefined) }}
                    render={({ field, fieldState }) => (
                      <>
                        <label
                          htmlFor={field.name}
                          className={classNames({
                            'p-error': errors.article_about_page,
                          })}
                        ></label>
                        <span className='p-float-label'>
                          <InputText
                            id={field.name}
                            value={field.value}
                            className={classNames({
                              'p-invalid': fieldState.error,
                            })}
                            style={{
                              width: '100%',
                            }}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                          <label htmlFor={field.name}> Page </label>
                        </span>
                        {getFormErrorMessage(field.name)}
                      </>
                    )}
                  />
                </div>
                <div className='card flex justify-content-center'>
                  <Controller
                    name='article_support_study_page'
                    control={control}
                    rules={{ validate: (value) => (value ? true : undefined) }}
                    render={({ field, fieldState }) => (
                      <>
                        <label
                          htmlFor={field.name}
                          className={classNames({
                            'p-error': errors.article_support_study_page,
                          })}
                        ></label>
                        <span className='p-float-label'>
                          <InputText
                            id={field.name}
                            value={field.value}
                            className={classNames({
                              'p-invalid': fieldState.error,
                            })}
                            style={{
                              width: '100%',
                              marginTop: '80px',
                            }}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                          <label htmlFor={field.name}> Page </label>
                        </span>
                        {getFormErrorMessage(field.name)}
                      </>
                    )}
                  />
                </div>
              </Card>
            </SplitterPanel>

            <SplitterPanel className='flex justify-content-left' size={20}>
              <JournalDetailCheckboxesComponent
                subthemeSelections={subthemeOptions}
                selected={selected}
                onCategoryChange={onCategoryChange}
              />
            </SplitterPanel>
          </Splitter>
          <div className='flex-wrap justify-content-left gap-2'>
            <Button
              label='Submit'
              type='submit'
              disabled={loading}
              className='p-mr-2'
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                marginRight: '2px',
              }}
            />
            <Button
              label='Clear'
              type='button'
              onClick={() => clearForm()}
              disabled={loading}
              className='p-button-secondary'
              style={{ backgroundColor: '#6c757d', color: 'white' }}
            />
          </div>
        </form>
      </Card>
      {/* Modal and other components */}
      <ConfirmDialog />
      <ConfirmDialog
        visible={isConfirmDialogVisible}
        onHide={() => setIsConfirmDialogVisible(false)}
        message='Are you sure you want to fetch metadata?'
        header='Confirm Metadata Fetch'
        accept={() => retrieveMetadata(getValues('doi'))}
      />
    </div>
  );
};

export default EditJournal;
