import _ from 'lodash';
import useRequest from '../../hooks/use-request';
import { useState } from 'react';
import AutoCompleteInput from '../../components/autocomplete';
import Router from 'next/router';

export default () => {

    const [name, setName] = useState('');
    const [discount, setDiscount] = useState(0);
    const [description, setDescription] = useState('');
    const [flowers, setFlowers] = useState([]);
    const [showAutoComplete, setShowAutoComplete] = useState(false);

    const { doRequest: createBouquet, errors } = useRequest({
        url: '/api/bouquet',
        method: 'post',
        body: {
            name,
            discount,
            description,
            flowers : _.map(flowers, f => {
                return { flowerId: f.flowerId, quantity: f.quantity };
            })
        },
        onSuccess: ({ bouquetId }) => Router.push(`/bouquet/singleview?bouquetId=${bouquetId}`)
    })

    const onSubmit = async e => {
        e.preventDefault();
        console.log('lol', {
            name,
            discount,
            description,
            flowers: _.map(flowers, f => {
                return { flowerId: f.flowerId, quantity: f.quantity };
            })
        })
        await createBouquet();
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
        // console.log('FLOWERS QC', flowers);
      }
    
      const addFlower = () => {
        setShowAutoComplete(true);
      }


    return (
        <div>
            <h1>Create Bouquet</h1>
            <hr/>
        <form onSubmit={onSubmit}>
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
          <div className="form-group"> <label>Flowers</label> </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th></th>
                      </tr>
                    </thead>
                  <tbody>
                    {_.map(flowers, (flower, index) => {
                        const quantity = _.get(flower, 'quantity');
                        const name = _.get(flower, 'name');
                        const price = _.get(flower, 'price');
                        return (
                          <tr>
                            <td>{name}</td>
                            <td>
                              <input value={quantity} name="quantity" onChange={e => handleChange(index, e)}/>
                            </td>
                            <td>{price}</td>
                            <td>
                            <button onClick={() => removeIndex(index)} className="btn btn-danger"> X </button>
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
                  <button className="btn btn-primary">Create Bouquet</button>
                  
                </div>
        </form>
        </div>
      );


}