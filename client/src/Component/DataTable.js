import { Component } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";
import { SetSelectData } from "../Redux/Action/DataTable";
import { Modal, Button } from "react-bootstrap";
class DataTableComponent extends Component {
  state = {
    SearchQuery: "",
    FilteredData: [],
    ShowNewModal: false,
    ShowUpdateModal: false,
  };
  constructor(props) {
    super(props);
    this.SetSelectUser = this.SetSelectUser.bind(this);
    this.HandleSearch = this.HandleSearch.bind(this);
  }
  HandleSearch = (e) => {
    this.setState({ SearchQuery: e.target.value });
  };
  async componentDidMount() {}
  SetSelectUser(Users) {
    this.setState({ Users });
  }
  HandleCloseNewModal = () => {
    this.setState({ ShowNewModal: false });
  };
  HandleCloseUpdateModal = () => {
    this.setState({ ShowUpdateModal: false });
  };
  render() {
    const FilteredData = this.props.data.filter((item) => {
      return item[this.props.filterField]
        .toLowerCase()
        .includes(this.state.SearchQuery.toLowerCase());
    });

    return (
      <div>
        <Header Oturum={this.props.session} />
        <div class="page-content">
          <SideBar Oturum={this.props.session} />
          <div class="content-wrapper">
            <div class="page-header page-header-light">
              <div class="page-header-content header-elements-md-inline">
                <div class="page-title d-flex">
                  <h4>
                    <i class="icon-arrow-left52 mr-2"></i>
                    <span class="font-weight-semibold">Tanımlar</span> -
                    {this.props.title}
                  </h4>
                  <a
                    href="#"
                    class="header-elements-toggle text-default d-md-none"
                  >
                    <i class="icon-more"></i>
                  </a>
                </div>
              </div>

              <div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                <div class="d-flex">
                  <div class="breadcrumb">
                    <a href="/" class="breadcrumb-item">
                      <i class="icon-home2 mr-2"></i> Anasayfa
                    </a>
                  </div>

                  <a
                    href="#"
                    class="header-elements-toggle text-default d-md-none"
                  >
                    <i class="icon-more"></i>
                  </a>
                </div>
              </div>
            </div>
            <div class="content">
              <div class="card">
                <div class="card-body">
                  {this.props.NewData === true && (
                    <button
                      type="button"
                      class="btn bg-primary"
                      onClick={() => this.setState({ ShowNewModal: true })}
                    >
                      <i class="mi-add"></i>Yeni
                    </button>
                  )}
                  <br />
                  <br />
                  <br />
                  <div className="row col-md-5">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        onChange={this.HandleSearch}
                        placeholder="Arama...."
                      />
                    </div>
                  </div>
                  <DataTable
                    title={this.props.title}
                    fixedHeader={true}
                    striped={true}
                    columns={this.props.columns}
                    data={FilteredData}
                    pagination={true}
                    responsive={true}
                    onRowClicked={(data) => {
                      if (data !== undefined) this.props.SetSelectData(data);
                      if (this.props.UpdateData)
                        this.setState({ ShowUpdateModal: true });
                    }}
                    noDataComponent={
                      <div>Gösterilecek Veri Bulunmamaktadır</div>
                    }
                  />
                  <Modal
                    show={this.state.ShowNewModal}
                    onHide={this.HandleCloseNewModal}
                    size="lg"
                    closeButton
                  >
                    <Modal.Header>
                      <Modal.Title>{this.props.NewDataTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.props.NewModal}</Modal.Body>
                  </Modal>
                </div>
                <Modal
                  show={this.state.ShowUpdateModal}
                  onHide={this.HandleCloseUpdateModal}
                  closeButton
                >
                  <Modal.Header>
                    <Modal.Title>{this.props.UpdateDataTitle}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>{this.props.UpdateModal}</Modal.Body>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ SelectData }) => {
  return {
    SelectData,
  };
};
const mapDispatchToProps = {
  SetSelectData,
};
export default connect(mapStateToProps, mapDispatchToProps)(DataTableComponent);
