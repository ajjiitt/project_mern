import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Form = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const createSuccess = () => toast("User created successfully");
  const createUnsuccess = () => toast("Error while creating user");
  const unauth = () => toast("Session expired");
  const createUser = async () => {
    if (
      email.length >= 4 &&
      username.length >= 4 &&
      mobile.length != 10 &&
      address.length >= 5
    ) {
      toast("Enter valid values for user.");
      return;
    }
    await fetch("https://ajitmernproject.herokuapp.com/createuser", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify({ username, mobile, address, email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          createSuccess();
          navigate("/");
        } else if (data.auth) {
          unauth();
          navigate("/login");
        } else {
          createUnsuccess();
          setEmail("");
          setMobile("");
          setAddress("");
          setUsername("");
          //toast popup
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col col-md-3"></div>
        <div
          className="col-md-6 my-4"
          style={{
            border: "1px solid black",
            borderRadius: "3px",
          }}
        >
          <div className="mb-3">
            <label className="form-label my-2">Email address</label>
            <input
              type="email"
              className="form-control my-2"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control my-2"
              id="exampleInputPassword1"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="form-label">Mobile Number</label>
            <input
              type="text"
              className="form-control my-2"
              id="exampleInputPassword1"
              placeholder="Enter Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control my-2"
              id="exampleInputPassword1"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-primary my-2"
              onClick={createUser}
              style={{ width: "100%" }}
            >
              Submit
            </button>
          </div>
        </div>
        <div className="col col-md-3"></div>
      </div>
    </div>
  );
};

export default Form;
