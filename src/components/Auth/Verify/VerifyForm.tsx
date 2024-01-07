import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { IoIosArrowRoundBack } from 'react-icons/io';

import axios from 'axios';

import { RootState } from '../../../redux/store';

import { setVerified } from '../../../redux/user/slice';
import { openNewUserModal } from '../../../redux/modals/slice';

interface VerifyFormProps {
  setVerifyModal: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

interface FormValues {
  code: string;
}

const VerifyForm: React.FC<VerifyFormProps> = ({
  setVerifyModal,
  setErrorMessage,
}) => {
  const dispatch = useDispatch();

  const { email } = useSelector((state: RootState) => state.user);

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/userVerify`;
      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await axios.post(
        url,
        {
          login: email,
          code: values.code,
        },
        { headers }
      );

      if (
        response.status === 200 &&
        response.data.message ===
          'Something went wrong due to verification, please try again'
      ) {
        setErrorMessage('Wrong verification code');
      } else if (response.status === 200) {
        dispatch(setVerified(true));
        setVerifyModal(false);
        dispatch(openNewUserModal());
      } else {
        throw new Error('Failed to verify');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to verify');
    } finally {
      setSubmitting(false);
    }
  };

  const validateForm = (values: FormValues) => {
    const errors: Partial<FormValues> = {};

    if (!values.code) {
      errors.code = 'Required';
    } else if (!/^\d{6}$/.test(values.code)) {
      errors.code = 'Invalid verification code';
    }

    return errors;
  };

  const initialValues: FormValues = {
    code: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validateForm}
      onSubmit={handleSubmit}
    >
      <Form>
        <div style={{ position: 'relative' }}>
          <label htmlFor="name" style={styles.label}>
            6 digit code
          </label>

          <Field
            style={styles.input}
            type="text"
            name="code"
            maxLength={6}
            placeholder="123456"
          />

          <div style={{ color: 'red', fontSize: '12px' }}>
            <ErrorMessage name="code" component="div" />
          </div>

          <button className="submitBtn verifyBtn" type="submit">
            Verify
          </button>

          <div style={styles.backBtn} onClick={() => setVerifyModal(false)}>
            <IoIosArrowRoundBack size={25} color={'#2c3fe1'} />
            <span style={styles.backText}>Back</span>
          </div>
        </div>
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
  backBtn: {
    cursor: 'pointer',
    position: 'absolute' as 'absolute',
    left: 0,
    top: 90,
  },
  backText: {
    position: 'relative' as 'relative',
    top: -1,
    color: '#2c3fe1',
    fontSize: 16,
    fontWeight: 400,
  },
};

export default VerifyForm;
