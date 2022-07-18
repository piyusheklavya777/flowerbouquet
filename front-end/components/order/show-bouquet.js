import { useState } from "react";

export default ({ bouquets, setBouquets, index}) => {
    // const bouquet = 
    console.log({ name:bouquets[index].name, bouquets, index, })
    const bouquet = bouquets[index];

    const { name, discount } = bouquet; 
    const [flowers, setFlowers] = useState(bouquet.flowers);

    const handleChange = (i, e) => {
        let newFlowers = [...flowers];
        console.log('changing flowers count here', { loc: newFlowers[i] })
        newFlowers[i][e.target.name] = e.target.value;
        setFlowers(newFlowers);
        bouquet.flowers = flowers;
        const newBouquets = [...bouquets]
        newBouquets.splice(index, 1);
        setBouquets([...newBouquets, bouquet]);
      }

    return (
        <div className="card">
            <div className="card-body">
                <h4>{name}</h4>
                <h5>Discount: {discount}%</h5>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                {flowers.map(({flowerId, name, quantity}, index) => {
                    return (
                        <tbody>
                            <tr index={flowerId}>
                                <td>{name}</td>
                                <td><input value={quantity} name="quantity" onChange={e => handleChange(index, e)}/></td>
                            </tr>
                        </tbody>
                    )
                })}
                </table>
            </div>

        </div>
    )

}