"use client";
import "./globals.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { signInWithEmail } from "@/api/users";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      console.log(email, password);
      await signInWithEmail(email, password);
      console.log("you are logged in if there is no error");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <main className="main">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="label">email</label>
          <input {...register("email", { required: true })} />
          {errors.email && <span className="span">This field is required</span>}
        </div>
        <div>
          <label className="label">password</label>
          <input {...register("password", { required: true })} />
          {errors.password && (
            <span className="span">This field is required</span>
          )}
        </div>
        <button className="button" type="submit">
          submit
        </button>
        {error && <span className="span">{error}</span>}
      </form>
    </main>
  );
}
