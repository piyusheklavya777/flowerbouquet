import Router from "next/router";
import useRequest from "../hooks/use-request";
export default ({ bouquetId }) => {

    const { doRequest, errors } = useRequest({
        url: `/api/bouquet/${bouquetId}`,
        method: 'delete',
        onSuccess: () => Router.push('/'),
      });

    const deleteBouquet = async () => {
        console.log('Bouquet', { bouquetId });
        await doRequest();
    }

    return (<button onClick={() => deleteBouquet()} className="btn btn-danger">
        Delete
     </button>)

}