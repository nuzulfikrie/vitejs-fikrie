import { useState } from "react";


const TextInputInModal = ({ initialState, handleTitleChange }: { initialState: string; handleTitleChange: (title: string) => void }) => {
    const [titleField, setTitleField] = useState(initialState);

    const handleChange = (e: { target: { value: React.SetStateAction<string> } }) => {
        setTitleField(e.target.value);
        console.log('-- title --' + titleField);
        handleTitleChange(titleField);
    };

    return (
        <input
            type="text"
            className="form-control"
            placeholder="Title"
            value={titleField}
            disabled={false}
            onChange={handleChange}
        />
    );
};

export default TextInputInModal;
