import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Server_URL } from "../../utils/config";
import { showErrorToast, showSuccessToast } from "../../utils/toasthelper";

export default function Register() {
  const [selectedRole, setSelectedRole] = useState("user");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
  try {
    const formData = {
      name: data.name,
      email: data.email,
      password: data.password,
      stream: selectedRole === "user" ? data.stream : undefined,
      year: selectedRole === "user" ? Number(data.year) : undefined,
      role: selectedRole
    };

    const response = await axios.post(
      `${Server_URL}users/register`,
      formData
    );

    console.log("Register Response:", response.data);
    showSuccessToast("Registration Successful!");
    reset();
  } catch (error) {
    console.error("Register Error:", error.response?.data || error.message);
    showErrorToast(
      error.response?.data?.message || "Registration Failed!"
    );
  }
};


  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4">Registration</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 border rounded shadow bg-white"
      >
        {/* Role Selection */}
        <div className="mb-3">
          <label className="form-label">Register as</label>
          <select
            className="form-control"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="librarian">Librarian</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <small className="text-danger">{errors.name.message}</small>
          )}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <small className="text-danger">{errors.email.message}</small>
          )}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <small className="text-danger">{errors.password.message}</small>
          )}
        </div>

        {/* Stream - Only for users */}
        {selectedRole === "user" && (
          <div className="mb-3">
            <label className="form-label">Stream</label>
            <input
              type="text"
              className="form-control"
              {...register("stream", { required: selectedRole === "user" ? "Stream is required" : false })}
            />
            {errors.stream && (
              <small className="text-danger">{errors.stream.message}</small>
            )}
          </div>
        )}

        {/* Year - Only for users */}
        {selectedRole === "user" && (
          <div className="mb-3">
            <label className="form-label">Year</label>
            <input
              type="number"
              className="form-control"
              {...register("year", { required: selectedRole === "user" ? "Year is required" : false })}
            />
            {errors.year && (
              <small className="text-danger">{errors.year.message}</small>
            )}
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100">
          Register as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
        </button>
      </form>
    </div>
  );
}
