import PropTypes from "prop-types";

export interface ContactInterface {
  // id: number | string;
  id: number;
  name: string;
  email: string;
  favorite: boolean;
  phone: string;
}

export const TypeContact = {
  // id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  favorite: PropTypes.bool,
  phone: PropTypes.string,
};
