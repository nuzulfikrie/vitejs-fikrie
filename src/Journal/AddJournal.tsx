import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useJournal } from '../Journal/JournalContext'; // Adjust the import path as needed
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import VideoModal from '../ui/components/Modal/VideoModal';

interface AddJournalProps {
  toast: React.RefObject<Toast>;
  showSuccess: (message: string) => void;
  showWarn: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
  projectId: string | null;
  userId: string | null;
  subthemeOptions: Subtheme[];
  journalColors: {};
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
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null,
  );
  const {
    journal,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const PageTitle = 'Add new journal';
  const { loadingMetadata, fetchMetadata, fetchAbstract, callVideo } =
    useJournal();

  const onSubmit = async (data) => {
    console.log('Form data:', data);
    showSuccess('Form submitted!');
    // Here you would typically send the form data to a server or another data handling function
  };

  const retrieveMetadata = async (doi) => {
    if (!doi) {
      showWarn('DOI is required');
      return;
    }
    try {
      const data = await fetchMetadata(doi);
      if (data !== undefined) {
        setValue('article_title', data.title);
        setValue('authors', data.authors);
        setValue('journal_name', data.journal);
        setValue('location', data.location);
        setValue('doi', data.url ? data.url.split('doi.org/')[1] : '');
        setValue('year', data.year ? data.year.toString() : '');
        setValue('volume', data.volume);
        setValue('issue', data.issue);
        setValue('page', data.page);
        showSuccess('Metadata fetched successfully');
      }
    } catch (error) {
      showError('Error fetching metadata');
    }
  };

  const [modalVideoVisible, setModalVideoVisible] = useState(false);
  const [modalAbstractVisible, setModalAbstractVisible] = useState(false);
  const [panelALoading, setPanelALoading] = useState<boolean>(false);
  const [panelAVisible, setPanelAVisible] = useState<boolean>(false);

  const [panelBLoading, setPanelBLoading] = useState<boolean>(false);
  const [panelBVisible, setPanelBVisible] = useState<boolean>(false);
  const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);

  function handleDropDown(event: DropdownChangeEvent): void {
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
        <div className='card flex flex-wrap gap-3'>
          <Button
            label='Video'
            severity='info'
            icon='pi pi-video'
            onClick={() => callVideo()}
          />
          <Button
            label='Retrieve Abstract'
            icon='pi pi-check'
            loading={loadingMetadata}
            onClick={(e) => {
              e.preventDefault();
              fetchAbstract(formik.values.doi);
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
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-column gap-2'>
        <span className='p-float-label'>
            <InputText id='doi' {...journal('doi', { required: 'DOI is required' })} placeholder='DOI' />
            <label htmlFor='doi'>DOI</label>
            {errors.doi && <small className='p-error'>{errors.doi.message}</small>}
            <Button type='button' label='Retrieve Metadata' onClick={() => retrieveMetadata(getValues('doi'))} />
          </span>



          <span className='p-float-label'>
            <InputText
              id='doi'
              {...formik.getFieldProps('doi')}
              placeholder='DOI'
            />
            <label htmlFor='doi'>DOI</label>{' '}
            {loadingMetadata ? (
              <>
                <i className='pi pi-spin pi-spinner' />
                <Button
                  type='button'
                  label='Retrieving Metadata....'
                  disabled={true}
                />
              </>
            ) : (
              <>
                <i className='pi pi-search' />
                <Button
                  type='button'
                  label='Retrieve Metadata'
                  onClick={() => retrieveMetadata()}
                  severity='danger'
                />
              </>
            )}
          </span>
          <InputText
            id='article_title'
            {...formik.getFieldProps('article_title')}
            placeholder='Article Title'
          />
          {formik.touched.article_title && formik.errors.article_title && (
            <>
              <small className='p-error'>{formik.errors.article_title}</small>
            </>
          )}
          <InputText
            id='authors'
            {...formik.getFieldProps('authors')}
            placeholder='Authors'
          />
          {formik.touched.authors && formik.errors.authors && (
            <>
              <small className='p-error'>{formik.errors.authors}</small>
            </>
          )}

          <InputText
            id='journal_name'
            {...formik.getFieldProps('journal_name')}
            placeholder='Journal Name'
          />
          {formik.touched.journal_name && formik.errors.journal_name && (
            <>
              <small className='p-error'>{formik.errors.journal_name}</small>
            </>
          )}

          <InputText
            id='location'
            {...formik.getFieldProps('location')}
            placeholder='location'
          />
          {formik.touched.location && formik.errors.location && (
            <>
              <small className='p-error'>{formik.errors.location}</small>
            </>
          )}
          <InputText
            id='year'
            {...formik.getFieldProps('year')}
            placeholder='year'
          />
          {formik.touched.year && formik.errors.year && (
            <>
              <small className='p-error'>{formik.errors.year}</small>
            </>
          )}
          <InputText
            id='volume'
            {...formik.getFieldProps('volume')}
            placeholder='volume'
          />
          {formik.touched.volume && formik.errors.volume && (
            <>
              <small className='p-error'>{formik.errors.volume}</small>
            </>
          )}
          <InputText
            id='issue'
            {...formik.getFieldProps('issue')}
            placeholder='Issue'
          />
          {formik.touched.issue && formik.errors.issue && (
            <>
              <small className='p-error'>{formik.errors.issue}</small>
            </>
          )}

          {/* Add more fields as needed */}

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
              onClick={clearForm}
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
        accept={() => fetchMetadata(formik.values.doi)}
      />
    </div>
  );
};

export default AddJournal;
