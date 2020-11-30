import React from "react";
import { Field, reduxForm } from "redux-form";
import { renderField } from "./renderField";
import { connect } from "react-redux";
import * as actions from "../../actions";

const validate = (values) => {
  const errors = {};
  const names = [
    "name",
    "email",
    "password",
    "address",
    "city",
    "state",
    "country",
  ];
  names.forEach((e) => {
    if (!values[e]) {
      errors[e] = "Заавал оруулах";
    }
  });

  if (values.email) {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Зөвхөн Имэйл хаягаа оруулна уу";
    }
  }

  if (values.password) {
    if ((values.password.length || 10) < 5) {
      errors.password = "Дор хаяж 5 тэмдэгт ашиглана уу!";
    }
  }

  return errors;
};

class Signup extends React.Component {
  submit(values) {
    this.props.signupUser(values);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="forms">
        <form
          onSubmit={handleSubmit(this.submit.bind(this))}
          className="form-horizontal col-sm-8 col-sm-offset-2"
        >
          {this.props.auth.error.length > 0 && (
            <div className="form-group flex-center-box bg-danger">
              <p style={{ margin: "12px" }}>{this.props.auth.error}</p>
            </div>
          )}
          <Field
            name="email"
            type="email"
            component={renderField}
            label="ИМэйлт"
          />
          <Field
            name="password"
            type="password"
            component={renderField}
            label="Нууц үг"
          />
          <Field name="name" type="text" component={renderField} label="Нэр" />
          <Field
            name="address"
            type="local"
            component={renderField}
            label="Гэрийн хаяг"
          />
          <Field name="city" type="local" component={renderField} label="Хот" />
          <Field
            name="state"
            type="local"
            component={renderField}
            label="Аймаг"
          />
          <Field
            name="country"
            type="local"
            component={renderField}
            label="Улс"
          />
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-default">
                Бүртгүүлэх
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

Signup = reduxForm({
  form: "signup",
  validate,
})(connect(mapStateToProps, actions)(Signup));

export default Signup;
