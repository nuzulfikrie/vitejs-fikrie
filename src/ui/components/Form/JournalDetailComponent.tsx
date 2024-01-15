import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown'; // If needed for provider selection
import 'primeicons/primeicons.css';
import axios from 'axios';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';

interface Category {
  name: string;
  key: string;
}
interface JournalDetailsComponentProps {
  journalId: string;
  projectId: string;
  userId: string;
  data: any;
  onSave: (journalId: string, projectId: string, journal: any) => void;

  showSuccess: (message: string) => void;
  showWarning: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
}
import { InputTextarea } from 'primereact/inputtextarea';
//use JournalDetailsComponentProps
export default function JournalDetailsComponent({
  journalId,
  projectId,
  userId,
  data,
  onSave,
  showSuccess,
  showWarning,
  showError,
  showInfo,
}: JournalDetailsComponentProps): JSX.Element {
  /**
   * subthemes
   * {
      "who": {
          "1735": "characters of undisputed novel invention ",
          "1744": "methods for constructing undisputed novel invention",
          "1745": "challenges to achieve undisputed novel invention"
      },
      "what": {
          "1736": "timeline of patent system",
          "1737": "components of patent system",
          "1746": "advantages of patent system"
      },
      "how_1": {
          "1738": "characters of impactful innovation",
          "1739": "strategies towards impactful innovation",
          "1740": "challenges and reality towards impactful innovation"
      },
      "how_2": {
          "1741": "criteria of wealth of nation",
          "1742": "types of wealth of nation",
          "1743": "process of increasing wealth of a nation"
      }
  }
   */
  interface Subtheme {
    [key: string]: {
      [key: string]: string;
    };
  }
  const categories: Category[] = [
    { name: 'Accounting', key: 'A' },
    { name: 'Marketing', key: 'M' },
    { name: 'Production', key: 'P' },
    { name: 'Research', key: 'R' },
  ];
  const [modalVideoVisible, setModalVideoVisible] = useState(false);
  const [article_title, setArticleTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [journal_name, setJournalName] = useState('');
  const [location, setLocation] = useState('');
  const [doi, setDoi] = useState('');
  const [year, setYear] = useState('');
  const [volume, setVolume] = useState('');
  const [issue, setIssue] = useState('');
  const [pages, setPages] = useState('');
  const [step06, setStep06] = useState([]);
  const [article_about_content, setArticleAboutContent] = useState('');
  const [article_about_page, setArticleAboutPage] = useState('');
  const [article_support_study_content, setArticleSupportStudyContent] =
    useState('');
  const [article_support_study_page, setArticleSupportStudyPage] = useState('');
  const [
    article_does_not_support_study_content,
    setArticleDoesNotSupportStudyContent,
  ] = useState('');
  const [needed_support_study_content, setNeededSupportStudyContent] =
    useState('');
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([
    categories[1],
  ]);

  const [subthemeSelections, setSubthemeSelections] =
    useState<Subtheme[]>(/* Initial value */);
  const [selectedSubthemes, setSelectedSubthemes] = useState<string[]>([]);

  const [authorPodColor, setAuthorPodColor] = useState<string>('');
  const [articleSupportStudyColor, setArticleSupportStudyColor] =
    useState<string>('');
  const [articleDoesNotSupportStudyColor, setArticleDoesNotSupportStudyColor] =
    useState<string>('');
  const [neededSupportStudyColor, setNeededSupportStudyColor] =
    useState<string>('');
  useEffect(() => {
    if (!data) return;

    if (data.status === 'success') {
      setSubthemeSelections(data.data.subthemes);
      console.log('---subtheme selections');
      console.log(subthemeSelections);
      console.log('---subtheme selections');

      setAuthorPodColor(data.data.journal_color.author_pod_color);
      setArticleSupportStudyColor(
        data.data.journal_color.article_support_study_color,
      );
      setArticleDoesNotSupportStudyColor(
        data.data.journal_color.article_dontsupport_study_color,
      );
      setNeededSupportStudyColor(data.data.journal_color.your_pod_color);

      const formValues = {
        article_title: data.data.journal.article_title,
        authors: data.data.journal.author,
        journal_name: data.data.journal.journal_name,
        location: data.data.journal.location,
        doi: data.data.journal.doi,
        year: data.data.journal.year,
        volume: data.data.journal.volume,
        issue: data.data.journal.issue,
        pages: data.data.journal.page,
        step06: data.data.journal.step06,
        article_about_content: data.data.journal.article_about.content,
        article_about_page: data.data.journal.article_about.page,
        article_support_study_content:
          data.data.journal.article_support_study.content,
        article_support_study_page:
          data.data.journal.article_support_study.page,
        article_does_not_support_study_content:
          data.data.journal.article_does_not_support_study.content,
        needed_support_study_content:
          data.data.journal.needed_support_study.content,
      };
      // set the formik values here
      //data.journal
      //data.data.journal.article_title
      setArticleTitle(data.data.journal.article_title);
      setAuthors(data.data.journal.author);
      setJournalName(data.data.journal.journal_name);
      setLocation(data.data.journal.location);
      setDoi(data.data.journal.doi);
      setYear(data.data.journal.year);
      setVolume(data.data.journal.volume);
      setIssue(data.data.journal.issue);
      setPages(data.data.journal.page);
      setStep06(data.data.journal.step06);
      setArticleAboutContent(data.data.journal.article_about.content);
      setArticleAboutPage(data.data.journal.article_about.page);
      setArticleSupportStudyContent(
        data.data.journal.article_support_study.content,
      );
      setArticleSupportStudyPage(data.data.journal.article_support_study.page);
      setArticleDoesNotSupportStudyContent(
        data.data.journal.article_does_not_support_study.content,
      );
      setNeededSupportStudyContent(
        data.data.journal.needed_support_study.content,
      );
      formik.resetForm({ values: formValues });
    }
  }, [data]);

  const onSubthemeChange = (subthemeKey: string) => {
    setSelectedSubthemes((prevSelected) => {
      if (prevSelected.includes(subthemeKey)) {
        return prevSelected.filter((key) => key !== subthemeKey);
      } else {
        return [...prevSelected, subthemeKey];
      }
    });
  };

  //load state from props here use super

  console.log('--- journalId --- ' + journalId);
  console.log('--- projectId --- ' + projectId);
  console.log('--- userId --- ' + userId);

  console.log(
    '-------------- data fetch journal in journal detail component --------------------------',
  );
  console.log(data);
  console.log(
    '-------------- data fetch journal in journal detail component --------------------------',
  );
  //set userId here
  const onCategoryChange = (e: CheckboxChangeEvent) => {
    let _selectedCategories = [...selectedCategories];

    if (e.checked) _selectedCategories.push(e.value);
    else
      _selectedCategories = _selectedCategories.filter(
        (category) => category.key !== e.value.key,
      );

    setSelectedCategories(_selectedCategories);
  };
  const toast = useRef(null);
  const key = 'step06';
  const callVideo = (e: any) => {
    //call video here use userId
    //const video = axios.get()
    //prevent default
    //
    e.preventDefault();
    console.log('callVideo', userId);
    setModalVideoVisible(true);
  };
  const retrieveMetadata = () => {};
  const formik = useFormik({
    initialValues: {
      article_title: article_title,
      authors: authors,
      journal_name: journal_name,
      location: location,
      doi: doi,
      year: year,
      volume: volume,
      issue: issue,
      pages: pages,
      step06: step06,
      article_about_content: article_about_content,
      article_about_page: article_about_page,
      article_support_study_content: article_support_study_content,
      article_support_study_page: article_support_study_page,
      article_does_not_support_study_content:
        article_does_not_support_study_content,
      needed_support_study_content: needed_support_study_content,
    },
    validate: (values) => {
      const errors: any = {};
      // Add validation logic here

      //doi is optional but if has value need to check if doi exists
      if (values.doi && values.doi !== '') {
        let existsDoi: any;
        //1 check if doi exists
        existsDoi = checkDOI(values.doi);
        console.log('exists ==============', existsDoi);
        if (!existsDoi) {
          errors.value = 'DOI does not exist';
        }
      }

      //authors is required
      if (!values.authors) {
        errors.authors = 'Authors Name Required';
      }

      // Authors name can only be separated by commas
      if (values.authors) {
        const authorsArray = values.authors
          .split(',')
          .map((author) => author.trim());
        const invalidAuthors = authorsArray.filter(
          (author) => !author.match(/^[a-zA-Z\s]+$/),
        );

        if (invalidAuthors.length > 0) {
          errors.authors =
            'Authors Name Cannot be separated by characters other than comma';
        }
      }
      //article_title is required
      if (!values.article_title) {
        errors.article_title = 'Article Title Required';
      }

      //year is required
      if (!values.year) {
        errors.year = 'Year Required';
      }

      //validate year is number format YYYY
      if (values.year) {
        const year = values.year;
        if (!year.match(/^\d{4}$/)) {
          errors.year = 'Year must be in YYYY format';
        }
      }

      // YEAR must be between - the year internet existed and current year
      if (values.year) {
        const year = Number(values.year);
        const currentYear = new Date().getFullYear();
        if (year < 1990 || year > currentYear) {
          errors.year = 'Year must be between 1990 and current year';
        }
      }

      // Add other validation rules as needed
      return errors;
    },
    onSubmit: (values) => {
      (toast.current as Toast | null)?.show({
        severity: 'success',
        summary: 'Form Submitted',
        detail: 'Data Submitted',
      });
      formik.resetForm();
    },
  });
  const checkDOI = async (doi: string): Promise<boolean> => {
    const url = `https://doi.org/${doi}`;

    try {
      const response = await fetch(url, { method: 'HEAD' });

      console.log('----------- status --------------');
      console.log(response.status);
      console.log('----------- status --------------');

      //if fetch failed return false
      if (!response.ok) {
        return false;
      }
      //if redirect return false
      if (response.redirected) {
        return false;
      }

      if (response.status === 404) {
        return false;
      } else if (response.status === 200) {
        return true;
      }
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  };
  const isFormFieldInvalid = (name: any) =>
    !!(
      formik.touched[name as keyof typeof formik.touched] &&
      formik.errors[name as keyof typeof formik.errors]
    );

  const getFormErrorMessage = (name: any) => {
    return isFormFieldInvalid(name) ? (
      <small className='p-error'>{formik.errors[name]}</small>
    ) : null;
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} className='flex flex-column gap-2'>
        <Toast ref={toast} />
        <Dialog
          header='Header'
          visible={modalVideoVisible}
          style={{ width: '50vw' }}
          onHide={() => setModalVideoVisible(false)}
        >
          <p className='m-0'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Dialog>
        {/* Repeat the following pattern for each field */}

        {/** button set start */}
        <div className='card flex flex-wrap gap-3'>
          <Button
            label='Video'
            severity='info'
            icon='pi pi-video'
            onClick={callVideo}
          />
          <Button label='Success' severity='success' />
          <Button label='Info' severity='info' />
        </div>
        {/** button set end */}
        <span className='p-float-label'>
          <InputText
            id='doi'
            name='doi'
            value={formik.values.doi}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={classNames({
              'p-invalid': isFormFieldInvalid('doi'),
            })}
          />
          <label htmlFor='doi'>DOI</label>
        </span>
        <Button
          label='Retrieve Metadata'
          severity='info'
          onClick={retrieveMetadata}
        />

        <div className='flex flex-column gap-2'>
          <label htmlFor='authors'>Authors</label>
          <InputText
            id='authors'
            aria-describedby='authors-help'
            value={formik.values.authors}
            onBlur={formik.handleBlur}
            onChange={(e) => {
              formik.setFieldValue('authors', e.target.value);
            }}
            className={classNames({
              'p-invalid': isFormFieldInvalid('article_title'),
            })}
          />
          {getFormErrorMessage('authors')}

          <small id='username-help'>Enter article authors.</small>
        </div>

        <div className='flex flex-column gap-2'>
          <label htmlFor='article_title'>Article Title</label>
          <InputText
            id='article_title'
            aria-describedby='article_title-help'
            value={formik.values.article_title}
            onBlur={formik.handleBlur}
            onChange={(e) => {
              formik.setFieldValue('article_title', e.target.value);
            }}
            className={classNames({
              'p-invalid': isFormFieldInvalid('article_title'),
            })}
          />
          {getFormErrorMessage('article_title')}

          <small id='username-help'>Enter article title.</small>
        </div>

        <div className='flex flex-column gap-2'>
          <label htmlFor='year'>Article Published Year</label>
          <InputText
            id='year'
            aria-describedby='year-help'
            value={formik.values.year}
            onBlur={formik.handleBlur}
            onChange={(e) => {
              formik.setFieldValue('year', e.target.value);
            }}
            className={classNames({ 'p-invalid': isFormFieldInvalid('year') })}
          />
          {getFormErrorMessage('year')}

          <small id='year-help'>Enter article published year.</small>
        </div>

        <div className='flex flex-column gap-2'>
          <label htmlFor='journal_name'>Journal Name</label>
          <InputText
            id='journal_name'
            aria-describedby='journal_name-help'
            value={formik.values.journal_name}
            onBlur={formik.handleBlur}
            onChange={(e) => {
              formik.setFieldValue('journal_name', e.target.value);
            }}
            className={classNames({
              'p-invalid': isFormFieldInvalid('journal_name'),
            })}
          />
          {getFormErrorMessage('journal_name')}

          <small id='year-help'>Enter Journal Name.</small>
        </div>

        <div className='flex flex-column gap-2'>
          <label htmlFor='location'>Journal location</label>
          <InputText
            id='location'
            aria-describedby='location-help'
            value={formik.values.location}
            onBlur={formik.handleBlur}
            onChange={(e) => {
              formik.setFieldValue('location', e.target.value);
            }}
            className={classNames({
              'p-invalid': isFormFieldInvalid('location'),
            })}
          />
          {getFormErrorMessage('location')}

          <small id='year-help'>Enter Journal Location.</small>
        </div>

        <div className='flex flex-column gap-2'>
          <label htmlFor='volume'>Volume</label>
          <InputText
            id='volume'
            aria-describedby='volume-help'
            value={formik.values.volume}
            onBlur={formik.handleBlur}
            onChange={(e) => {
              formik.setFieldValue('volume', e.target.value);
            }}
            className={classNames({
              'p-invalid': isFormFieldInvalid('volume'),
            })}
          />
          {getFormErrorMessage('volume')}

          <small id='volume-help'>Enter Journal Volume.</small>
        </div>

        <div className='flex flex-column gap-2'>
          <label htmlFor='issue'>Issue</label>
          <InputText
            id='issue'
            aria-describedby='issue-help'
            value={formik.values.issue}
            onBlur={formik.handleBlur}
            onChange={(e) => {
              formik.setFieldValue('issue', e.target.value);
            }}
            className={classNames({ 'p-invalid': isFormFieldInvalid('issue') })}
          />
          {getFormErrorMessage('issue')}

          <small id='issue-help'>Enter Journal Issue.</small>
        </div>

        <div className='flex flex-column gap-2'>
          <label htmlFor='pages'>Pages</label>
          <InputText
            id='pages'
            aria-describedby='issue-pages'
            value={formik.values.pages}
            onBlur={formik.handleBlur}
            onChange={(e) => {
              formik.setFieldValue('pages', e.target.value);
            }}
            className={classNames({ 'p-invalid': isFormFieldInvalid('pages') })}
          />
          {getFormErrorMessage('pages')}

          <small id='issue-help'>Enter Journal Pages.</small>
        </div>
        <div className='card flex flex-wrap justify-content-left gap-4'>
          <Button label='Insert Template' severity='info' />
        </div>

        <Splitter style={{ height: '600px' }}>
          <SplitterPanel className='flex flex-column' size={60} minSize={60}>
            <label htmlFor='description'>
              What is the article about and author's point of departure ?
            </label>

            <InputTextarea
              inputid='article_about_content'
              name='article_about_content'
              rows={4}
              cols={30}
              style={{ color: authorPodColor, borderColor: authorPodColor }}
              className={classNames({
                'p-invalid': isFormFieldInvalid('article_about_content'),
              })}
              value={formik.values.article_about_content}
              onChange={(e) => {
                formik.setFieldValue('article_about_content', e.target.value);
              }}
            />
            {getFormErrorMessage('article_about_content')}
            <label htmlFor='description'>
              How the article support your study ?
            </label>

            <InputTextarea
              inputid='article_support_study_content'
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
            <label htmlFor='description'>
              How the article does not support your study ?
            </label>
            <InputTextarea
              inputid='article_does_not_support_study_content'
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
            <label htmlFor='description'>
              What else is needed to support your study ? (Your POD)
            </label>
            <InputTextarea
              inputid='needed_support_study_content'
              name='needed_support_study_content'
              rows={4}
              cols={30}
              style={{
                color: neededSupportStudyColor,
                borderColor: neededSupportStudyColor,
              }}
              className={classNames({
                'p-invalid': isFormFieldInvalid('needed_support_study_content'),
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
            <Card>
              {Object.entries(subthemeSelections).map(([mainKey, items]) => (
                <div key={mainKey}>
                  <h3>{mainKey}</h3>
                  {Object.entries(items).map(([key, label]) => (
                    <div key={key} className='p-field-checkbox'>
                      <Checkbox
                        inputId={key}
                        onChange={() => handleCheckboxChange(mainKey, key)}
                        checked={!!checkedKeys[mainKey]?.[key]}
                      />
                      <label htmlFor={key}>{label}</label>
                    </div>
                  ))}
                </div>
              ))}
              {categories.map((category: any) => {
                return (
                  <div key={category.key} className='flex align-items-center'>
                    <Checkbox
                      inputId={category.key}
                      name='category'
                      value={category}
                      onChange={onCategoryChange}
                      checked={selectedCategories.some(
                        (item) => item.key === category.key,
                      )}
                    />
                    <label htmlFor={category.key} className='ml-2'>
                      {category.name}
                    </label>
                  </div>
                );
              })}
            </Card>
          </SplitterPanel>
        </Splitter>

        {getFormErrorMessage('doi')}
        {/* Continue for other fields */}
        <Button type='submit' label='Submit' />
      </form>
    </>
  );
}
