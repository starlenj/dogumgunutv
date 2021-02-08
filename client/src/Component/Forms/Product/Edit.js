import { Component, React } from "react";
import { Field, reduxForm } from "redux-form";
import { List } from "../../../Helper/Service";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import ReactMDE from "redux-forms-markdown-editor";
import { connect } from "react-redux";

class ProductUpdateForm extends Component {
  state = { Category: [], editorState: EditorState.createEmpty() };
  async componentDidMount() {
    let Category = await List("Category");
    this.setState({ Category });
    this.props.initialize(this.props.FormValues);
  }
  render() {
    const TextEditor = ({ input }) => (
      <Editor editorState={this.state.editorState} {...input} />
    );
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className="form-group">
          <Field name="CategoryId" className="form-control" component="select">
            <option>--Lütfen Kategori Seçiniz--</option>
            <option value="0.05" >0.05</option>
            <option value="0.50" >0.50</option>
            <option value="1.00" >1.00</option>
          </Field>
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
          <label htmlFor="firstName">Fiyat :</label>
          <Field
            name="Price"
            component="input"
            className="form-control"
            type="number"
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">Açıklama :</label>
          <Field name="Info" component={ReactMDE} />
        </div>
        <button type="submit" className="btn btn-primary">
          Kaydet
        </button>
        <br />
      </form>
    );
  }
}

ProductUpdateForm = reduxForm({
  // a unique name for the form
  form: "Product-Update-Form",
})(ProductUpdateForm);
export default ProductUpdateForm;
