import { useEffect, useState } from 'react';
import { Post, List, Get } from '../../Helper/Service';
import { toast } from 'react-toastify';
import moment from 'moment';
import YayinTalebiList from '../../Pages/YayinTalebi/yayintalebi_list_page';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const Yayintalebi_form = (props) => {
    //states
    const [ProductState, SetProduct] = useState([])
    const [SelectProduct, SetSelectProduct] = useState([]);
    const [phone, setPhone] = useState("");
    const [date, setDate] = useState("");
    const [UserSession, SetUserSession] = useState([]);
    const [OrderList, SetOrderList] = useState([]);
    //initialize

    useEffect(() => {
        props.Oturum.then((resp) => {
            const GetOrderList = Post("GetUserOrder", { UserId: resp.data.data.data._id });
            GetOrderList.then((response) => SetOrderList(response))
            SetUserSession(resp.data.data.data)
        });
        const getProduct = List("Product");
        getProduct.then((response) => {
            SetProduct(response)
        })

    }, [])
    ///Functions
    const DateChange = async (e) => {
        //check date is avaible
        if (moment(e.target.value).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")) {
            toast.error("Talep günü bir sonraki gün olmalıdır ");
        }
        var checkDate = await Post("GetDateIsAvaible", { Date: moment(e.target.value).format("YYYY-MM-DD HH") })
        if (checkDate.data) {
            toast.error("Talep günü ya da saatinde yayın mevcuttur ");
        }
        setDate(e.target.value);
    }


    const ProductSelect = async (e) => {
        let GetProductDetail = await Get('Product', e.target.value);
        SetSelectProduct(GetProductDetail);
    }
    const SendRequest = async () => {
        if (phone === "" && date === "") {
            toast.error("Telefon ve Tarih zorunludur");
        }
        else if (phone === "") {
            toast.error("Telefon Zorunludur");
        }
        else if (date === "") {
            toast.error("Tarih Zorunludur")
        } else {

            let OrderHeader = Post("OrderBody", {
                UserId: UserSession._id,
                ProductId: SelectProduct._id,
                ProductName: SelectProduct.Name,
                Price: SelectProduct.Price,
                Date: moment(date).format("YYYY-MM-DD HH:mm:ss"),
                Phone: phone
            })
            if (OrderHeader) {
                toast.success("Yayın talebiniz işleme alınmıştır..");
                setTimeout(() => { window.location.reload() }, 2000);
            }
        }

    }
    return (
        <div id="content-page" class="content-page">
            <div class="container">
                <div class="row">
                    <div class="iq-card iq-card-block iq-card-stretch iq-card-height">
                        <div class="iq-card-body">
                            <p style={{ fontWeight: "bold", color: "red" }}>Lütfen Yayın Talep Tarih ve Saatinizi Bir Gün Önceden Belirtiniz..</p>
                            <form class="form-horizontal" >
                                <div class="form-group row">
                                    <label class="control-label col-sm-2 align-self-center mb-0" for="email">Yayın Tarihi:</label>
                                    <div class="col-sm-10">
                                        <input type="datetime-local" class="form-control" id="exampleInputdatetime" onChange={DateChange} />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="control-label col-sm-2 align-self-center mb-0" for="email">İletişim Numarası:</label>
                                    <div class="col-sm-10">
                                        <PhoneInput
                                            defaultCountry={"TR"}
                                            countries={["TR"]}
                                            placeholder="Enter phone number"
                                            value={phone}
                                            onChange={setPhone} />
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="control-label col-sm-2 align-self-center mb-0" for="pwd1">Seçenekler:</label>
                                    <div class="col-sm-10">
                                        <select className="form-control" onChange={ProductSelect}>
                                            <option>---Lütfen Paket Seçiniz---</option>
                                            {
                                                ProductState.length > 0 &&
                                                ProductState.map((Product) => (
                                                    <option value={Product._id}>{Product.Name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                {
                                    SelectProduct.Name && (
                                        <div class="col-lg-6 col-md-6 col-sm-12">
                                            <div class="iq-card">
                                                <div class="iq-card-body border text-center rounded">
                                                    <span class="font-size-16 text-uppercase">{SelectProduct.Name}</span>
                                                    <h2 class="mb-4 display-4 font-weight-bolder ">{parseFloat(SelectProduct.Price).toFixed(2)} <small class="font-size-14 text-muted">TL</small></h2>
                                                    <ul class="list-unstyled line-height-4 mb-0">
                                                        {SelectProduct.Info}
                                                    </ul>

                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                <div class="form-group">
                                    <button type="button" class="btn btn-primary" onClick={() => SendRequest()}>Başvur</button>
                                </div>

                            </form>
                        </div>
                    </div>
                    <YayinTalebiList Oturum={props.Oturum} OrderList={OrderList.data} />
                </div>
            </div>

        </div >

    )
}

export default Yayintalebi_form;