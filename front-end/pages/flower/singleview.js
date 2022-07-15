import _ from 'lodash';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const Flower = ({ flower }) => {
  const { flowerId, name, description, price, quantityAvailable, creatorName, belongsToThisUser } = flower;

  const { doRequest, errors } = useRequest({
    url: `/api/flower/${flowerId}`,
    method: 'delete',
    onSuccess: () => {
        Router.push('/flower/all');
    }
  });

  return (
    <div>
      <h1>Name: {name}</h1>
      <hr></hr>
      <h2>{description}</h2>
      <h3>Price: {price}</h3>
      <h3>Inventory: {quantityAvailable}</h3>
      <h4>supplied by: {creatorName}</h4>
      {belongsToThisUser && <button onClick={() => doRequest()} className="btn btn-danger">
        Delete
      </button>}
      {errors}
    </div>
  );
}

Flower.getInitialProps = async (context, client) => {
  const flowerId = _.get(context, ['query', 'flowerId']);
  try {
    const response = await client.get(`/api/flower/${flowerId}`);
    const flower = _.get(response, 'data');
    return { flower };
  } catch(e) {
    const error = _.get(e, ['response','data', 'error']);
    console.log(`AXIOS ERROR GET /api/flower/${flowerId}`,error);
  }

}

export default Flower;
