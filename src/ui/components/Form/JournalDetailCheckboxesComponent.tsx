import React from 'react';
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox';
import { Card } from 'primereact/card';
interface Subtheme {
  name: string;
  key: string;
}
interface JournalDetailCheckboxesProps {
  // Add your component props here
  subthemeSelections: Subtheme[];
  selected: any[];
  onCategoryChange: (event: CheckboxChangeEvent) => void;
}

const JournalDetailCheckboxesComponent: React.FC<
  JournalDetailCheckboxesProps
> = ({ subthemeSelections, selected, onCategoryChange }) => {
  // Add your component logic here
  return (
    // Add your JSX code here
    <Card>
      {subthemeSelections.map((subtheme, index) => (
        <div key={subtheme.key} className='flex align-items-center'>
          <Checkbox
            id={subtheme.key}
            name='step06'
            value={index} // Use index as value
            onChange={onCategoryChange}
            checked={selected.includes(index)} // Check if index is in 'selected'
          />
          {/* ADD NBSP TO ADD GAP */}
          <span>&nbsp;</span>
          <label htmlFor={subtheme.key}>{subtheme.name}</label>
        </div>
      ))}
    </Card>
  );
};

export default JournalDetailCheckboxesComponent;
