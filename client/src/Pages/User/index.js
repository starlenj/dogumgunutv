import { Component } from "react";
import { connect } from "react-redux";
import DataTableComponent from "../../Component/DataTable";
import { List, Post, Put, Delete } from "../../Helper/Service";
import { SetSelectData } from "../../Redux/Action/DataTable";
import EditForm from "../../Component/Forms/UserEdit";
import NewForm from "../../Component/Forms/NewUser";
import { toast } from "react-toastify";

class User extends Component {
  state = {
    Data: [],
    Columns: [],
    SelectUser: [],
    Email: "",
    Name: "",
    Tc: "",
    Phone: "",
    id: "",
    UpdateStatus: false,
    DeleteStatus: false,
    EditStatsus: true,
  };
  constructor(props) {
    super(props);
    this.HandleInput = this.HandleInput.bind(this);
    this.HandleSubmit = this.HandleSubmit.bind(this);
    this.HandleDelete = this.HandleDelete.bind(this);
  }
  HandleInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  async HandleDelete() {
    const response = await Delete(
      "User",
      this.props.DataTableReducer.SelectData._id
    );
    if (response) {
      toast.success("İşlem Başarılı");
      setTimeout(() => window.location.reload(), 2000);
    }
  }
  async HandleSubmit(value) {
    let response = await Put(
      "User",
      value,
      this.props.DataTableReducer.SelectData._id
    );
    if (response) {
      toast.success("İşlem Başarılı");
      setTimeout(() => window.location.reload(), 2000);
    }
  }

  async HandleUpdate(value) {
    let response = await Post("User", value);
    if (response) {
      toast.success("İşlem Başarılı");
      setTimeout(() => window.location.reload(), 2000);
    }
  }
  async componentDidMount() {
    let UserData = await List("User");
    const columns = [
      {
        name: "Adı",
        selector: "Name",
        sortable: true,
      },
      {
        name: "E-Posta",
        selector: "Email",
        sortable: true,
      },
    ];

    this.setState({ Data: UserData, Columns: columns });
  }
  render() {
    const { SelectData } = this.props.DataTableReducer;
    const NewModal = () => <NewForm onSubmit={this.HandleUpdate} />;
    const UpdateModal = () => (
      <div className="column">
        {this.state.EditStatsus === true && (
          <div className="form-group">
            <label>Adı : </label>
            <input
              type="text"
              className="form-control"
              name="Name"
              value={SelectData.Name}
              readOnly={this.state.EditStatsus}
            />
          </div>
        )}
        {this.state.EditStatsus === true && (
          <div className="form-group">
            <label>Email : </label>
            <input
              type="text"
              className="form-control"
              name="Name"
              value={SelectData.Email}
              onChange={this.HandleInput}
              readOnly={true}
            />
          </div>
        )}
        {this.state.EditStatsus === true && (
          <div className="form-group">
            <label>Tc : </label>
            <input
              type="text"
              className="form-control"
              name="Tc"
              value={SelectData.Tc}
              onChange={this.HandleInput}
              readOnly={this.state.EditStatsus}
            />
          </div>
        )}
        {this.state.EditStatsus === true && (
          <div>
            <div className="row">
              <div className="form-group">
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    this.setState({
                      EditStatsus: false,
                    })
                  }
                >
                  Düzenle
                </button>
              </div>
            </div>
            <div className="row">
              <div className="form-group">
                <button className="btn btn-danger" onClick={this.HandleDelete}>
                  Sil
                </button>
              </div>
            </div>
          </div>
        )}
        {this.state.EditStatsus === false && (
          <EditForm
            onSubmit={this.HandleSubmit}
            FormValues={this.props.DataTableReducer.SelectData}
          />
        )}
        {this.state.EditStatsus === false && (
          <div>
            <br />
            <div className="form-group">
              <button
                className="btn btn-danger"
                onClick={() => this.setState({ EditStatsus: true })}
              >
                İptal
              </button>
            </div>
          </div>
        )}
      </div>
    );
    return (
      <div>
        <DataTableComponent
          NewDataTitle={"Yeni Kullanıcı Tanımı"}
          UpdateDataTitle={"Kullanıcı Düzenle"}
          NewModal={<NewModal />}
          columns={this.state.Columns}
          session={this.props.session}
          data={this.state.Data}
          title={"Kullanıcı Listesi"}
          filterField={"Name"}
          UpdateModal={<UpdateModal />}
          UpdateAction={this.UpdateUser}
          UpdateData={true}
          DeleteData={true}
          NewData={true}
        />
      </div>
    );
  }
}
const mapStateToProps = ({ DataTableReducer }) => {
  return {
    DataTableReducer,
  };
};
const mapDispatchToProps = {
  SetSelectData,
};
export default connect(mapStateToProps, mapDispatchToProps)(User);
