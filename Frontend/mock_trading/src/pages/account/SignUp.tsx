import { useNavigate } from 'react-router-dom';
import signUp from '../../assets/sign-up-background.jpg';
import { FormEvent, useState } from 'react';
import axios from 'axios';



interface SignUpResponse {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const navigate = useNavigate();
  const nameRegex = /^[a-zA-Z]+$/;
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [signUpErrors, setSignInErrors] = useState<{ [key: string]: string }>({});

  const handleSignUpSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const firstNameInput = form.elements.namedItem("firstName") as HTMLFormElement;
    const lastNameInput = form.elements.namedItem("lastName") as HTMLFormElement;
    const usernameInput = form.elements.namedItem("username") as HTMLFormElement;
    const emailInput = form.elements.namedItem("email") as HTMLFormElement;
    const passwordInput = form.elements.namedItem("password") as HTMLFormElement;

    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;
    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const errors: { [key: string]: string } = {};

    if (!firstName || !nameRegex.test(firstName)) {
      errors.firstName = "Valid First Name is required";
    }
    if (!lastName || !nameRegex.test(lastName)) {
      errors.lastName = "Valid Last Name is required";
    }
    if (!username || !usernameRegex.test(username)) {
      errors.username = "Valid Username is required";
    }
    if (!email || !emailRegex.test(email)) {
      errors.email = "Valid Email is required";
    }
    if (!password) {
      errors.password = "Valid Password is required";
    }
    if (Object.keys(errors).length > 0) {
      setSignInErrors(errors);
      return;
    }

    try {
      const response = await axios.post<SignUpResponse>("http://localhost:8080/signup", {
        firstName,
        lastName,
        username,
        email,
        password,
      });
      const responseEmail = response.data.email;
      navigate("/Dashboard", { state: { email: responseEmail } });
      console.log("Sign Up Successful: ", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Sign Up failed:", error.response?.data);
      } else {
        console.error("An unexpected error occurred during Sign Up:", error);
      }
    }
  }

  return (
    <>
      <div className="min-h-screen flex justify-center items-center "
        style={{ backgroundImage: `url(${signUp})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="  pt-8 w-full max-w-lg">
          <form className="bg-white shadow-lg rounded-xl px-8 pt-6 pb-8 mb-4" onSubmit={handleSignUpSubmit}>

            <h1 className="text-3xl font-bold text-center m-10 leading-9 tracking-tight"> Sign in to your account </h1>
            <div className='mb-6 columns-2'>
              <label htmlFor='email' className='block mb-2 text-sm font-bold text-gray-900 dark:text-white'>First Name</label>
              <input type='text' name="firstName" id="firstName" className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm
                      rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:bordrr-gray-600
                      dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='John'
              />
              {signUpErrors.firstName && (
                <p className='text-red-500'> {signUpErrors.firstName}</p>
              )}
              <label className='block mb-2 text-sm font-bold text-gray-900 dark:text-white'> Last Name </label>
              <input type='text' name="lastName" id="lastName" className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm
                      rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:bordrr-gray-600
                      dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Doe'
              />
              {signUpErrors.lastName && (
                <p className='text-red-500'> {signUpErrors.lastName}</p>
              )}
            </div>
            <div className='mb-6'>
              <label className='block mb-2 text-sm font-bold text-gray-900 dark:text-white'> Username </label>
              <input type='text' name="username" id="username" className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm
                      rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:bordrr-gray-600
                      dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='johnDoe'
              />
              {signUpErrors.username && (
                <p className='text-red-500'> {signUpErrors.username}</p>
              )}
            </div>
            <div className='mb-6'>
              <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Your email</label>
              <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm
                      rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:bordrr-gray-600
                      dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
              {signUpErrors.email && (
                <p className='text-red-500'> {signUpErrors.email}</p>
              )}
            </div>
            <div className='mb-6'>
              <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Password</label>
              <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900
                      sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                      dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
              {signUpErrors.password && (
                <p className='text-red-500'> {signUpErrors.password}</p>
              )}
            </div>
            <div >
              <label htmlFor="confirm-password" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Confirm password</label>
              <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border
                      border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>

            </div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-400">
              Already have an account? <a href="/SignIn" className="font-medium text-blue-600 hover:underline dark:text-primary-500">Login here</a>
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold mt-4 py-2 px-4
              rounded-lg focus:outline-none focus:shadow-outline" type="submit">
              Create Account
            </button>

          </form>
        </div>
      </div>
    </>)
}

