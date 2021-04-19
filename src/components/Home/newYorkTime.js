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
    this.loadArticles(this.state.activeItem);
  }
  makeApiLink = (category) => {
    this.setState({ activeItem: category });
    switch (category) {
      case "Popular":
        console.log(" make popular");
        return (
          "https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=" +
          process.env.REACT_APP_API_KEY
        );

      case "Recent":
        console.log(" make recent");
        return (
          "https://api.nytimes.com/svc/news/v3/content/nyt/world.json?api-key=" +
          process.env.REACT_APP_API_KEY
        );

      case "Polemic":
        console.log(" make polemic");
        return (
          "https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=" +
          process.env.REACT_APP_API_KEY
        );

      default:
        console.log("makeApiLink() => Unknow category");
        return "Oopsy";
    }
  };
  loadArticles = (category) => {
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
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };
  rightPathToImage = (element) => {
    switch (this.state.activeItem) {
      case "Recent":
        if(element.multimedia && element.multimedia[0]) {
          return <Image avatar src={element.multimedia[0].url} />;
        }else{
          return <Image avatar src={require("../asset/image-not-found.jpg")} />;
        }
      case "Popular": //fall-through
      case "Polemic":
        if (element.media && element.media[0]) {
          return (
            <Image avatar src={element["media"][0]["media-metadata"][0].url} />
          );
        } else {
          return <Image avatar src={require("../asset/image-not-found.jpg")} />;
        }
      default:
        console.log("rightPathToImage() => can't read state");
        return "Oopsy";
    }
  };
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
        <div style={{ textAlign: "center" }}>
          <Menu size="massive" pointing compact>
            <Menu.Item
              name="Recent"
              active={activeItem === "Recent"}
              onClick={() => this.loadArticles("Recent")}
            />
            <Menu.Item
              name="Popular"
              active={activeItem === "Popular"}
              onClick={() => this.loadArticles("Popular")}
            />
            <Menu.Item
              name="Polemic"
              active={activeItem === "Polemic"}
              onClick={() => this.loadArticles("Polemic")}
            />
          </Menu>
        </div>

        <Divider />
        <Container style={{ maxHeight: 400, overflow: "auto" }}>
          <List>
            {listArticles.map((element, index) => (
              <List.Item key={index}>
                <a href={element["url"]}>
                  <List.Content>
                    <List.Header>
                      {/* <Image avatar src={element.multimedia[0].url} /> */}
                      {this.rightPathToImage(element)}
                      {element.title}
                    </List.Header>
                    <List.Description>
                      {element.abstract ? (
                        element.abstract
                      ) : (
                        <i>No description</i>
                      )}
                    </List.Description>
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
