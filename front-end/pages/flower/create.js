import { useState, useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

export default () => {
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [quantityAvailable, setQuantityAvailable] = useState();


  const { doRequest, errors } = useRequest({
    url: '/api/flower',
    method: 'post',
    body: {
      name,
      price,
      quantityAvailable,
      description
    },
    onSuccess: ({ flowerId = 'all' }) => Router.push(`/flower/singleview?flowerId=${flowerId}`)
  });

  const onSubmit = async event => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Create Flower</h1>
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
        <label>Quantity Available</label>
        <input
          value={quantityAvailable}
          onChange={e => setQuantityAvailable(e.target.value)}
          className="form-control"
        />
      </div>
      {errors}
      <button className="btn btn-primary">Create Flower</button>
    </form>
  );
};
