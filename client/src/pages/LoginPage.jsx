import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, errors: signInErrors, isAuthenticated } = useAuth();
  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {signInErrors.map((error, i) => (
          <div key={i} className="bg-red-500 p-2 my-2 text-center text-white ">
            {error}
          </div>
        ))}
        <h1 className="text-3xl font-bold mb-5">Login</h1>

        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
            className="w-full mb-5 bg-zinc-700 text-white px-4 py-2 rounded-md"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Password"
            className="w-full mb-2 bg-zinc-700 text-white px-4 py-2 rounded-md"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}

          <button
            type="submit"
            className=" bg-sky-500 text-white px-4 py-2 rounded-md my-2 "
          >
            Login
          </button>
        </form>
        <p className="flex gap-x-2 justify-between">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-sky-500">
            {" "}
            Registrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
