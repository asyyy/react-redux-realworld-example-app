import { object } from "prop-types";
import React from "react";
class NyTimes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      object: null,
      listArticles: [],
    };
  }

  componentDidMount() {
    fetch(
      "https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=" +
        process.env.REACT_APP_API_KEY
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            object: result,
            listArticles: result.results,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }
  render() {
    const { error, isLoaded, object, listArticles } = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement...</div>;
    } else {
      return (
        <div>
          <div style ={{display:'flex', height :'25%'}}>
            <img src={require('./LogoNYTimes.png')} style={{ height: '25%',width:'25%' }} alt="Logo New York Time"/>
            <h1 style={{fontFamily:'Helvatica', marginTop:'4%'}}>NY Times</h1>
          </div>
          
          
          <ul>
            {listArticles.map((item) => (
              <li>{item.title}</li>
            ))}
          </ul>
        </div>
      );
    }
  }
}
const top ={
  
  height:'25%'
};
export default NyTimes;
