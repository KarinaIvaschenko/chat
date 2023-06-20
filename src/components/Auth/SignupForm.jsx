import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { setUser } from '../../redux/user/slice';

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validateForm = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Required';
    }

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    return errors;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(`welcome ${values.name}`);
      setSubmitting(false);
    }, 400);

    navigate('/main');

    dispatch(setUser({ name: values.name, email: values.email }));
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validateForm}
      onSubmit={handleSubmit}
    >
      <Form>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>
            Full name , how users will see you
          </label>
          <Field
            type="text"
            id="name"
            name="name"
            style={styles.input}
            placeholder="John Smith"
          />
          <ErrorMessage name="name" component="div" style={styles.error} />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>
            Email
          </label>
          <Field
            type="email"
            id="email"
            name="email"
            style={styles.input}
            placeholder="name@example.com"
          />
          <ErrorMessage name="email" component="div" style={styles.error} />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>
            Password
          </label>
          <Field
            type="password"
            id="password"
            name="password"
            style={styles.input}
            placeholder="8 characters or more"
          />
          <ErrorMessage name="password" component="div" style={styles.error} />
        </div>

        <button type="submit" style={styles.submitButton}>
          Create account
        </button>
      </Form>
    </Formik>
  );
};

const styles = {
  formGroup: {
    marginBottom: 20,
  },
  label: {
    display: 'block',
    marginBottom: 5,
  },
  error: {
    color: 'red',
  },
  input: {
    padding: 10,
    fontSize: 16,
    width: '100%',
    borderRadius: 4,
    border: '1px solid #ccc',
  },
  submitButton: {
    fontSize: 18,
    width: '100%',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    padding: '10px 20px',
    backgroundColor: '#007bff',
  },
};

export default SignupForm;
