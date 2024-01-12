import React, { useRef } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { Dropdown } from 'primereact/dropdown'; // If needed for provider selection

export default function JournalDetailsComponent() {
  const toast = useRef(null);

  const formik = useFormik({
    initialValues: {
      article_title: '',
      authors: '',
      journal_name: '',
      doi: '',
      year: '',
      volume: '',
      issue: '',
      pages: '',
      step06: [],
      article_about_content: '',
      article_about_page: '',
      article_support_study_content: '',
      article_support_study_page: '',
      article_does_not_support_study_content: '',
      needed_support_study_content: '',
    },
    validate: (values) => {
      const errors: any = {};
      // Add validation logic here
      if (!values.article_title) {
        errors.article_title = 'Article title is required.';
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
    <div className='card flex justify-content-center'>
      <form onSubmit={formik.handleSubmit} className='flex flex-column gap-2'>
        <Toast ref={toast} />
        {/* Repeat the following pattern for each field */}
        <span className='p-float-label'>
          <InputText
            id='article_title'
            name='article_title'
            value={formik.values.article_title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={classNames({
              'p-invalid': isFormFieldInvalid('article_title'),
            })}
          />
          <label htmlFor='article_title'>Article Title</label>
        </span>
        {getFormErrorMessage('article_title')}
        {/* Continue for other fields */}
        <Button type='submit' label='Submit' />
      </form>
    </div>
  );
}
