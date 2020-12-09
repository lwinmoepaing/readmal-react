import { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import Head from 'next/head';
import Router from 'next/router'

// Router Change Loading
import Nprogress from 'nprogress'

// Redux 
import { wrapper } from '../store/configStore'

// Material Ui 
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import "react-multi-carousel/lib/styles.css";
import theme from './theme'; 

Router.onRouteChangeStart = () => Nprogress.start()
Router.onRouteChangeComplete = () => Nprogress.done()
Router.onRouteChangeError = () => Nprogress.done()

const MyApp = (props) => {
  const { Component, pageProps, store } = props;

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Fragment>
      <Head>
        {/* PWA primary color */}
        <title>Readmal | Touch Story Platform </title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </Fragment>
  );
}

MyApp.getInitialProps = async ({Component, ctx}) => {
  return {
      pageProps: {
          // Call page-level getInitialProps
          ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
          // Some custom thing for all pages
          pathname: ctx.pathname,
      },
  };
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default wrapper.withRedux(MyApp)