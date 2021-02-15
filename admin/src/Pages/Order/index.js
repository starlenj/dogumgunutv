import { Component } from "react";
import DataTableComponent from "../../Component/DataTable";
import { List, Post, Put, Delete, Get } from "../../Helper/Service";
import UpdateOrderModalForm from "../../Component/Forms/Order/edit-order";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { SetSelectData } from "../../Redux/Action/DataTable";
class Order extends Component {
  state = {
    Data: [],
    ShowUpdateModal: false,
  };
  async componentDidMount() {
    await this.GetDataTable();

    const Columns = [
      {
        name: "Ürün Adı",
        selector: "ProductName",
        sortable: true,
      },
      {
        name: "Fiyatı",
        selector: "Price",
        sortable: true,
      },
      {
        name: "Zaman",
        selector: "Date",
        sortable: true,
      },
    ];
    this.setState({ Columns });
  }
  async GetDataTable() {
    let response = await List("OrderBody");
    this.setState({ Data: response });
  }
  async IslemOnaylama(){
    let OrderUpdate = await Post('OrderUpdateStatus',{id : this.props.DataTableReducer.SelectData._id,Status :1})
  }
  async IslemReddet(){
  
    let OrderUpdate = await Post('OrderUpdateStatus',{id : this.props.DataTableReducer.SelectData._id,Status :-1})

  }
  render() {
    const UpdateModal = () => (
      <div>
        <span>İşlem Onaylamak veya Reddetmek İstiyor musunuz?</span>
        <br />
        <br />
        <br />
        <div>
          <button
            className="btn btn-primary"
            onClick={() => this.IslemOnaylama()}
            data-dismiss="modal"
          >
            Onayla
          </button>
          {"         "}
          <button
            className="btn btn-danger"
            data-dismiss="modal"
            onClick={() => this.IslemReddet()}
          >
            Reddet
          </button>
          <button
            className="btn btn-success"
            data-dismiss="modal"
            data-target="#UpdateOrderModal"
            onClick={() => this.setState({ ShowUpdateModal: true })}
          >
            Revize Et
          </button>
          {"        "}
        </div>

        <Modal
          show={this.state.ShowUpdateModal}
          onHide={() => this.setState({ ShowUpdateModal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Sipariş Revize Et</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UpdateOrderModalForm
              FormValues={this.props.DataTableReducer.SelectData}
            />
          </Modal.Body>
        </Modal>
      </div>
    );

    return (
      <div>
        <DataTableComponent
          NewDataTitle={"Yeni Ürün Tanımı"}
          UpdateDataTitle={"Sipariş Düzenle"}
          NewModal={() => <div></div>}
          NewData={false}
          columns={this.state.Columns}
          session={this.props.session}
          data={this.state.Data}
          title={"Sipariş Listesi"}
          filterField={"ProductName"}
          UpdateModal={<UpdateModal />}
          UpdateAction={this.UpdateUser}
          UpdateData={true}
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
export default connect(mapStateToProps, mapDispatchToProps)(Order);
