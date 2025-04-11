import { useState } from 'react'
// import './App.css'

function SignUp() {
  return (
    <div className="container mt-5 p-4 border rounded" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Sign Up</h2>
      <form>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input type="text" className="form-control" id="firstName" />
          </div>
          <div className="col">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input type="text" className="form-control" id="lastName" />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" />
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" />
          </div>
          <div className="col">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="confirmPassword" />
          </div>
        </div>
        <button type="submit" className="btn btn-info w-100">Create Account</button>
        <div className="mt-3 text-center">
          <a href="/signin">Already have an account? Sign in</a>
        </div>
      </form>
    </div>
  );
}

export default SignUp