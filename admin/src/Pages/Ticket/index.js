import { Component } from "react";
import { connect } from "react-redux";
import DataTableComponent from "../../Component/DataTable";
import { List, Post, Put, Delete } from "../../Helper/Service";
import { SetSelectData } from "../../Redux/Action/DataTable";
import EditForm from "../../Component/Forms/Ticket/Response";
import NewForm from "../../Component/Forms/Pages/New";
import { toast } from "react-toastify";
import moment from "moment";
class Ticket extends Component {
  state = {
    Data: [],
    Columns: [],
    SelectUser: [],
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
    const response = await Post("SetTicketStatus", {
      id: this.props.DataTableReducer.SelectData._id,
      Status: 3,
    });
    if (response) {
      toast.success("İşlem Başarılı");
      setTimeout(() => window.location.reload(), 2000);
    }
  }
  async HandleSubmit(value) {

    const response = await Post("SetTicketStatus", {
      id: this.props.DataTableReducer.SelectData._id,
      Status: 1,
    });
    if (response) {
      const Session = await this.props.session;
      const ResponseBody = await Post("TicketBody", {
        HeaderId: this.props.DataTableReducer.SelectData._id,
        Message: value.Message,
        MessageType: "Response",
        ResponseUser: Session.data.data.data[0].Email
      });
    }
    if (response) {
      toast.success("İşlem Başarılı");
      setTimeout(() => window.location.reload(), 2000);
    }
  }

  async HandleUpdate(value) {
    let response = await Post("TicketHeader", value);
    if (response) {
      toast.success("İşlem Başarılı");
      setTimeout(() => window.location.reload(), 2000);
    }
  }
  async componentDidMount() {
    var ticketData = [];
    let TicketHeaderData = await Post("GetTicket", { TicketType: "Ticket" });
    if (TicketHeaderData.data) {
      TicketHeaderData.data.map(async (Header) => {
        let Body = await Post("/GetBody", {
          HeaderId: Header._id,
        });
        ticketData.push({ ...Header, Body });
        this.setState({ Data: ticketData });
      });
    }
    const columns = [
      {
        name: "Başlık",
        selector: "Title",
        sortable: true,
      },
      {
        name: "Gönderen",
        selector: "UserName",
        sortable: true,
      },
      {
        name: "Tarih",
        selector: "createdAt",
        sortable: true,
        format: (row, index) => {
          return moment(row.createdAt).format("DD.MM.YYYY HH:MM:SS ");
        },
      },
      {
        name: "Durumu",
        selector: "Status",
        sortable: true,
        format: (row, index) => {
          if (row.Status === 1) {
            return (
              <span style={{ color: "blue", fontweight: "bold" }}>
                Yanıtladınız
              </span>
            );
          } else if (row.Status === 0) {
            return (
              <span style={{ color: "green", fontweight: "bold" }}>
                Kayıt Cevap Bekliyor
              </span>
            );
          } else if (row.Status === 3) {
            return (
              <span style={{ color: "red", fontWeight: "bold" }}>
                Kayıt Kapandı
              </span>
            );
          } else if (row.Status === 2) {
            return <span style={{ color: "red", fontWeight: "bold" }}>
              Kullanıcı  Kaydı Kapattı
              </span>
          }
        },
      },
    ];
    this.setState({ Columns: columns });
  }
  async GetBody() {
    this.setState({
      EditStatsus: false,
    });
  }
  render() {
    const { SelectData } = this.props.DataTableReducer;
    const NewModal = () => <NewForm onSubmit={this.HandleUpdate} />;
    const UpdateModal = () => (
      <div className="column">
        {this.state.EditStatsus === true && (
          <div>
            <div className="form-group">
              <label>Başlık : </label>
              <input
                type="text"
                className="form-control"
                name="Name"
                value={SelectData.Title}
                onChange={this.HandleInput}
                readOnly={true}
              />
            </div>
            <div class="container content">
              <div class="row">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div class="card" style={{ color: "black" }}>
                    <div class="card-body height3">
                      <ul class="chat-list">
                        {this.props.DataTableReducer.SelectData.Body.data !== undefined &&
                          this.props.DataTableReducer.SelectData.Body.data.map((TicketBody) => (
                            <li
                              class={
                                TicketBody.MessageType === "Response"
                                  ? "in"
                                  : "out"
                              }
                            >
                              <div class="chat-img">
                                <img
                                  alt="Avtar"
                                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                />
                              </div>
                              <div class="chat-body">
                                <div class="chat-message">
                                  <h5>{TicketBody.ResponseUser}</h5>
                                  <p>{TicketBody.Message}</p>
                                  <p>
                                    {moment(TicketBody.createdAt).format(
                                      "DD.MM.YYYY HH:mm:SS"
                                    )}
                                  </p>
                                </div>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {this.state.EditStatsus === true && (
          <div>
            <div className="row">
              <div className="form-group">
                <button
                  className="btn btn-primary"
                  onClick={() => this.GetBody()}
                >
                  Cevapla
                </button>
              </div>
            </div>
            <div className="row">
              <div className="form-group">
                <button className="btn btn-danger" onClick={this.HandleDelete}>
                  Kaydı Kapat
                </button>
              </div>
            </div>
          </div>
        )}
        {this.state.EditStatsus === false && (
          <EditForm
            onSubmit={this.HandleSubmit}
            FormValues={this.props.DataTableReducer.SelectData}
            BodyValues={this.state.Body}
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
          NewDataTitle={" "}
          UpdateDataTitle={""}
          NewModal={<NewModal />}
          columns={this.state.Columns}
          session={this.props.session}
          data={this.state.Data}
          title={"Ticket Listesi"}
          filterField={"UserName"}
          UpdateModal={<UpdateModal />}
          UpdateAction={this.UpdateUser}
          UpdateData={true}
          DeleteData={false}
          NewData={false}
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
export default connect(mapStateToProps, mapDispatchToProps)(Ticket);
