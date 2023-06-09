'use client'
import { FunctionComponent, useState } from "react";
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

import { Button, ModalFooter } from 'reactstrap';
import {Tiptap} from './Tiptap.js'
import StarterKit from '@tiptap/starter-kit'
import DOMPurify from 'dompurify';
import {entrypointClient} from '../config/entrypoint';

interface Values {
  content: string;
}

const WidgetDataForm: FunctionComponent = (props: any) => {
    const [error, setError] = useState(null);
    const router = useRouter();
    const pathname = usePathname();

    return (
      <div>
      <Formik
        initialValues={{
          content: ''
        }}

        onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
            try {
              await fetch(`${entrypointClient}/widget_data`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  content: DOMPurify.sanitize(values.content),
                  widget_id: props.widget_id,
                  client_id: props.client_id,
                }),
                cache: 'no-store'
              });
              setStatus({
                isValid: true,
                msg: `Status successfully updated.`,
              });
              router.push(pathname);
              // close the modal before redirecting to homepage
              props.modalToggle(false)
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
            name="content"
            as={Tiptap}
            extensions={[StarterKit]} 
            id="content"
            placeholder="Provide status here."
            className="form-control form-control-lg mb-2"
          />
        </div>

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