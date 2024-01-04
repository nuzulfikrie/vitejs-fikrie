import { useState } from "react";

const TextInputInModal = ({
  initialState,
  handleTitleChange,
}: {
  initialState: string;
  handleTitleChange: (title: string) => void;
}) => {
  const [titleField, setTitleField] = useState(initialState);

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTitleField(e.target.value);
    console.log("-- title --" + titleField);
    handleTitleChange(titleField);
  };

  return (
    <>
      <div className="flex flex-column gap-2">
        <label htmlFor="Title">Title</label>
              <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  value={titleField}
                  disabled={false}
                  onChange={handleChange}
              />
        <small id="username-help">
          Edit the title of the item. This will be displayed in the course
        </small>
      </div>

    </>
  );
};

export default TextInputInModal;
