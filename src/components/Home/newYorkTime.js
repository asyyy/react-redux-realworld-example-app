import { object } from 'prop-types';
import React from 'react';
class NyTimes extends React.Component {
    
    constructor(props){
       
        super(props);
        this.state = {
            error : null,
            isLoaded  : false,
            object: null,
            listArticles: [],
        };
    }


    componentDidMount(){
        
        fetch("https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key="+process.env.REACT_APP_API_KEY)
        .then(res => res.json())
        .then(
            
            (result) => {
                this.setState({
                    isLoaded : true,
                    object : result,
                    listArticles : result.results,
                    
                });
        },
            (error) => {
                this.setState({
                    isLoaded : true,
                    error
                });
            }
        )
    }
    render() {
        
        const{error,isLoaded,object,listArticles} = this.state
        if(error){
            return <div>Erreur : {error.message}</div>
        }else if(!isLoaded){
            return <div>Chargement...</div>
        }else{   
            return (
                <div>
                    <h3>{object.status}</h3>
                    <h3>{object.copyright}</h3>
                    <h3>{object.num_results}</h3>
                <ul> 
                    {listArticles.map(item =>(
                        <li>{item.title}</li>
                    ))

                    }
                </ul>
                </div>
            )
        }
    }
}
export default NyTimes;