import Link from 'next/link';
import _ from 'lodash';

function _calculatePrice({ flowers }) {
  let price = _.reduce(flowers, (acc, flower) => {
    acc += flower.price;
    return acc;
  }, 0);
  return price;
}

const LandingPage = ({ currentUser, bouquets }) => {
  const bouquetList = _.map(bouquets, (bouquet) => {
    const { flowers, description, name, bouquetId, discount } = bouquet;
    const bouquetPrice = (1 - (parseInt(discount, 10) / 100) ) * _calculatePrice({ flowers });
    return (
      <tr key={bouquetId}>
        <td>{name}</td>
        <td>{description}</td>
        <td>{bouquetPrice}</td>
        <td>
          <Link
          href={{
            pathname: '/bouquet/singleview',
            query: { bouquetId },
          }}
        ><a>see details</a></Link>
        </td>
      </tr>
    );
  });
  console.log('current user', currentUser);

  return (
    <div>
      <h1>Bouquets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>About</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{bouquetList}</tbody>
      </table>
    </div>
  );

};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  let bouquets;
  try {
    const response = await client.get('/api/bouquet');
    bouquets = _.get(response, ['data']);
  } catch (e) {
    const error = _.get(e, ['response', 'data']);
    console.log('AXIOS ERROR: GET /api/bouquet', error);
  }

  return { bouquets };
};

export default LandingPage;
