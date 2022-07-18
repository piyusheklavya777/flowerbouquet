import Router from "next/router";
import useRequest from "../../hooks/use-request";
export default ({ orderId }) => {

    const { doRequest, errors } = useRequest({
        url: `/api/order/${orderId}`,
        method: 'delete',
        onSuccess: () => Router.push('/orders/all'),
      });

    const cancelOrder = async () => {
        // console.log('Bouquet', { bouquetId });
        await doRequest();
    }

    return (<button onClick={() => cancelOrder()} className="btn btn-danger">
        Cancel
     </button>)

}