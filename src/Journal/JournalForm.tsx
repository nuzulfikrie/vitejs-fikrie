import { useFormik } from "formik";

export const useJournalForm = (
  initialValues: any,
  onSubmit: any,
  validate: any
) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
    // Optionally, you can also set the form to its initial state on mount
    enableReinitialize: true, // This will reset the form when initialValues change
  });

  // Function to reset the form to its initial values
  const resetForm = () => formik.resetForm();

  // Function to clear the form by setting all values to empty strings or another default state
  const clearForm = () => {
    const clearedValues = Object.keys(formik.values).reduce((acc, key) => {
      acc[key] = ''; // Set each value to an empty string or another suitable default value
      return acc;
    }, {});
    formik.setValues(clearedValues);
  };

  return { formik, loading: formik.isSubmitting, resetForm, clearForm };
};