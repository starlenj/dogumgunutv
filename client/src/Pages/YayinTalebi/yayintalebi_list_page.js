import SetStreamUser from '../../Component/YayinTalebi/SetStreamUser'
import { useState } from 'react';
const YayinTalebiList = ({ OrderList }) => {
    const [selectOrder, setSelectOrder] = useState([]);
    const SetOrderPayment = async (Order) => {
        console.log(Order)
    }
    return (
        < div class="container" >
            <div class="iq-card">
                <div class="iq-card-header d-flex justify-content-between">
                    <div class="iq-header-title">
                        <h4 class="card-title">Geçmiş Yayın Taleplerim</h4>
                    </div>
                </div>
                <div class="iq-card-body">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>

                                    <th scope="col">#</th>
                                    <th scope="col">Tarih</th>
                                    <th scope="col">Yayın İçeriği</th>
                                    <th scope="col">Durumu</th>
                                    <th scope="col">Yayın İşlemleri</th>

                                </tr>

                            </thead>
                            <tbody>
                                {
                                    OrderList && OrderList.map((Order, index) => (
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{Order.Date}</td>
                                            <td>{Order.ProductName}</td>
                                            <td>{Order.Status === true ? "Onaylandı" : "Onay Bekliyor"}</td>
                                            <td>
                                                {Order.Status === true ?
                                                    <button className="btn btn-primary" data-toggle="modal" data-target="#OrderUser" onClick={() => setSelectOrder(Order)}>İzleyici Ekle</button>

                                                    : <button className="btn btn-danger" onClick={() => SetOrderPayment(Order)}>Ödeme Yap</button>

                                                }
                                            </td>

                                        </tr>
                                    ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="OrderUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">İzleyici Ekleme</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <SetStreamUser UserCount={selectOrder.StreamCount || 1} />
                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default YayinTalebiList;