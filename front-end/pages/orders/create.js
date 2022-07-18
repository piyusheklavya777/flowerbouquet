import _ from 'lodash';
import { useState } from 'react';
import BouquetAutoComplete from '../../components/order/bouquet-autocomplete';
import useRequest from '../../hooks/use-request';
import BouquetOrderPageView from '../../components/order/show-bouquet';
import Router from 'next/router';

export default () => {
    const [bouquets, setBouquets] = useState([]);
    let newBouquets;

    const { doRequest: createOrder, errors } = useRequest({
        url: '/api/order',
        method: 'post',
        body: {
            // bouquets: newBouquets,
        },
        onSuccess: () => Router.reload(`/orders/all`)
    })

    const onSubmit = async e => {
        e.preventDefault();

        newBouquets = _.map(bouquets, (bouquet) => {
            return {
                bouquetId: bouquet.bouquetId,
                name: bouquet.name,
                flowers: bouquet.flowers.map(({flowerId, quantity}) => { return {flowerId, quantity} })
            };
        });
        console.log({placingOrdersFor: newBouquets});
        await createOrder({ bouquets: newBouquets });
    }

    // const removeIndex = (i) => {
    //     let newFlowers = [...flowers];
    //     newFlowers.splice(i,1);
    //     setFlowers(newFlowers);
    //     // console.log('FLOWERS RF', flowers);
    //   }
    
    //   const handleChange = (i, e) => {
    //     let newFlowers = [...flowers];
    //     newFlowers[i][e.target.name] = e.target.value;
    //     setFlowers(newFlowers);
    //     // console.log('FLOWERS QC', flowers);
    //   }
    
    return (
        <div>
            <form onSubmit={onSubmit}>
                {bouquets.map((bouquet, index) => <BouquetOrderPageView bouquets={bouquets} setBouquets={setBouquets} index={index}/>)}
                <hr/>
                <BouquetAutoComplete allBouquets={bouquets} setBouquets={setBouquets}/>
                { bouquets.length > 0 && <button className="btn btn-primary">Place Order</button>}
                {errors}
            </form>
        </div>
    )
}