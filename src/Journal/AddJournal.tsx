import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useJournal } from '../Journal/JournalContext'; // Adjust the import path as needed
import { useJournalForm } from '../Journal/JournalForm'; // Adjust the import path as needed
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Card } from 'primereact/card';

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
  const [loading,setLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null,
  );

  const PageTitle = 'Add new journal';
  const journal = useJournal();
  const fetchMetadata = journal ? journal.fetchMetadata : null;
  const [modalVideoVisible, setModalVideoVisible] = useState(false);
  const [modalAbstractVisible, setModalAbstractVisible] = useState(false);
  const [panelALoading, setPanelALoading] = useState<boolean>(false);
  const [panelAVisible, setPanelAVisible] = useState<boolean>(false);

  const [panelBLoading, setPanelBLoading] = useState<boolean>(false);
  const [panelBVisible, setPanelBVisible] = useState<boolean>(false);
  const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);

    const initialValues = {

      article_title: '',
      authors: '',
      journal_name:  '',
      location: '',
      doi: '',
      year: '',
      volume: '',
      issue: '',
      page: '',
      step06: '',
      article_about_content:  '',
      article_about_page:  '',
      article_support_study_content: '',
      article_support_study_page: '',
      article_does_not_support_study_content:
      '',
      needed_support_study_content: '',
    };

    const validate = (values: any) => {
      const errors = {};
      if (!values.article_title) {
        errors.article_title = 'Required';
      }
      // Additional validation as needed
      return errors;
    };

      // Handle form submission
  const onSubmit = (values: any) => {
    console.log('Form data:', values);
    showSuccess('Form submitted!');
    // Here you would typically send the form data to a server or another data handling function
  };

    const { formik, resetForm, clearForm } = useJournalForm(initialValues, onSubmit, validate);


  return (
    <div>

      <Toast ref={toast} />
      <Card title={PageTitle}>
      <form onSubmit={formik.handleSubmit}>
      <InputText id="doi" {...formik.getFieldProps('doi')} placeholder="DOI" />

        <InputText id="article_title" {...formik.getFieldProps('article_title')} placeholder="Article Title" />
        {formik.touched.article_title && formik.errors.article_title && (
          <>
            <small className="p-error">{formik.errors.article_title}</small>
          </>
        )}
        <InputText id="authors" {...formik.getFieldProps('authors')} placeholder="Authors" />
        {formik.touched.authors && formik.errors.authors && (
          <>
            <small className="p-error">{formik.errors.authors}</small>
          </>
        )}

<InputText id="journal_name" {...formik.getFieldProps('journal_name')} placeholder="Journal Name" />
        {formik.touched.journal_name && formik.errors.journal_name && (
          <>
            <small className="p-error">{formik.errors.journal_name}</small>
          </>
        )}

                <InputText id="location" {...formik.getFieldProps('location')} placeholder="location" />
        {formik.touched.location && formik.errors.location && (
          <>
            <small className="p-error">{formik.errors.location}</small>
          </>
        )}
                <InputText id="year" {...formik.getFieldProps('year')} placeholder="year" />
        {formik.touched.year && formik.errors.year && (
          <>
            <small className="p-error">{formik.errors.year}</small>
          </>
        )}
                <InputText id="volume" {...formik.getFieldProps('volume')} placeholder="volume" />
        {formik.touched.volume && formik.errors.volume && (
          <>
            <small className="p-error">{formik.errors.volume}</small>
          </>
    )}
                  <InputText id="issue" {...formik.getFieldProps('issue')} placeholder="Issue" />
        {formik.touched.issue && formik.errors.issue && (
          <>
            <small className="p-error">{formik.errors.issue}</small>
          </>
        )}



        {/* Add more fields as needed */}
        <Button label="Submit" type="submit" disabled={loading} className="p-mr-2" />
        <Button label="Clear" type="button" onClick={clearForm} disabled={loading} className="p-button-secondary" />
      </form>
      </Card>
      {/* Modal and other components */}

      <ConfirmDialog
        visible={isConfirmDialogVisible}
        onHide={() => setIsConfirmDialogVisible(false)}
        message="Are you sure you want to fetch metadata?"
        header="Confirm Metadata Fetch"
        accept={() => fetchMetadata(formik.values.doi)}
      />
    </div>
  );
};

export default AddJournal;
