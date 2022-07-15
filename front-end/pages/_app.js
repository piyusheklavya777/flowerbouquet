import 'bootstrap/dist/css/bootstrap.css';
import _ from 'lodash';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  let currentUser;
  try {
    const response = await client.get('/api/users/current-user');
    currentUser = _.get(response, ['data']);
  } catch (e) {
    const error = _.get(e, ['response', 'data']);
    console.log('AXIOS ERROR: GET /api/users/current-user', error);
  }

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      currentUser
    );
  }
  return { pageProps, currentUser };
  // return JSON.parse(JSON.stringify({ pageProps, currentUser }))

};

export default AppComponent;
