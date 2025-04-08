import { useState } from 'react'
// import './App.css'
function SignIn() {
  return (
    <div className="container mt-5 p-4 border rounded" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4 text-center">Sign In</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" placeholder="Enter your username" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Enter your password" />
        </div>
        <button type="submit" className="btn btn-info w-100">Log In</button>
      </form>
    </div>
  );
}

export default SignIn
