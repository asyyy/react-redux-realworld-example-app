import React from "react";
import { Image, Segment, Menu, Input,Container } from "semantic-ui-react";
class NyTimes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      listArticles: [],
      activeItem: "Recent",
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
  makeApiLink = (category) => {
    switch (category) {
      case "popular":
        return (
          "https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=" +
          process.env.REACT_APP_API_KEY
        );

      case "recent":
        return (
          "https://api.nytimes.com/svc/news/v3/content/nyt/world.json?api-key=" +
          process.env.REACT_APP_API_KEY
        );

      case "polemic":
        return (
          "https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=" +
          process.env.REACT_APP_API_KEY
        );

      default:
        console.log("Unknow category");
        return "Oopsy";
    }
  };
  loadArticles = (category) => {
    console.log("loadArticles() : " + category);
    let link = this.makeApiLink(category);
    fetch(link)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            listArticles: result.results,
          });
        },
        (error) => {
          console.log(error.status);
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  render() {
    const { error, isLoaded, listArticles, activeItem } = this.state;
    return (
      <Menu fluid vertical>
        <Menu.Header>
          <Image
            src={require("../asset/LogoNYTimes.png")}
            style={{ height: "25%", width: "25%" }}
            verticalAlign="middle"
          />
          
          <span style={{ fontFamily: "Helvatica", fontSize: "270%" }}>
            NY Times
          </span>
        </Menu.Header>
        <Menu.Item>
          <Input icon="search" placeholder="Search..." />
        </Menu.Item>
        <Menu pointing size='massive'>
          <Menu.Item
            name="Recent" 
            active={activeItem === "Recent"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="Popular"    
            active={activeItem === "Popular"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="Polemic"
            active={activeItem === "Polemic"}
            onClick={this.handleItemClick}
          />
        </Menu>        
        <Container text fluid>
          <p> truzecijurhurziozjciozhuihfdogfdjkghfdjkgfdhgifdhjkgfdjgkdfgjkfhgjkfdghfdjkhfdjkgfdjkfdjkfdhjkfdhgkjf</p>
        </Container>
      </Menu>
    );
    //   if (error) {
    //     return <div>Erreur : {error.message}</div>;
    //   } else if (!isLoaded) {
    //     return <div>Chargement...</div>;
    //   } else {
    //     return (
    //       <div>

    //         <div className="header">

    //           <Image
    //             src={require("../asset/LogoNYTimes.png")}
    //             style={{ height: "25%", width: "25%" }}
    //             verticalAlign='bottom'
    //           />{''}
    //           <span style={{ fontFamily: "Helvatica",fontSize:'270%'}} > NY Times </span>

    //         </div>
    //         <Divider/>
    //         <div className="filters">

    //            <Button.Group  size ='tiny'>
    //               <Button onClick={() => this.loadArticles('recent')} content ='Recent' color='blue'/>
    //               <Button.Or text='or'/>
    //               <Button onClick={() => this.loadArticles('popular')} content ='Popular'/>
    //               <Button.Or text='or'/>
    //               <Button onClick={() => this.loadArticles('polemic')} content ='Polemic' color='red' />
    //            </Button.Group>

    //           </div>

    //         <div className="articles" style={{marginTop:'5%'}}>
    //           <ul>
    //             {listArticles.map((item) => (
    //               <li key={item.title}>{item.title}</li>
    //             ))}
    //           </ul>
    //         </div>
    //       </div>

    //     );
    //   }
  }
}
export default NyTimes;
