import { Component, React } from "react";
import { Field, reduxForm } from "redux-form";
import { List } from "../../../Helper/Service";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import ReactMDE from "redux-forms-markdown-editor";

class PageNewForm extends Component {
  state = { editorState: EditorState.createEmpty() };
  render() {
    const TextEditor = ({ input }) => (
      <Editor editorState={this.state.editorState} {...input} />
    );
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">Başlık :</label>
          <Field
            name="Title"
            component="input"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">Link :</label>
          <Field
            name="Url"
            component="input"
            className="form-control"
            type="text"
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

PageNewForm = reduxForm({
  // a unique name for the form
  form: "Page-New-Form",
})(PageNewForm);
export default PageNewForm;
