import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import axios from 'axios';

import { SlClose } from 'react-icons/sl';

import { RootState } from '../../../redux/store';
import { google } from '../../../constants/images';

import { setUser } from '../../../redux/user/slice';
import { openNewUserModal } from '../../../redux/modals/slice';

import SignupForm from './SignupForm';

interface SignupBlockProps {
  setSignModal: React.Dispatch<React.SetStateAction<boolean>>;
  setVerifyModal: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignupBlock: React.FC<SignupBlockProps> = ({
  setSignModal,
  setVerifyModal,
  setLoadingModal,
}) => {
  const [errorMessage, setErrorMessage] = useState('');

  const { email } = useSelector((state: RootState) => state.user);

  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const dispatch = useDispatch();

  const closeModal = () => {
    setSignModal(false);
  };
  
  const pisya = 69;
  const handleVerifyModal = async () => {
    setVerifyModal(true);

    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/resendCode/${email}`;
      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await axios.post(url, email, { headers });

      if (response.status === 200) {
        console.log('Code resend successful');
      } else {
        console.log(response);
        throw new Error('Failed to resend code');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signUpViaGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async ({ user }) => {
        try {
          setLoadingModal(true);
          const url = `${process.env.REACT_APP_API_URL}/auth/google/signUp`;
          const headers = {
            'Content-Type': 'application/json',
          };

          const response = await axios.post(
            url,
            {
              name: user.displayName,
              email: user.email,
            },
            { headers }
          );

          if (
            response.status === 200 &&
            response.data.message === 'User is not verified'
          ) {
            setErrorMessage('An account is not verified');
            setLoadingModal(false);
            dispatch(setUser({ email: user.email }));
          } else if (
            response.status === 200 &&
            response.data.message ===
              'User creation error: email must be unique'
          ) {
            setErrorMessage('An account with this email already exists');
            setLoadingModal(false);
          } else if (response.status === 200) {
            const { name, login, token } = response.data;

            setSignModal(false);
            setLoadingModal(false);
            setVerifyModal(true);

            dispatch(setUser({ name, email: login, token: token }));
            dispatch(openNewUserModal());
          } else {
            console.log(response);
            throw new Error('Failed to sign up');
          }
        } catch (error) {
          setLoadingModal(false);
          setErrorMessage('Failed to sign up');
          console.error(error);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="modalBlock">
      <div className="modalContainer">
        <div style={styles.top}>
          <button className="closeBtn" onClick={closeModal}>
            <SlClose />
          </button>

          <h3 style={styles.header}>Create your free account</h3>
        </div>

        <p
          style={{
            color: 'red',
            fontWeight: 500,
            marginBottom: 20,
            fontSize: 18,
          }}
        >
          {errorMessage === 'An account is not verified' ? (
            <span>
              {errorMessage}{' '}
              <span className="reverifyBtn" onClick={() => handleVerifyModal()}>
                Verify email
              </span>
            </span>
          ) : (
            errorMessage
          )}
        </p>

        <SignupForm
          setVerifyModal={setVerifyModal}
          setLoadingModal={setLoadingModal}
          setErrorMessage={setErrorMessage}
        />

        <div style={styles.devider}>
          <span>or</span>
        </div>

        <div className="googleBtn" onClick={signUpViaGoogle}>
          <img src={google} alt="google-icon" />
          <span style={styles.span}>Sign up with Google</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  header: {
    fontSize: 28,
    fontWeight: 600,
    textAlign: 'center' as 'center',
    marginBottom: '1rem',
  },
  top: {
    position: 'relative' as 'relative',
    display: 'flex',
    alignItems: 'flex-start',
  },
  devider: {
    fontSize: 14,
    fontWeight: 500,
    margin: 10,
    textAlign: 'center' as 'center',
  },
  span: {
    paddingLeft: 5,
    fontSize: 20,
    fontWeight: 400,
  },
};

export default SignupBlock;
