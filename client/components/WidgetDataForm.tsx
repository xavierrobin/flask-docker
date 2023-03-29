'use client'
import { FunctionComponent, useState } from "react";
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import { Button, ModalFooter } from 'reactstrap';

interface Values {
  content: string;
}

const WidgetDataForm: FunctionComponent = (props: any) => {
    const [error, setError] = useState(null);
    const router = useRouter();

    return (
      <div>
      <Formik
        initialValues={{
          content: ''
        }}

        onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
            try {
              await fetch("http://localhost:8000/widget_data", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  content: values.content,
                  widget_id: props.widget_id,
                }),
                cache: 'no-store'
              });
              setStatus({
                isValid: true,
                msg: `Status successfully updated.`,
              });
              // close the modal before redirecting to homepage
              props.modalToggle(false)
              router.push("/");
            } catch (error) {
              console.log(error);
              setStatus({
                isValid: false,
                msg: `${error}`,
              });
              // setErrors(error.fields);
            }
            setSubmitting(false);
          }}
      >
                  {({
            setFieldValue,
            setFieldTouched,
            values,
            errors,
            touched,
          }) => (
        <Form className="form-group mb_3">
        <div className="form-group">
          <label className="text-secondary fw-medium mb-2 fs-4" htmlFor="content">Status</label>
          <Field
            id="content"
            name="content"
            placeholder="Provide status here."
            className="form-control form-control-lg mb-2"
            as="textarea"
          />
        </div>
        
        {values && values.content && <>
        <p className="text-secondary fw-medium mb-2 fs-4">Preview</p>
        <p className="bg-lvl2 p-3">{values.content}</p>
        </>}

        <ModalFooter className="ps-0 pe-0">
          <button className="btn btn-success" type="submit">Send</button>
          
        </ModalFooter>

        </Form>
          )}
      </Formik>
      </div>
  );
};

export default WidgetDataForm;