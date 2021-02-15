import { Component, React } from "react";
import { Field, reduxForm } from "redux-form";
import { List } from "../../../Helper/Service";

class EditOrderForm extends Component {
  state = { ProductList: [] };
  async componentDidMount() {
    console.log(this.props);
    let ProductList = await List("Product");
    this.props.initialize(this.props.FormValues);
    if (ProductList.length > 0) {
      this.setState({ ProductList });
    }
  }
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">Adı :</label>
          <Field name="ProductName" component="select" className="form-control">
            {this.state.ProductList.map((Product) => (
              <option selected={Product._id == this.props.FormValues.ProductId}>
                {Product.Name}
              </option>
            ))}
          </Field>
        </div>
        <div className="form-group">
          <label htmlFor="firstName">Kategori Fiyatı :</label>
          <Field
            name="Price"
            component="input"
            className="form-control"
            type="number"
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">Yayin Suresi :</label>
          <Field
            name="YayinSuresi"
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

EditOrderForm = reduxForm({
  // a unique name for the form
  form: "Edit-Order-Form",
})(EditOrderForm);
export default EditOrderForm;
