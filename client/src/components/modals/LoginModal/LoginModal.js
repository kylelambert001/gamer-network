import React from "react";
import "./LoginModal.scss";

import Modal from "../Modal/Modal";
import ModalClose from "../ModalClose/ModalClose";
import ModalHeader from "../ModalHeader/ModalHeader";
import ModalContent from "../ModalContent/ModalContent";
import ModalFooter from "../ModalFooter/ModalFooter";
import FormInputGroup from "../../forms/FormInputGroup/FormInputGroup";
import Button from "../../shared/Button/Button";

function LoginModal(props) {
  const emailRef = React.useRef(null);
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });

  React.useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    setState((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <Modal>
      <ModalClose />
      <ModalContent>
        <ModalHeader heading="Hello!" subheading="Sign into your account here" />
        <form className="LoginModal__form">
          <div className="LoginModal__form-line">
            <FormInputGroup
              ref={emailRef}
              label="Email address"
              name="email"
              value={state.email}
              onChange={handleChange}
              placeholder="stevejobs@gmail.com"
            />
          </div>
          <div className="LoginModal__form-line">
            <FormInputGroup
              label="Password"
              name="password"
              value={state.password}
              onChange={handleChange}
            />
          </div>
          <div className="LoginModal__form-line">
            <Button primary full>
              Sign in
            </Button>
          </div>
        </form>
      </ModalContent>
      <ModalFooter displayCopy="Don't have an account?" buttonLabel="Sign Up" />
    </Modal>
  );
}

export default LoginModal;
