import Router from "next/router";
// import Link from "next/link"; -- put to improve preloading
import { Component } from "react";
import { createContact, updateContact } from "../util/contacts";
import styles from "./UpdateContact.module.css";
import FavButton from "./FavButton";
import { ContactInterface } from "../util/custom-types";
import LabeledInput from "./LabeledInput";

interface CPropTypes {
  contact?: ContactInterface;
}

interface StateTypes {
  name?: string;
  nameDirty?: boolean;
  email?: string;
  emailDirty?: boolean;
  phone?: string;
  phoneDirty?: boolean;
  favorite?: boolean;
  animClass?: string;
}
class UpdateContact extends Component<CPropTypes, StateTypes> {
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
      animClass: "",
    };
    this.onChange = this.onChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ animClass: styles.animClass });
    }, 50);
    if (this.props.contact) this.setState({ ...this.props.contact });
  }
  onChange(name: string, value: string) {
    this.setState({
      [name]: value,
    });
  }
  validateEmail() {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.state.email).toLowerCase());
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ animClass: "" });
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
      }).then(() => setTimeout(() => Router.push("/"), 500));
    }
  }

  render() {
    return (
      <div className={[styles.container, this.state.animClass].join(" ")}>
        <header>
          <img
            onClick={() => {
              this.setState({ animClass: "" });
              setTimeout(() => {
                Router.push(
                  this.props.contact
                    ? `/contacts/${this.props.contact.id}`
                    : "/"
                );
              }, 300);
            }}
            src="/arrow-back.svg"
            className="logo"
          />
          <span className="spacer"></span>
          <FavButton
            fav={this.state.favorite}
            onClick={() => this.setState({ favorite: !this.state.favorite })}
          />
        </header>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <LabeledInput
            type="text"
            name="name"
            value={this.state.name}
            label="Name"
            errMessage="* Name must be at least 3 characters long"
            validator={() => this.state.name.length > 2}
            formator={(v: string): string => {
              if (v.startsWith(" ")) v = v.substr(1);
              v = v.replace(/[^a-zA-Z\s]/g, "");
              v = v.substr(0, 30);
              // v =
              //   v[0].replace(/[^0-9()+\s]/g, "") +
              //   v.substr(1).replace(/[^0-9()\s]/g, "");
              return v;
            }}
            onChange={this.onChange}
          />
          <LabeledInput
            type="email"
            name="email"
            value={this.state.email}
            label="Email"
            errMessage="* Please enter valid email"
            validator={this.validateEmail}
            formator={(v: string): string => {
              // if (v.startsWith(" ")) v = v.substr(1);
              // v = v.replace(/[^a-zA-Z\s]/g, "");
              v = v.replace(/\s/, "");
              v = v.substr(0, 30);
              // v =
              //   v[0].replace(/[^0-9()+\s]/g, "") +
              //   v.substr(1).replace(/[^0-9()\s]/g, "");
              return v;
            }}
            onChange={this.onChange}
          />
          <LabeledInput
            type="tel"
            name="phone"
            value={this.state.phone}
            label="Phone"
            errMessage="* Please enter valid email"
            validator={() => true}
            formator={(v: string): string => {
              if (v.startsWith(" ")) v = v.substr(1);
              v = v.length
                ? v[0].replace(/[^0-9()+\s]/g, "") +
                  v.substr(1).replace(/[^0-9()\s]/g, "")
                : "";
              v = v.substr(0, 20);
              return v;
            }}
            onChange={this.onChange}
          />
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
