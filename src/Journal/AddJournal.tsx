import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useJournal } from '../Journal/JournalContext'; // Adjust the import path as needed
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Card } from 'primereact/card';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import VideoModal from '../ui/components/Modal/VideoModal';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import PanelAbstractData from '../ui/components/Panel/PanelAbstractData';
import { Divider } from 'primereact/divider';
import JournalDetailCheckboxesComponent from '../ui/components/Form/JournalDetailCheckboxesComponent';
import { CheckboxChangeEvent } from 'primereact/checkbox';
import { InputTextarea } from 'primereact/inputtextarea';
interface AddJournalProps {
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

const AddJournal: React.FC<AddJournalProps> = ({
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
  const [loadingAbstract, setLoadingAbstract] = useState(false);
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

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const PageTitle = 'Add new journal';
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

  const retrieveMetadata = async (doi: string) => {
    if (!doi) {
      showWarn('DOI is required');
      return;
    }
    try {
      const dataFetchedMetadata = await fetchMetadata(doi);

      console.log('--- dataFetchedMetadata---');
      console.log(dataFetchedMetadata);
      console.log('--- dataFetchedMetadata---');

      if (dataFetchedMetadata !== undefined) {
        setValue('article_title', dataFetchedMetadata[0].data);
        setValue('authors', dataFetchedMetadata[1].data);
        setValue('journal_name', dataFetchedMetadata[7].data);
        setValue('location', dataFetchedMetadata[7].data);
        setValue(
          'doi',
          dataFetchedMetadata[5].data
            ? dataFetchedMetadata.url.split('doi.org/')[1]
            : '',
        );
        setValue(
          'year',
          dataFetchedMetadata[2].year ? dataFetchedMetadata[2].year.toString() : '',
        );
        setValue('volume', dataFetchedMetadata[4].data);
        setValue('issue', dataFetchedMetadata[6].issue);
        setValue('page', dataFetchedMetadata[3].page);
        showSuccess('Metadata fetched successfully');
      }
    } catch (error) {
      showError('Error fetching metadata');
    }
  };

  const clearForm = (): void => {
    setValue('article_title', '');
    setValue('authors', '');
    setValue('journal_name', '');
    setValue('location', '');
    setValue('doi', '');
    setValue('year', '');
    setValue('volume', '');
  };

  const confirmUseMetadata = () => {};

  {
    /*
  - for abstract
 */
  }
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

  const [modalVideoVisible, setModalVideoVisible] = useState(false);
  const [panelALoading, setPanelALoading] = useState<boolean>(false);
  const [panelAVisible, setPanelAVisible] = useState<boolean>(false);

  const [panelBLoading, setPanelBLoading] = useState<boolean>(false);
  const [panelBVisible, setPanelBVisible] = useState<boolean>(false);
  const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);

  function handleDropDown(event: DropdownChangeEvent): void {
    throw new Error('Function not implemented.');
  }

  function onCategoryChange(event: CheckboxChangeEvent): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div>
      <Toast ref={toast} />

      <Card title={PageTitle}>
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
            onClick={() => callVideo()}
          />
          <Button
            label='Retrieve Abstract'
            icon='pi pi-check'
            loading={loadingAbstract}
            onClick={(e) => {
              e.preventDefault();
              fetchAbstract(getValues('doi'));
            }}
            severity='success'
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
              <InputText
                id='doi'
                {...register('doi', { required: 'DOI is required' })}
                placeholder='DOI'
              />
              <label htmlFor='doi'>DOI</label>
              {errors.doi && (
                <small className='p-error'>{errors.doi?.message}</small>
              )}
              {loadingMetadata ? (
                <>
                  <Button
                    icon='pi pi-spin pi-spinner'
                    type='button'
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
                    label='Retrieve Metadata'
                    onClick={() => retrieveMetadata(getValues('doi'))}
                    severity='danger'
                  />
                </>
              )}
            </span>
          </div>
          <InputText
            id='article_title'
            {...register('article_title', {
              required: 'Article title is required',
            })}
            placeholder='Article Title'
          />
          {errors.doi && (
            <small className='p-error'>{errors.article_title.message}</small>
          )}
          <InputText
            id='authors'
            {...register('authors', { required: 'Authors is required' })}
            placeholder='Authors'
          />
          {errors.authors && (
            <small className='p-error'>{errors.authors.message}</small>
          )}

          <InputText
            id='journal_name'
            {...register('journal_name', {
              required: 'Journal name is required',
            })}
            placeholder='Journal Name'
          />
          {errors.journal_name && (
            <small className='p-error'>{errors.journal_name.message}</small>
          )}

          <InputText
            id='location'
            {...register('location', { required: 'Location is required' })}
            placeholder='location'
          />

          {errors.location && (
            <small className='p-error'>{errors.location.message}</small>
          )}

          <InputText
            id='year'
            {...register('year', {
              required: 'Year is required',
              pattern: {
                value: /^\d{4}$/,
                message: 'Year must be a 4-digit number',
              },
            })}
            placeholder='year'
          />
          {errors.year && (
            <small className='p-error'>{errors.year.message}</small>
          )}

          <InputText
            id='volume'
            {...register('volume', { required: 'volume is required' })}
            placeholder='volume'
          />
          {errors.volume && (
            <small className='p-error'>{errors.volume.message}</small>
          )}
          <InputText
            id='issue'
            {...register('issue', { required: 'issue is required' })}
            placeholder='Issue'
          />
          {errors.issue && (
            <small className='p-error'>{errors.issue.message}</small>
          )}

          {/* Add more fields as needed */}
          <div className='card flex flex-wrap justify-content-left gap-4'>
            <Button
              label='Insert Template'
              severity='info'
              onClick={(e) => {
                e.preventDefault();
                confirmUseMetadata();
              }}
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
              <label htmlFor='description'>
                What is the article about and authors's point of departure ?
              </label>

              <InputTextarea
                id='article_about_content'
                name='article_about_content'
                rows={4}
                cols={30}
                style={{
                  color: authorPodColor,
                  borderColor: authorPodColor,
                }}
                {...register('article_about_content', {
                  required: 'This is required',
                })}
              />
              {errors.article_about_content && (
                <small className='p-error'>
                  {errors.article_about_content.message}
                </small>
              )}
              <label htmlFor='description'>
                How the article support your study ?
              </label>

              <InputTextarea
                id='article_support_study_content'
                name='article_support_study_content'
                rows={4}
                cols={30}
                style={{
                  color: articleSupportStudyColor,
                  borderColor: articleSupportStudyColor,
                }}
                {...register('article_support_study_content', {
                  required: 'This is required',
                })}
              />
              {errors.article_support_study_content && (
                <small className='p-error'>
                  {errors.article_support_study_content.message}
                </small>
              )}
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
                {...register('article_does_not_support_study_content', {
                  required: 'This is required',
                })}
              />
              {errors.article_does_not_support_study_content && (
                <small className='p-error'>
                  {errors.article_does_not_support_study_content.message}
                </small>
              )}
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
                {...register('needed_support_study_content', {
                  required: 'This is required',
                })}
              />
              {errors.article_support_study_content && (
                <small className='p-error'>
                  {errors.article_support_study_content.message}
                </small>
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
                  <InputText name='article_about_page' />
                </div>

                <label htmlFor='article_support_study_page'>Page</label>

                <div className='card flex justify-content-center'>
                  <InputText
                    name='article_support_study_page'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
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
          <div className='flex-wrap justify-content-left gap-10'>
            <Button
              label='Submit'
              type='submit'
              disabled={loading}
              className='p-mr-2'
              style={{ backgroundColor: '#007bff', color: 'white' }}
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

      <ConfirmDialog
        visible={isConfirmDialogVisible}
        onHide={() => setIsConfirmDialogVisible(false)}
        message='Are you sure you want to fetch metadata?'
        header='Confirm Metadata Fetch'
        accept={() => fetchMetadata(getValues('doi'))}
      />
    </div>
  );
};

export default AddJournal;
