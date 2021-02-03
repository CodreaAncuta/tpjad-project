import React, { Component } from "react";

export class UserCard extends Component {
    render() {
        return (
            <div className="card card-user">
                <div className="image">
                    <img src={this.props.bgImage} alt="..." />
                </div>
                <div className="content">
                    <div className="author">

                        <h4 className="title text-center">
                            <img
                                className="avatar border-gray center"
                                src={this.props.avatar}
                                alt="..."
                            />
                                <br />
                                {this.props.name}
                                <br />
                                <small>{this.props.userName}</small>
                                <p className="description text-center">{this.props.description}</p>
                            </h4>


                    </div>

                </div>
                <hr />
                <div className="text-center">{this.props.socials}</div>
            </div>
        );
    }
}

export default UserCard;