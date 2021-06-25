import './App.css';
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from,} from "@apollo/client";
import {onError} from '@apollo/client/link/error'

import MainPage from './Components/MainPage';
import FakeNewsPage from './Components/FakeNewsPage';
import SentimentPage from './Components/SentimentPage';
import NLPPage from './Components/NLPPage';
import EmotionsScrapPage from './Components/EmotionsScrapPage';
import NewsScrapPage from './Components/NewsScrapPage';


import {BrowserRouter as Router, Route, Switch} from "react-router-dom";



const errorLink = onError(({ graphqlErrors, networkError}) => {
  if (graphqlErrors) {
      graphqlErrors.map(({message, location, path}) =>{
        alert (`Graphql erro ${message}`);
      });
  }
});

const link = from([
  errorLink,
  new HttpLink({uri: "http://127.0.0.1:5000/graphql"})
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link

})


function App() {

  return(
    <ApolloProvider client={client}>
    <Router>

    <Switch>
      
        <Route path={'/'} exact component={MainPage}/>      
        <Route  path={'/detectFakeNews'} exact component={FakeNewsPage}/>
         <Route  path={'/scrapFakeNews'} exact component={NewsScrapPage}/>
         <Route  path={'/scrapEmotions'} exact component={EmotionsScrapPage}/>
       

        <Route  path={'/detectEmotions'} exact component={SentimentPage}/>

                            
        <Route path={'/nlp'} exact component={NLPPage}/>
        
        <Route  exact component={MainPage}/>

    </Switch>


  </Router>
  </ApolloProvider>
  )

}

export default App;
