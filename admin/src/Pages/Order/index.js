import { Component } from "react";
import DataTableComponent from "../../Component/DataTable";
import { List, Post, Put, Delete, Get } from "../../Helper/Service";

export default class Order extends Component {
  state = {
    Data: [],
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
      {
        name: "Durumu",
        selector: "Status",
        sortable: true,
      },
    ];
    this.setState({ Columns });
  }
  async GetDataTable() {
    const OrderHeaderData = await List("OrderHeader");
    const ProductFilterData = [];
    OrderHeaderData.map(async (OrderHeader) => {
      let response = await Get("OrderBody", OrderHeader._id);
      ProductFilterData.push({
        ...OrderHeader,
        OrderBody: response,
      });
      this.setState({ Data: ProductFilterData });
    });
  }
  render() {
    return (
      <div>
        <DataTableComponent
          NewDataTitle={"Yeni Ürün Tanımı"}
          UpdateDataTitle={"Ürün Düzenle"}
          NewModal={() => <div></div>}
          NewData={false}
          columns={this.state.Columns}
          session={this.props.session}
          data={this.state.Data}
          title={"Sipariş Listesi"}
          filterField={"ProductName"}
          UpdateModal={() => <div></div>}
          UpdateAction={this.UpdateUser}
        />
      </div>
    );
  }
}
