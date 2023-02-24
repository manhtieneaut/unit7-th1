import { useState } from "react";

export default function Login() {
    //
    const [values, setValues] = useState({
        email: '', password: '', confirmPassword: '', isRead: false,
    });
    const [errors, setErrors] = useState([]);

    ///Validate
    function validate() {
        const { email, password, isRead, confirmPassword } = values;
        // we are going to store errors for all fields
        // in a signle array
        const errors = [];

        if (email.length < 5) {
            errors.push("Email should be at least 5 characters long");
        }
        if (email.split("").filter((x) => x === "@").length !== 1) {
            errors.push("Email should contain a @");
        }
        if (email.indexOf(".") === -1) {
            errors.push("Email should contain at least one dot");
        }
        if (password.length < 6) {
            errors.push("Password should be at least 6 characters long");
        }
        if (password !== confirmPassword) {
            errors.push("Password should be at least 6 characters long");
        }
        if (!isRead) {
            errors.push("You must be accepted privacy policy");
        }
        return errors;
    }
    ///submit
    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validate();
        if (errors.length > 0) {
            setErrors(errors);
            return;
        }
    };

    /// add function when value change
    const handleChange = (event) => {
        event.persist();

        if (event.target.name === 'isRead') {
            setValues({
                ...values,
                [event.target.name]: !values.isRead,
            });
        } else {
            setValues({ ...values, [event.target.name]: event.target.value });
        }
    };




    const stringJson = JSON.stringify(values);
    return (
        <div className="container" style={{ width: "500px", height: "500px", backgroundColor: "gray", marginLeft: "35%" }}>
            <h1 style={{ width: "100%", borderBottom: "1px solid", textAlign: "center" }}>Đăng ký</h1>
            <form onSubmit={handleSubmit} >
                <input
                    style={{ width: "90%", height: "30px", border: "1px solid", textAlign: "center", marginTop: "10px", marginLeft: "20px" }}
                    name="email"
                    type="text"
                    placeholder="Email"
                    defaultValue={values.email}
                    onChange={handleChange}
                />
                <input
                    style={{ width: "90%", height: "30px", border: "1px solid", textAlign: "center", marginTop: "10px", marginLeft: "20px" }}

                    name="password"
                    type="password"
                    placeholder="Password"
                    defaultValue={values.password}
                    onChange={handleChange}
                />
                <input
                    style={{ width: "90%", height: "30px", border: "1px solid", textAlign: "center", marginTop: "10px", marginLeft: "20px" }}

                    name="confirmPassword"
                    type="password"
                    placeholder="ConfirmPassword"
                    defaultValue={values.confirmPassword}
                    onChange={handleChange}
                />
                <br />
                <label>
                    <input
                        style={{ marginLeft: "20px", marginTop: "10px" }}
                        name="isRead"
                        type="checkbox"
                        checked={values.isRead}
                        onChange={handleChange} />I read and accept the privacy policy:
                </label>
                <br />

                <button
                    style={{ marginLeft: "43%", marginTop: "10px" }}
                >Submit</button>
            </form>
            <div
                className="show-json-string-setValues"
                style={{ marginLeft: "20px", marginTop: "10px" }}

            >{stringJson}</div>
            {errors.map((error) => (
                <p key={error}>Error: {error}</p>
            ))}
        </div>
    );
}
