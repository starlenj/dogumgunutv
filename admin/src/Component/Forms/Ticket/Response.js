import { Component, React } from "react";
import { Field, reduxForm } from "redux-form";
import { List } from "../../../Helper/Service";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import ReactMDE from "redux-forms-markdown-editor";

class TicketResponse extends Component {
  state = { editorState: EditorState.createEmpty() };
  render() {
    const TextEditor = ({ input }) => (
      <Editor editorState={this.state.editorState} {...input} />
    );
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">Cevap :</label>
          <Field name="Message" component={ReactMDE} />
        </div>
        <button type="submit" className="btn btn-primary">
          Kaydet
        </button>
        <br />
      </form>
    );
  }
}

TicketResponse = reduxForm({
  // a unique name for the form
  form: "Page-Ticket-Response",
})(TicketResponse);
export default TicketResponse;
