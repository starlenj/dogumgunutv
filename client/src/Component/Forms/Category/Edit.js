import { Component, React } from "react";
import { Field, reduxForm } from "redux-form";

class CategoryNewForm extends Component {
  async componentDidMount() {
    this.props.initialize(this.props.FormValues);
  }
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
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
          <label htmlFor="firstName">Kategori Fiyatı :</label>
          <Field
            name="Name"
            component="input"
            className="form-control"
            type="number"
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

CategoryNewForm = reduxForm({
  // a unique name for the form
  form: "Category-New-Form",
})(CategoryNewForm);
export default CategoryNewForm;
