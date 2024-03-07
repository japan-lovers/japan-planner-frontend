import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import authService from '../services/auth.service';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from '@material-tailwind/react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    authService
      .login(requestBody)
      .then((response) => {
        // Request to the server's endpoint `/auth/login` returns a response
        // with the JWT string ->  response.data.authToken
        console.log('JWT token', response.data.authToken);

        storeToken(response.data.authToken);

        authenticateUser();
        navigate('/');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    // <div className="flex flex-col">
    //   <h1>Login</h1>

    //   <form onSubmit={handleLoginSubmit} className="flex flex-col">
    //     <label>Email:</label>
    //     <input
    //       type="email"
    //       name="email"
    //       placeholder="Email"
    //       value={email}
    //       onChange={handleEmail}
    //     />

    //     <label>Password:</label>
    //     <input
    //       type="password"
    //       name="password"
    //       placeholder="Password"
    //       value={password}
    //       onChange={handlePassword}
    //     />

    //     <button type="submit">Login</button>
    //   </form>
    //   {errorMessage && <p className="error-message">{errorMessage}</p>}

    //   <p>Don't have an account yet?</p>
    //   <Link to={"/signup"}> Sign Up</Link>
    // </div>
    <div className="flex justify-center items-center mt-20">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign In
        </Typography>

        <form
          onSubmit={handleLoginSubmit}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              value={email}
              onChange={handleEmail}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              value={password}
              onChange={handlePassword}
            />
          </div>

          <Button type="submit" className="mt-6" fullWidth>
            sign In
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account yet ?{' '}
            <Link to="/signup">
              <span className="font-medium text-gray-900">Sign Up</span>
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}

export default Login;
