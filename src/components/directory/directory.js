import React, { Component } from "react";
import "./directory.style.scss";
import MenuItem from "../menu-item/menu-item";

class Directory extends Component {
  constructor() {
    super();
    this.state = {
      sections: [
        {
          title: "hats",
          imageUrl: "",
          id: 1,
          linkUrl: "shop/hats"
        },
        {
          title: "jackets",
          imageUrl: "",
          id: 2,
          linkUrl: "shop/jackets"
        },
        {
          title: "sneakers",
          imageUrl: "",
          id: 3,
          linkUrl: "shop/sneakers"
        },
        {
          title: "womens",
          imageUrl: "",
          size: "large",
          id: 4,
          linkUrl: "shop/womens"
        },
        {
          title: "mens",
          imageUrl: "",
          size: "large",
          id: 5,
          linkUrl: "shop/mens"
        }
      ]
    };
  }

  render() {
    return (
      <div className="directory-menu">
        {this.state.sections.map(({ title, imageUrl, id, size }) => (
          <MenuItem title={title} key={id} imageUrl={imageUrl} size={size} />
        ))}
      </div>
    );
  }
}

export default Directory;
