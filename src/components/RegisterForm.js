/* eslint-disable no-unused-vars */
import React from "react";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import axios from "axios";

export const RegisterForm = () => {
  const [data, setData] = useState([]);
  const [getCountry, setCountry] = useState();
  const [getState, setState] = useState([]);
  const [selectedState, setSelectedState] = useState();
  const [cities, setCities] = useState([]);

  const [success, setSuccess] = useState(false);

  const validate = Yup.object({
    fullName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Name is Required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    mobile: Yup.string()
      .min(10, "Must be 10 characters")
      .max(10, "Must be 10 characters"),
  });

  useEffect(() => {
    axios
      .get(
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
      )
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const country = [...new Set(data.map((item) => item.country))];
  country.sort();
  // console.log(data);
  const handleCountry = (e) => {
    let states = data.filter((state) => state.country === e.target.value);
    states = [...new Set(states.map((item) => item.subcountry))];
    states.sort();
    setState(states);
  };

  const handleState = (e) => {
    let cities = data.filter((city) => city.subcountry === e.target.value);
    cities.sort().reverse();
    setCities(cities);
  };

  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        mobile: "",
        getCountry: "",
        selectedState: "",
        city: "",
        message: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        setSuccess(true);
        window.scrollTo(0, 0)
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
        setTimeout(() => {
          window.location.reload();
        },3000)
        window.scrollTo(0, 0)
        console.log(values);
      }}
    >
      {(formik) => (
        <div>
          {success && (
            <span
              style={{
                backgroundColor: "lightgreen",
                display: "flex",
                padding: "10px",
                fontSize: "16px",
                color: "green",
                justifyContent: "center",
                borderRadius: "10px",
              }}
            >
              Register Successfully.
            </span>
          )}

          <h1 className="my-4 font-weight-bold .display-4">RegisterForm</h1>

          <Form>
            <TextField label="Full Name" name="fullName" type="text" />
            <TextField label="Email" name="email" type="email" />
            <TextField label="Mobile" name="mobile" type="number" />
            <div className="mb-2">
              <label>Country</label> <br></br>
              <select
                className="form-control"
                style={{ backgroundColor: "#f0f0ff" }}
                onChange={(e) => handleCountry(e)}
              >
                <option value="">Select your country</option>
                {country.map((items) => (
                  <option key={items} value={getCountry}>
                    {items}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label>State</label> <br></br>
              <select
                className=" form-control"
                style={{ backgroundColor: "#f0f0ff" }}
                onChange={(e) => handleState(e)}
              >
                <option value="">Select your state</option>
                {getState.map((items) => (
                  <option key={items} value={selectedState}>
                    {items}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label>City</label> <br></br>
              <select
                className="form-control"
                style={{ backgroundColor: "#f0f0ff" }}
              >
                <option value="">Select your city</option>
                {cities.map((items) => (
                  <option key={items.name}>{items.name}</option>
                ))}
              </select>
            </div>
            <TextField label="Message" name="message" type="text" />

            <button
              className="btn btn-success mt-3 mb-5"
              type={success ? "reset" : "submit"}
            >
              Register
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};
