import { FormEvent, useState } from 'react';
import signIn from '../../assets/sign-in-background.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
interface User {
  email: string;
}

interface SignInResposne {
  user: User;
}

export default function SignIn() {
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const [loginErrors, setLoginErrors] = useState<{ [key: string]: string }>({});
  const handleSignInSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const emailInput = form.elements.namedItem("email") as HTMLFormElement;
    const passwordInput = form.elements.namedItem("password") as HTMLFormElement;

    const email = emailInput.value;
    const password = passwordInput.value;
    const errors: { [key: string]: string } = {};
    if (!email || !emailRegex.test(email)) {
      errors.email = "Valid email is required.";
    }

    if (!password) {
      errors.password =
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.";
    }

    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      return;
    }

    try {
      const response = await axios.post<SignInResposne>("http://localhost:8080/signin", {
        email,
        password,
      });
      const responseEmail = response.data.user.email;
      console.log("Login successful:", response.data);
      navigate("/Dashboard", { state: { email: responseEmail } });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Login failed:", error.response?.data);
      } else {
        console.error("An unexpected error occurred during login:", error);
      }
    }

  }
  return (
    <>
      <div className="min-h-screen flex justify-center items-center "
        style={{ backgroundImage: `url(${signIn})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="  pt-8 w-full max-w-lg">
          <form className="bg-white shadow-lg rounded-xl px-8 pt-6 pb-8 mb-4" onSubmit={handleSignInSubmit}>
            <h1 className="text-3xl font-bold text-center m-10 leading-9 tracking-tight"> Sign in to your account </h1>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                className="bg-gray-50 appearance-none border-2 rounded-lg w-full py-2
                  px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                name='email'
                placeholder="name@company.com"
                required
              />
              {loginErrors.email && (
                <p className='text-red-500'>{loginErrors.email}</p>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
              <input type="password" className="bg-gray-50 appearance-none border-2 rounded-lg w-full py-2
                px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password"
                name='password' placeholder="**********" required />
              {loginErrors.password && (
                <p className='text-red-500'> {loginErrors.password}</p>
              )}
              <button className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold mt-10 py-2 px-4
              rounded-lg focus:outline-none focus:shadow-outline" type="submit">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

