import { useState , useContext} from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import logo from '../../src/components/assets/hblablogo.png'; // Import your logo image path
import axios from 'axios';

import logoLight from '../../src/components/assets/lightlogo.png';  // Light mode logo
import logoDark from '../../src/components/assets/darklogo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [SuccessMessage, setSuccessMessage] = useState('');
  const { setAuthData } = useContext(AuthContext); // Access auth context
  const [showLoader, setShowLoader] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowButton(false); // Hide the button
    setShowLoader(true);
    // Simulating your login logic with API call
    const loginData = {
      email: email,
      password: password
    };

    try {
        const response = await axios.post('http://localhost:4700/api/users/login', {
          email,
          password,
        });
  
        const { token, user } = response.data; // Extract token and user info from the response
      if (response) {
        const role = user.role; // Extract role from API response
        // const authToken = data.token;
        // const lastName = data.email;
        
        // Save token and user info in context or localStorage
      setAuthData({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });

        setShowButton(true);
        setShowLoader(false);

        setShowSuccessMessage(true);
        setShowFailureMessage(false);
        setSuccessMessage(response.message || 'You have logedin!');

        //navigate('/admin');

        if (role === 'user') {
          navigate('/user'); // Use navigate instead of history.push for redirection
        } else if (role === 'admin') {
          navigate('/admin'); // Use navigate instead of history.push for redirection
        }else if(role === ''){
          navigate('/admin')
        }
      }
      else {
        // Handle error response from API
       console.error('Failed to login:', response.statusText);
        setShowFailureMessage(true);
        setShowSuccessMessage(false);
        setErrorMessage(response.message || 'Failed to Login');
        setShowButton(true);
      setShowLoader(false);
      }
      
    } catch (error) {
      console.error('Error:', error);
      setShowFailureMessage(true);
        setShowSuccessMessage(false);
        setErrorMessage('Form submission error:', error);
        setShowButton(true);
        setShowLoader(false);
    }
  };
  const closeSuccessMessage = () => {
    setShowSuccessMessage(false);
  };

  const closeFailureMessage = () => {
    setShowFailureMessage(false);
  };
  return (
    <>
      <main className="relative flex justify-center items-center h-screen">
        <section className="">
          <div className=" flex">
            <div className="md:flex  grid w-full grid-cols-1 md:grid-cols-2 ">
              <div className="col-span-1 w-full md:col-span-2 md:col-start-2 flex flex-col mx-auto">
                <div className="bg-white border-2 mr-4 border-primary dark:bg-slate-800 rounded-lg p-4">
                  <div className="relative">
                    <i
                      className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 absolute top-0 end-0 md:hidden"
                      aria-hidden="true"
                      id="iconSidenav"
                    ></i>
                    <Link className="navbar-brand flex m-0" to="/">
                    <img
                src={logoLight}
                className="h-14 block dark:hidden"
                alt="light_mode_logo"
              />
              <img
                src={logoDark}
                className="h-14 hidden dark:block"
                alt="dark_mode_logo"
              />
                      
                    </Link>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-semibold text-xl text-primary">Sign In</h4>
                    <p className="mb-2">Enter your Username and password </p>
                  </div>
     {/* Success message */}
     {showSuccessMessage && (
       <div className="border-dotted px-4 py-3 border-2 border-sky-500 text-sm text-primary bg-green-100 text-center flex justify-between" >
          <p className='items-center flex'><i className='mr-2'><Icon icon="dashicons:saved" /></i>{SuccessMessage}</p>
          <button onClick={closeSuccessMessage}><Icon icon="bytesize:close" /></button>
        </div>
      )}

      {/* Failure message */}
      {showFailureMessage && (
        <div className="border-dotted px-4 py-3 border-2 border-red-500 text-sm text-red-500 text-center flex justify-between" >
          <p className='items-center flex'><i className='mr-2'><Icon icon="bx:error-alt" /></i>{errorMessage}</p>
          <button onClick={closeFailureMessage}><Icon icon="bytesize:close" /></button>
        </div>
      )}
                  <div className="mt-4">
                  <form role="form" onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          type="text"
          name="login_identifier"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary dark:text-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          placeholder="Username or Email"
          aria-label="Username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          name="password"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:text-primary focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          placeholder="password"
          aria-label="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            className="form-checkbox border-gray-300"
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
          />
          <span className="ml-2">Remember me</span>
        </label>
      </div>
      <div className="text-center">
       

        {showLoader && (
        <div className="w-full loadermt-4 px-4 py-3 bg-primary text-white rounded-lg hover:bg-white hover:text-primary border border-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50 items-center flex"><Icon icon="svg-spasswordners:90-ring-with-bg" />Signing in...</div>
      )}

      {/* Submit button */}
      {showButton && (
        <button
          type="submit"
          className="w-full text-center mt-4 px-4 py-3 bg-primary text-white rounded-lg hover:bg-white hover:text-primary border border-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50 items-center flex"
          onClick={handleSubmit}
        >
          <i className="mr-2">
          <Icon icon="solar:user-line-duotone" />
          </i>
          Sign in
        </button>
      )}
      </div>
    </form>
                  </div>

                  <div className="mt-4 text-center">
                    <p className="text-sm">
                      Don&apos;t have an account?{' '}
                      <Link to="/register" className="text-primary font-semibold">
                        Create Account
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:flex  grid w-full grid-cols-1 md:grid-cols-2 ">
              <div className=" text-center justify-center flex-col">
                <div className="bg-gradient-to-br from-primary to-primary-light dark:bg-slate-800 h-full  p-7 rounded-lg flex flex-col justify-center overflow-hidden">
                  <h4 className="text-white font-semibold">Welcome to HIGH-TECHNOLOGY BUILDER LAB Ltd<br></br> (HB-LAB)</h4>{' '}
                  <br></br>
                  <p className="text-white">
                   Embark on a transformative journey with Hb-Lab, <br></br>where
                    innovation meets expertise to shape the future of your
                     digital endeavors. <br></br>As a trailblazing IT solutions<br></br>
                      provider, we take pride in being the catalyst for your <br></br>
                      success, offering dynamic and cutting-edge services <br></br>
                      that redefine the possibilities in the digital landscape.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
 );
};

export default Login;