import { useContext } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";
 
const SignUp = () => {
    const {createUser, googleSignIn, githubLogIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const handleSignUpForm = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);

        createUser(email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            navigate(from, {replace: true});
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Sign Up SuccessFully.....',
                showConfirmButton: false,
                timer: 1500
              })
        })
        .catch(err => console.error(err))
    }
    const handleGoogleLogin = () => {
        googleSignIn()
        .then(result => {
            const user = result.user;
            console.log(user);
            navigate(from, {replace: true});
        })
        .catch(err => console.error(err))
    }
    const handleGithubLogIn = () => {
        githubLogIn()
        .then(result => {
            const user = result.user;
            console.log(user);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Login SuccessFully......',
                showConfirmButton: false,
                timer: 1500
              })
        })
        .catch(err => console.error(err))
    }

    return (
        <div>
            <div className="w-full max-w-xl mx-auto my-14 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <form onSubmit={handleSignUpForm} className="space-y-6 p-12" action="#">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign Up to our platform</h5>
        <div>
            <label name="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
            <input type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Toys Shop" required/>
        </div>
        <div>
            <label name="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="toy@shop.com" required/>
        </div>
        <div>
            <label name="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input type="text" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required/>
        </div>

        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up to your account</button>
        <div className="divider">OR</div>
        <div className="text-center">
        <button onClick={handleGoogleLogin} className="btn btn-circle mr-3 text-2xl">
            <FcGoogle/>
        </button>
        <button onClick={handleGithubLogIn} className="btn btn-circle text-2xl">
            <AiFillGithub />
        </button>
        </div>
        <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-300">
            Not registered? <Link to={'/login'} className="text-blue-700 hover:underline dark:text-blue-500">Login Here</Link>
        </div>
    </form>
</div>
        </div>
    );
};

export default SignUp;