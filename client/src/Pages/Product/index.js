import { Component } from "react";
import { connect } from "react-redux";
import DataTableComponent from "../../Component/DataTable";
import { List, Post, Put, Delete, Get } from "../../Helper/Service";
import { SetSelectData } from "../../Redux/Action/DataTable";
import EditForm from "../../Component/Forms/Product/Edit";
import NewForm from "../../Component/Forms/Product/New";
import { toast } from "react-toastify";

class Product extends Component {
  state = {
    Data: [],
    Columns: [],
    SelectUser: [],
    UpdateStatus: false,
    DeleteStatus: false,
    EditStatsus: true,
    ProductImage: "",
  };
  constructor(props) {
    super(props);
    this.HandleInput = this.HandleInput.bind(this);
    this.HandleSubmit = this.HandleSubmit.bind(this);
    this.HandleDelete = this.HandleDelete.bind(this);
    this.ImageUpload = this.ImageUpload.bind(this);
  }
  HandleInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  async HandleDelete() {
    const response = await Delete(
      "Product",
      this.props.DataTableReducer.SelectData._id
    );
    if (response) {
      toast.success("İşlem Başarılı");
      setTimeout(() => window.location.reload(), 2000);
    }
  }
  async HandleSubmit(value) {
    let response = await Post("Product", value);
    if (response) {
      toast.success("İşlem Başarılı");
      setTimeout(() => window.location.reload(), 2000);
    }
  }

  async HandleUpdate(value) {
    let response = await Put("Product", value, value._id);
    if (response) {
      toast.success("İşlem Başarılı");
      setTimeout(() => window.location.reload(), 2000);
    }
  }
  async componentDidMount() {
    await this.GetDataTable();

    const Columns = [
      {
        name: "Adı",
        selector: "Name",
        sortable: true,
      },
      {
        name: "Kategori",
        selector: "Category",
        sortable: true,
      },
      {
        name: "Fiyatı",
        selector: "Price",
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
    const ProductData = await List("Product");
    const ProductFilterData = [];
    ProductData.map(async (Product) => {
      let response = await Get("Category", Product.CategoryId);
      ProductFilterData.push({
        ...Product,
        Category: Product.CategoryId,
      });
      this.setState({ Data: ProductFilterData });
    });
  }
  async ImageUpload(e) {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    let ResponseImageUpload = await Post("UploadImage", formData);
    this.setState({ ProductImage: ResponseImageUpload.filename });
    let UploadImage = await Post("ProductImageUpload", { ProfilePicture: this.state.ProductImage, id: this.props.DataTableReducer.SelectData._id });
    setTimeout(() => { window.location.reload() }, 2000)
  }
  render() {
    const { SelectData } = this.props.DataTableReducer;
    const NewModal = () => <NewForm onSubmit={this.HandleSubmit} />;
    const UpdateModal = () => (
      <div className="column">
        {this.state.EditStatsus === true && (
          <div className="form-group">
            <label>Name : </label>
            <input
              type="text"
              className="form-control"
              name="Name"
              value={SelectData.Name}
              onChange={this.HandleInput}
              readOnly={true}
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
            onSubmit={this.HandleUpdate}
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
        <div>
          <div className="form-group">
            <label>Ürün Resmi</label>
            <input type="file" className="form-control" onChange={this.ImageUpload} />
          </div>
        </div>
      </div>
    );
    return (
      <div>
        <DataTableComponent
          NewDataTitle={"Yeni Ürün Tanımı"}
          UpdateDataTitle={"Ürün Düzenle"}
          NewModal={<NewModal />}
          columns={this.state.Columns}
          session={this.props.session}
          data={this.state.Data}
          title={"Ürün Listesi"}
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
export default connect(mapStateToProps, mapDispatchToProps)(Product);
