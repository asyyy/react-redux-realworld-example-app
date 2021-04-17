import React from "react";
import {
  Image,
  Divider,
  Menu,
  Input,
  List,
  Grid,
  Container,
} from "semantic-ui-react";
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
    this.loadArticles("recent");
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
            size="tiny"
            verticalAlign="middle"
          />

          <span
            style={{
              fontFamily: "Helvatica",
              fontSize: "250%",
              textAlign: "center",
            }}
          >
            NY Times
          </span>
        </Menu.Header>
        <Menu.Item>
          <Input icon="search" placeholder="Search..." />
        </Menu.Item>
        <div style={{textAlign:'center'}}>
        <Menu  pointing compact size="massive">
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
        </div>
        

        <Divider />
        <Container style={{maxHeight: 300, overflow: 'auto'}}>
          {console.log("NUmber " + listArticles.length)}
          <List>
            {listArticles.map((element,index) => (
              <List.Item key={index}>
                <a href={element.url}>
                  <List.Content>
                    <List.Header>
                      <Image avatar src={require("../asset/LogoNYTimes.png")} />
                      {element.title}
                    </List.Header>
                    <List.Description>{element.abstract}</List.Description>
                  </List.Content>
                </a>
                <Divider />
              </List.Item>
              
            ))}
          </List>
        </Container>
      </Menu>
    );
  }
}
export default NyTimes;
