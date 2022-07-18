import _ from "lodash";
import OrderCancelBtn from "../../components/order/order-cancel-btn";
const Orders = ({orders}) => {

    return (
        <div>
            <h1> Orders </h1>
            <div>
                {_.map(orders, (order, index) => {
                    const status = _.get(order, 'status');
                    const price = _.get(order, 'price');
                    const bouquetsData = _.get(order, 'bouquets');
                    const orderId = _.get(order, 'id')
                    const bouquets = _.map(bouquetsData, (bouquet, index) => {
                        const name = _.get(bouquet, 'name');
                        const flowersData = _.get(bouquet, 'flowers');
                        const flowers = _.map(flowersData, (flower) => {
                            const name = _.get(flower, 'name');
                            const price = _.get(flower, 'price');
                            const quantity = _.get(flower, 'quantity');
                            return (
                               <tbody>
                                    <td>{name}</td>
                                    <td>{quantity}</td>
                                    <td>{price * quantity}</td>
                               </tbody>
                            )
                        })
                        return (
                            <div>
                                <h4>{name}</h4>
                                <table className="table">
                                    <thead>
                                        <th>Name</th>
                                        <th>Quantity</th>
                                        <th>Total Cost</th>
                                    </thead>
                                    {flowers}
                                </table>
                                
                            </div>
                        )
                    })
                    return (
                        <div>
                            <hr/>
                            <label>Order Id: {orderId} </label>
                            <h6> Status: {status}</h6>
                            <h5>total price: {price}</h5>
                            {status === 'created' && <OrderCancelBtn orderId={orderId}></OrderCancelBtn>}
                            <h3>Bouquets</h3>
                            {bouquets}
                        </div>
                    )
                    
                })}
            </div>
        </div>
    )


}
Orders.getInitialProps = async (context, client) => {
    try {
      const response = await client.get(`/api/order`);
      const orders = _.get(response, 'data');
      console.log('FLOWERS', orders)
      return { orders };
    } catch(e) {
      const error = _.get(e, ['response','data', 'error']);
      console.log(`AXIOS ERROR GET /api/flower`,e);
    }
  
}

export default Orders;