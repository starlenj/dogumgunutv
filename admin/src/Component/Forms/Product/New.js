import { Component, React } from "react";
import { Field, reduxForm } from "redux-form";
import { List } from "../../../Helper/Service";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import ReactMDE from "redux-forms-markdown-editor";

class ProductNewForm extends Component {
  state = { Category: [], editorState: EditorState.createEmpty() };
  async componentDidMount() {
    let Category = await List("Category");
    this.setState({ Category });
  }
  render() {
    const TextEditor = ({ input }) => (
      <Editor editorState={this.state.editorState} {...input} />
    );
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
          <label htmlFor="firstName">Fiyat :</label>
          <Field
            name="Price"
            component="input"
            className="form-control"
            type="number"
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">İzleyici Sayısı :</label>
          <Field
            name="StreamCount"
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

ProductNewForm = reduxForm({
  // a unique name for the form
  form: "Category-New-Form",
})(ProductNewForm);
export default ProductNewForm;
