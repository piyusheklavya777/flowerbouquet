import 'bootstrap/dist/css/bootstrap.css';

const AppComponent = ({ Component, pageProps, currentUser }) => {
    return (
      <div>
        {/* <Header currentUser={currentUser} /> */}
        <Component {...pageProps} />
      </div>
    );
  };

  export default AppComponent;