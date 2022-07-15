import _ from 'lodash';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import Link from 'next/link';
import { useState, useEffect } from 'react';

function _calculatePrice({ flowers, discount }) {
  let price = _.reduce(flowers, (acc, flower) => {
    acc += flower.price;
    return acc;
  }, 0);
  return (1 - (parseInt(discount, 10) / 100 ) ) * price;
}



const Bouquet = ({ bouquet }) => {
  const { belongsToThisUser } = bouquet;
  const [name, setName] = useState(bouquet.name);
  // const [flowers, setFlowers] = useState(bouquet.flowers);
  const [discount, setDiscount] = useState(bouquet.discount);
  const [price, setPrice] = useState(_calculatePrice({flowers, discount }));
  const [description, setDescription] = useState(bouquet.description);
  const [bouquetId, setBouquetId] = useState(bouquet.bouquetId);
  const [editBouquet, setEditBouquet] = useState(false);
  

  const { doRequest, errors } = useRequest({
    url: `/api/bouquet/${bouquetId}`,
    method: 'put',
    body: {
      name,
      description,
      discount,
      flowers: _.map(bouquet.flowers, ({flowerId, quantity}) => {return { flowerId, quantity}})
    },
    onSuccess: () => {
        Router.push('/');
    }
  });

  const onEditSubmit = async event => {
    event.preventDefault();
    await doRequest();
  };

  const flowerList = _.map(flowers, (flower) => {
    const name = _.get(flower, 'name');
    const quantity = _.get(flower, 'quantity');
    const flowerId = _.get(flower, 'flowerId');
    const price = _.get(flower, 'price');
    return (
      <tr key={flowerId}>
        <td>{name}</td>
        <td>{quantity}</td>
        <td>{quantity * price}</td>
        <td>
          <Link
          href={{
            pathname: '/flower/singleview',
            query: { flowerId },
          }}
        ><a>flower details</a></Link>
        </td>
      </tr>
    );
  });

  const setEditFields = ({bouquet}) => {
    setEditBouquet(!editBouquet)
    
    setBouquetId(bouquet?.bouquetId);
    setName(bouquet?.name);
    setDiscount(bouquet?.discount);
    setDescription(bouquet?.description);
}

  if (editBouquet) {
    return (
      <div>
            <form onSubmit={onEditSubmit}>
                <h1>Edit Bouquet</h1>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Discount</label>
                    <input
                        value={discount}
                        onChange={e => setDiscount(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Flowers</label>
                    <input
                        value={flowers}
                        onChange={e => setFlowrs(e.target.value)}
                        className="form-control"
                    />
                </div>
                {errors}
                <button className="btn btn-primary">Submit Changes</button>
            </form>
            <hr></hr>
            <button className="btn btn-secondary" onClick={() => setEditBouquet(false)}>Exit Edit</button>
        </div>
    )
  }
  return (
    <div>
      <h1>{name}</h1>
      <hr></hr>
      <h4>{description}</h4>
      <h3>Discounted Price: {price}</h3>
      <h2>Flowers: </h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Links</th>
          </tr>
        </thead>
        <tbody>
          {flowerList}
        </tbody>
      </table>
      {belongsToThisUser && <button onClick={() => setEditFields({ bouquet })} className="btn btn-primary">
              Edit
              </button>}
      {errors}
    </div>
  );
}

Bouquet.getInitialProps = async (context, client) => {
  const bouquetId = _.get(context, ['query', 'bouquetId']);
  try {
    const response = await client.get(`/api/bouquet/${bouquetId}`);
    const bouquet = _.get(response, 'data');
    console.log('get init', bouquet);
    return { bouquet };
  } catch(e) {
    const error = _.get(e, ['response','data', 'error']);
    console.log(`AXIOS ERROR GET /api/bouquet/${bouquetId}`,error);
  }

}

export default Bouquet;
