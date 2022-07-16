import _ from 'lodash';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import Link from 'next/link';
import { useState } from 'react';
import AutoCompleteInput from '../../components/autocomplete';
import BouquetDeleteBtn from '../../components/bouquet-delete-btn';

function _calculatePrice({ flowers, discount }) {
  let price = _.reduce(flowers, (acc, flower) => {
    acc += (flower.price * flower.quantity);
    return acc;
  }, 0);
  return (1 - (parseInt(discount, 10) / 100 ) ) * price;
}

const Bouquet = ({ bouquet }) => {
  const { belongsToThisUser } = bouquet;
  const [name, setName] = useState(bouquet.name);
  const [flowers, setFlowers] = useState(bouquet.flowers);
  const [discount, setDiscount] = useState(bouquet.discount);
  const [price, setPrice] = useState(_calculatePrice({flowers, discount }));
  const [description, setDescription] = useState(bouquet.description);
  const [bouquetId, setBouquetId] = useState(bouquet.bouquetId);
  const [editBouquet, setEditBouquet] = useState(false);

  const [showAutoComplete, setShowAutoComplete] = useState(false);

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

  const removeIndex = (i) => {
    let newFlowers = [...flowers];
    newFlowers.splice(i,1);
    setFlowers(newFlowers);
    // console.log('FLOWERS RF', flowers);
  }

  const handleChange = (i, e) => {
    let newFlowers = [...flowers];
    newFlowers[i][e.target.name] = e.target.value;
    setFlowers(newFlowers);
    setPrice(_calculatePrice({ flowers, discount }))
    // console.log('FLOWERS QC', flowers);
  }

  const addFlower = () => {
    setShowAutoComplete(true);
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
                </div>
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
                    {flowers.map(({name, quantity, price}, index) => {
                        return (
                          <tr>
                            <td>{name}</td>
                            <td>
                              <input value={quantity} name="quantity" onChange={e => handleChange(index, e)}/>
                            </td>
                            <td>{price}</td>
                            <td>
                            <button onClick={() => removeIndex(index)} className="btn btn-danger">Remove</button>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
                {errors}
                { showAutoComplete && <AutoCompleteInput allFlowers={flowers} setFlowers={setFlowers} setShowAutoComplete={setShowAutoComplete}></AutoCompleteInput>}
                <div className="button-section">
                  <button className="btn btn-primary " type="button" onClick={() => addFlower()}>Add New Flower</button>
                  <button className="btn btn-primary">Submit Changes</button>
                  
                </div>
                
            </form>
            <hr></hr>
            <button className="btn btn-secondary" onClick={() => {setEditBouquet(false); Router.reload(`/bouquet/singleview?bouquetId=${bouquetId}`);}}>Exit Edit</button>
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
      {belongsToThisUser && <BouquetDeleteBtn bouquetId={bouquetId}/>}
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
