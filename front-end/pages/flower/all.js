import Link from 'next/link';
import _ from 'lodash';
import { useState } from 'react';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';

const Flowers = ({ flowers }) => {
    // edit logic
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [addQuantity, setAddQuantity] = useState(0);
    const [flowerId, setFlowerId] = useState();
    const [editFlower, setEditFlower] = useState(false);

    const { doEditRequest, errors } = useRequest({
        url: `/api/flower/${flowerId}`,
        method: 'put',
        body: {
          name,
          price,
          description,
          quantityAdded: addQuantity > 0 ? addQuantity : undefined,
        },
        onSuccess: () => {
            Router.push('/flower/all');
            setEditFields(false);

        }
      });

    
      const onEditSubmit = async event => {
        event.preventDefault();
        await doEditRequest();
      };

    const editFlowerForm = 
        <div>
            <form onSubmit={onEditSubmit}>
                <h1>Edit Flower</h1>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        value={price}
                        onChange={e => setPrice(e.target.value)}
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
                    <label>Add to the Inventory</label>
                    <input
                        value={addQuantity}
                        onChange={e => setAddQuantity(e.target.value)}
                        className="form-control"
                    />
                </div>
                {errors}
                <button className="btn btn-primary">Submit</button>
            </form>
            <hr></hr>
            <button className="btn btn-secondary" onClick={() => setEditFlower(false)}>Exit Edit</button>
        </div>

    // edit logic ends

    const setEditFields = ({flower}) => {
        setEditFlower(!editFlower)
        
        setFlowerId(flower?.flowerId);
        setName(flower?.name);
        setPrice(flower?.price);
        setDescription(flower?.description);
    }
    // return <div>flooo</div>
    const flowerList = _.map(flowers, (flower) => {
        const name = _.get(flower, 'name');
        const quantityAvailable = _.get(flower, 'quantityAvailable');
        const flowerId = _.get(flower, 'flowerId');
        const price = _.get(flower, 'price');
        const belongsToThisUser = _.get(flower, 'belongsToThisUser');

        return (
            <tr key={flowerId}>
              <td>{name}</td>
              <td>{quantityAvailable}</td>
              <td>{price}</td>
              <td>
                <Link
                href={{
                  pathname: '/flower/singleview',
                  query: { flowerId },
                }}
              ><a>flower details</a></Link>
              </td>
              <td>
                {!editFlower && belongsToThisUser && <button onClick={() => setEditFields({ flower })} className="btn btn-primary">
                    Edit
                </button>}
              </td>
            </tr>
          );

    });


    return <div>
            <button className="btn btn-primary" onClick={() => Router.push('/flower/create')}>Add Flower</button>
            {editFlower && editFlowerForm}
            <hr></hr>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Inventory</th>
                        <th>Price</th>
                        <th>Links</th>
                        <th></th>
                    </tr>
            </thead>
            <tbody>{flowerList}</tbody>
            </table>
        
    </div>

};

Flowers.getInitialProps = async (context, client) => {
    try {
      const response = await client.get(`/api/flower`);
      const flowers = _.get(response, 'data');
    //   console.log('FLOWERS', flowers)
      return { flowers };
    } catch(e) {
      const error = _.get(e, ['response','data', 'error']);
      console.log(`AXIOS ERROR GET /api/flower`,e);
    }
  
  }

export default Flowers;
