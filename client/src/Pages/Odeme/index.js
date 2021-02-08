import { Component } from "react";
import DataTableComponent from "../../Component/DataTable";
import { List, Post, Put, Delete, Get } from "../../Helper/Service";
import { connect } from "react-redux";
import moment from 'moment';
import { SetSelectData } from "../../Redux/Action/DataTable";
class Odeme extends Component {
  state = {
    Data: [],
  };
  constructor(props) {
    super(props);
  }
  async IslemOnaylama() {
    await Post("IslemOnay", { id: this.props.DataTableReducer.SelectData._id, status: 1 });
    setTimeout(() => window.location.reload(), 3000)
  }

  async IslemReddet() {
    await Post("IslemOnay", { id: this.props.DataTableReducer.SelectData._id, status: 0 });
    setTimeout(() => window.location.reload(), 3000)
  }
  async componentDidMount() {
    await this.GetDataTable();

    const Columns = [
      {
        name: "Tutar",
        selector: "bakiye",
        sortable: true,
      },
      {
        name: "Method",
        selector: "HareketTuru",
        sortable: true,
      },
      {
        name: "Zaman",
        selector: "createdAt",
        sortable: true,
      },
      {
        name: "Durumu",
        selector: "status",
        sortable: true,
      },
    ];
    this.setState({ Columns });
  }
  async GetDataTable() {
    var filterData = []
    const UserHareketData = await List("UserHareket");
    UserHareketData.map((User) => {
      filterData.push({
        HareketTarihi: User.HareketTarihi, bakiye: User.bakiye,
        status: User.status === true ? "Onaylanmış" : "Onaylanmamış",
        UserId: User.UserId, HareketTuru: User.HareketTuru,
        createdAt: moment(User.createdAt).format("DD.MM.YYYY HH:mm:ss"),
        _id: User._id
      })
    })
    this.setState({ Data: filterData });
  }
  render() {
    const UpdateModal = () => (

      <div>
        <span>İşlem Onaylamak veya Reddetmek İstiyor musunuz?</span>
        <br />
        <br />
        <br />
        <div >
          <button className="btn btn-primary" onClick={() => this.IslemOnaylama()} data-dismiss="modal">Onayla</button>{"         "}
          <button className="btn btn-danger" data-dismiss="modal" onClick={() => this.IslemReddet()} >Reddet</button>
        </div>
      </div>

    );
    return (
      <div>
        <DataTableComponent
          NewDataTitle={"Yeni Ürün Tanımı"}
          UpdateDataTitle={"İşlemi Onayla"}
          NewModal={() => <div></div>}
          NewData={false}
          columns={this.state.Columns}
          session={this.props.session}
          data={this.state.Data}
          title={"Ödeme Listesi"}
          filterField={"HareketTuru"}
          UpdateModal={<UpdateModal />}
          UpdateAction={this.IslemOnaylama}
          UpdateData={true}
          DeleteData={false}
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
export default connect(mapStateToProps, mapDispatchToProps)(Odeme);