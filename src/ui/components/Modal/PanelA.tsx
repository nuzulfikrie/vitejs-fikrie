import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Skeleton } from 'primereact/skeleton';

interface Provider {
  name: string;
  code: string;
}
interface PanelAProps {
  // Define your props here
  formik: any;
  loadingMetadata: boolean;
  retrieveAbstractData: () => void;
  selectedProvider: Provider | null;
  providerSelection: Provider[];
  confirmDialogMetadata: () => void;
  panelALoading: boolean;
  panelAVisible: boolean;
  getFormErrorMessage: (name: any) => JSX.Element | null;
  isFormFieldInvalid: (fieldName: string) => boolean;
  callVideo: (e: any) => void;
  handleDropDown: (e: DropdownChangeEvent) => void;
  confirmTemplate: () => void;
}

const PanelA: React.FC<PanelAProps> = ({
  formik,
  loadingMetadata,
  retrieveAbstractData,
  selectedProvider,
  providerSelection,
  confirmDialogMetadata,
  panelALoading,
  panelAVisible,
  getFormErrorMessage,
  isFormFieldInvalid,
  callVideo,
  handleDropDown,
  confirmTemplate,
}) => {
  // Destructure props here if needed

  return (
    <>
      <div className='card flex flex-wrap gap-3'>
        <Button
          label='Video'
          severity='info'
          icon='pi pi-video'
          onClick={() => callVideo(event)}
        />
        <Button
          label='Retrieve Abstract'
          icon='pi pi-check'
          loading={loadingMetadata}
          onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            retrieveAbstractData()
          }
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
        <label htmlFor='doi'>DOI</label>{' '}
        <Button
          type='button'
          label='Retrieve Metadata'
          onClick={() => confirmDialogMetadata()}
          severity='danger'
        />
      </span>
      {panelALoading && panelAVisible ? (
        <Skeleton shape='rectangle' width='100%' height='100px' />
      ) : (
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
      )}
      {panelALoading && panelAVisible ? (
        <Skeleton shape='rectangle' width='100%' height='100px' />
      ) : (
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
      )}

      {panelALoading && panelAVisible ? (
        <Skeleton shape='rectangle' width='100%' height='100px' />
      ) : (
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
            className={classNames({
              'p-invalid': isFormFieldInvalid('year'),
            })}
          />
          {getFormErrorMessage('year')}

          <small id='year-help'>Enter article published year.</small>
        </div>
      )}

      {panelALoading && panelAVisible ? (
        <Skeleton shape='rectangle' width='100%' height='100px' />
      ) : (
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
      )}
      {panelALoading && panelAVisible ? (
        <Skeleton shape='rectangle' width='100%' height='100px' />
      ) : (
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
      )}
      {panelALoading && panelAVisible ? (
        <Skeleton shape='rectangle' width='100%' height='100px' />
      ) : (
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
      )}

      {panelALoading && panelAVisible ? (
        <Skeleton shape='rectangle' width='100%' height='100px' />
      ) : (
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
            className={classNames({
              'p-invalid': isFormFieldInvalid('issue'),
            })}
          />
          {getFormErrorMessage('issue')}

          <small id='issue-help'>Enter Journal Issue.</small>
        </div>
      )}

      {panelALoading && panelAVisible ? (
        <Skeleton shape='rectangle' width='100%' height='100px' />
      ) : (
        <div className='flex flex-column gap-2'>
          <label htmlFor='pages'>Pages</label>
          <InputText
            id='pages'
            aria-describedby='issue-pages'
            value={formik.values.page}
            onBlur={formik.handleBlur}
            onChange={(e) => {
              formik.setFieldValue('pages', e.target.value);
            }}
            className={classNames({
              'p-invalid': isFormFieldInvalid('pages'),
            })}
          />
          {getFormErrorMessage('pages')}

          <small id='issue-help'>Enter Journal Pages.</small>
        </div>
      )}
      <div className='card flex flex-wrap justify-content-left gap-4'>
        <Button
          label='Insert Template'
          severity='warning'
          type='button'
          onClick={confirmTemplate}
        />
      </div>
    </>
  );
};

export default PanelA;
