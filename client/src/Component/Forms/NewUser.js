import { Component, React } from "react";
import { Field, reduxForm } from "redux-form";

class UserEditForm extends Component {
  constructor(props) {
    super(props);
  }
  Submit(values) {
    console.log(values);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">E-Posta :</label>
          <Field
            name="Email"
            component="input"
            className="form-control"
            type="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">Şifre :</label>
          <Field
            name="Password"
            component="input"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">Adı :</label>
          <Field
            name="Name"
            component="input"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">TC : </label>
          <Field
            name="Tc"
            component="input"
            type="text"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Telefon : </label>
          <Field
            name="Phone"
            component="input"
            type="text"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Kaydet
        </button>
        <br />
      </form>
    );
  }
}

UserEditForm = reduxForm({
  // a unique name for the form
  form: "User-New-Form",
})(UserEditForm);
export default UserEditForm;
