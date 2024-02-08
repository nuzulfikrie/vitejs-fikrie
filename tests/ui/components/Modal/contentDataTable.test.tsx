import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ContentDataTable from '../../../../src/ui/components/Modal/ContentDataTable';
import React from 'react';

describe('ContentDataTable', () => {
  const journalMetadata = [
    { category: 'Category 1', data: 'Data 1' },
    { category: 'Category 2', data: 'Data 2' },
    { category: 'Category 3', data: 'Data 3' },
  ];
  const setChooseMetadata = vi.fn();
  const setIsConfirmDialogVisible = vi.fn();
  const setPanelALoading = vi.fn();

  beforeEach(() => {
    render(
      <ContentDataTable
        journalMetadata={journalMetadata}
        setChooseMetadata={setChooseMetadata}
        setIsConfirmDialogVisible={setIsConfirmDialogVisible}
        setPanelALoading={setPanelALoading}
      />,
    );
  });

  it('renders the journal details', () => {
    const categoryHeaders = screen.getAllByText('Category');
    const dataHeaders = screen.getAllByText('Data');

    expect(categoryHeaders.length).toBe(1);
    expect(dataHeaders.length).toBe(1);

    const categoryCells = screen.getAllByText(/Category \d/);
    const dataCells = screen.getAllByText(/Data \d/);

    expect(categoryCells.length).toBe(journalMetadata.length);
    expect(dataCells.length).toBe(journalMetadata.length);
  });

  it('calls the reloadContentForm function when the button is clicked', async () => {
    const button = screen.getByLabelText('Use Metadata');
    fireEvent.click(button);

    expect(setIsConfirmDialogVisible).toHaveBeenCalledWith(false);
    expect(setPanelALoading).toHaveBeenCalledWith(true);

    vi.useFakeTimers();
    vi.runAllTimers();

    expect(setChooseMetadata).toHaveBeenCalledWith(true);
    expect(setPanelALoading).toHaveBeenCalledWith(false);
  });
});
