import Router from "next/router";
import Link from "next/link";
import { Component } from "react";
import { createContact, updateContact } from "../util/contacts";
import styles from "./UpdateContact.module.css";

class UpdateContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameDirty: false,
      email: "",
      emailDirty: false,
      phone: "",
      phoneDirty: false,
      favorite: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.contact) this.setState({ ...this.props.contact });
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
      [name + "Dirty"]: true,
    });
  }
  validateEmail() {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.state.email).toLowerCase());
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, email, phone, favorite } = this.state;
    if (this.props.contact) {
      updateContact({
        id: this.props.contact.id,
        name,
        email,
        phone,
        favorite,
      }).then(() => Router.push(`/contacts/${this.props.contact.id}`));
    } else {
      createContact({
        name,
        email,
        phone,
        favorite,
      }).then(() => Router.push("/"));
    }
  }

  render() {
    return (
      <div>
        <header>
          <Link
            href={
              this.props.contact ? `/contacts/${this.props.contact.id}` : "/"
            }
          >
            <a>
              <img src="/arrow-back.svg" className="logo" />
            </a>
          </Link>
          <span className="spacer"></span>
          <img
            onClick={() => this.setState({ favorite: !this.state.favorite })}
            src={this.state.favorite ? "/heart.svg" : "/heart-off.svg"}
            className={"logo " + styles.like}
          />
        </header>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <label>
            {this.state.nameDirty && this.state.name.length < 3 && (
              <small className={styles.err}>
                *Name must be at least 3 characters long
              </small>
            )}
            <input
              name="name"
              type="text"
              value={this.state.name}
              placeholder="Name"
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            {this.state.emailDirty && !this.validateEmail() && (
              <small className={styles.err}>*Please enter valid email</small>
            )}
            <input
              name="email"
              type="email"
              placeholder="E-mail"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            <input
              name="phone"
              type="tel"
              placeholder="Phone"
              value={this.state.Phone}
              onChange={this.handleInputChange}
            />
          </label>
          <button
            disabled={this.state.name.length < 3 || !this.validateEmail()}
          >
            {this.props.contact ? "Update " : "Add "}Contact
          </button>
        </form>
      </div>
    );
  }
}

export default UpdateContact;
