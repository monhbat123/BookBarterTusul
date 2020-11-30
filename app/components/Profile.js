import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { renderField } from "./auth/renderField";
import * as actions from "../actions";
const validate = (values) => {
  const errors = {};
  const names = ["name", "address", "city", "state", "country", "phone"];
  names.forEach((e) => {
    if (!values[e]) {
      errors[e] = "Required";
    }
  });

  return errors;
};

class Profile extends React.Component {
  submit(values) {
    this.props.updateUser(values);
  }
  componentDidMount() {
    const { initialize } = this.props;
    let data = this.props.auth.user;
    console.log("data", data);
    initialize({
      name: data.name,
      address: data.address,
      city: data.city,
      state: data.state,
      country: data.country,
      phone: data.phone,
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <h1>Хэрэглэгчийн булан</h1>
        <form
          onSubmit={handleSubmit(this.submit.bind(this))}
          className="form-horizontal col-sm-8 col-sm-offset-2"
        >
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
          <Field
            name="phone"
            type="local"
            component={renderField}
            label="Утасны дугаар"
          />
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-default">
                Шинчлэх
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

Profile = reduxForm({
  form: "profile",
  validate,
})(connect(mapStateToProps, actions)(Profile));

export default Profile;
