import { Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

const LoginForm = () => {
  const [login, { isSuccess, error, data }] = useLoginMutation();
  const [recaptchValue, setRecaptchaValue] = useState('');
  const captchRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onCaptchaChange = value => {
    setRecaptchaValue(value);
  }
  const handleSubmit = e => {
    e.preventDefault();
    captchRef.current.reset();
    login({ email, password, recaptchValue });
  }
  useEffect(() => {
    try {
      if (error) {
        if ('data' in error) {
          toast.error(error?.data?.message);
          // console.log("Error:", error?.data?.message);
        }
      }
      if (isSuccess) {
        toast.success("Login Successfully");
        // console.log("Success:", data);
        setRecaptchaValue('');
        setEmail('');
        setPassword('');
        return;
      }
    } catch (error) {
      // toast.error("Unexpected error");
      console.error("Unexpected error:", error);
    } finally {
      captchRef.current.reset();
    }
  }, [error, isSuccess, data]);
  return (
    <div className='flex justify-center items-center h-screen w-screen bg-[#f0f2f5]'>
      <Helmet>
        <title> Login | {import.meta.env.VITE_APP_COMPANY_NAME}</title>
        <link rel="canonical" href="" />
      </Helmet>
      <div className='h-auto w-[80%] lg:w-[40%] md:w-[60%] bg-white rounded-lg shadow-lg'>
        <Typography variant="h5" component="h2" className='pt-4 text-center font-bold'>
          Login
        </Typography>
        <form className='p-8 flex flex-col gap-8' onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic-2"
            label="Email"
            variant="outlined"
            fullWidth
            className='mb-4'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="outlined-basic-3"
            label="Password"
            variant="outlined"
            autoComplete='false'
            type="password"
            fullWidth
            className='mb-4'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_APP_RECAPTCHA_KEY}
            onChange={onCaptchaChange}
            ref={captchRef}
          />
          <Button variant="contained" type='submit' style={{ backgroundColor: "#48bb78" }} fullWidth>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
