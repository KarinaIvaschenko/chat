import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import axios from 'axios';

import { setUser } from '../../../redux/user/slice';
import { openNewUserModal } from '../../../redux/modals/slice';

interface FormValues {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface SignupBlockProps {
  setVerifyModal: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingModal: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const SignupForm: React.FC<SignupBlockProps> = ({
  setVerifyModal,
  setLoadingModal,
  setErrorMessage,
}) => {
  const dispatch = useDispatch();

  const initialValues: FormValues = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  const validateForm = (values: FormValues) => {
    const errors: Partial<FormValues> = {};

    if (!values.name) {
      errors.name = 'Required';
    } else if (!/^[A-Za-z0-9-_.\s]{1,30}$/.test(values.name)) {
      errors.name =
        'You can use letters, digits and symbols "-", "_", "." (up to 30)';
    }

    if (!values.email) {
      errors.email = 'Required';
    } else {
      const emailParts = values.email.split('@');
      const domain = emailParts[1];

      if (
        domain &&
        (domain.startsWith('-') ||
          domain.includes('-.') ||
          domain.endsWith('-'))
      ) {
        errors.email = 'Invalid email address';
      } else if (
        !/^[A-Za-z0-9_.%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if (/\s/.test(values.password)) {
      errors.password = 'Password cannot contain spaces';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    if (!values.passwordConfirm) {
      errors.passwordConfirm = 'Required';
    } else if (/\s/.test(values.passwordConfirm)) {
      errors.password = 'Password cannot contain spaces';
    } else if (values.password !== values.passwordConfirm) {
      errors.passwordConfirm = 'Passwords do not match';
    }

    return errors;
  };


  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      setLoadingModal(true);
      const url = `${process.env.REACT_APP_API_URL}/auth/signUp`;
      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await axios.post(
        url,
        {
          name: values.name,
          email: values.email,
          password: values.password,
          passwordConfirm: values.password,
          "roles": [
            "USER"
          ]
        },
        { headers }
      );

      if (
        response.status === 200 &&
        response.data.message === 'User is not verified'
      ) {
        setErrorMessage('An account is not verified');

        setLoadingModal(false);

        dispatch(setUser({ email: values.email }));
      } else if (
        response.status === 200 &&
        response.data.message === 'User creation error: email must be unique'
      ) {
        setErrorMessage('An account with this email already exists');

        setLoadingModal(false);
      } else if (response.status === 200) {
        const { name, login, token } = response.data;

        setLoadingModal(false);
        setVerifyModal(true);
        dispatch(setUser({ name, email: login, token: token }));
        dispatch(openNewUserModal());
      } else {
        throw new Error('Failed to sign up');
      }
    } catch (error: any) {
      setLoadingModal(false);
      setErrorMessage('Failed to sign up');

      console.error(error.message);
    }

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validateForm}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>
              Your name (how users will see you)
            </label>

            <Field
              type="text"
              id="name"
              name="name"
              style={styles.input}
              maxLength={30}
              placeholder="John Smith"
              defaultValue={values.name}
            />

            <div style={{ color: 'red', fontSize: '12px' }}>
              <ErrorMessage name="name" component="div" />
            </div>
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
              placeholder="name@gmail.com"
              defaultValue={values.email}
            />

            <div style={{ color: 'red', fontSize: '12px' }}>
              <ErrorMessage name="email" component="div" />
            </div>
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
              maxLength={20}
              placeholder="8 characters or more"
            />

            <div style={{ color: 'red', fontSize: '12px' }}>
              <ErrorMessage name="password" component="div" />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="passwordConfirm" style={styles.label}>
              Confirm Password
            </label>
            <Field
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              style={styles.input}
              maxLength={20}
              placeholder="Confirm your password"
            />
            <div style={{ color: 'red', fontSize: '12px' }}>
              <ErrorMessage name="passwordConfirm" component="div" />
            </div>
          </div>

          <button type="submit" className="submitBtn">
            Create account
          </button>
        </Form>
      )}
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
    fontSize: 14,
    fontWeight: 500,
  },
  input: {
    padding: 10,
    fontSize: 16,
    width: '100%',
    borderRadius: 4,
    border: '1px solid #ccc',
  },
};

export default SignupForm;
