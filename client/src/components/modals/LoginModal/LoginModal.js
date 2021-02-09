import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./LoginModal.scss";

import Modal from "../Modal/Modal";
import ModalClose from "../ModalClose/ModalClose";
import ModalHeader from "../ModalHeader/ModalHeader";
import ModalContent from "../ModalContent/ModalContent";
import ModalFooter from "../ModalFooter/ModalFooter";
import FormInputGroup from "../../forms/FormInputGroup/FormInputGroup";
import Button from "../../shared/Button/Button";

// import { validateEmail } from "../../../utils/regex";

import { showSignUpModal, hideCurrentModal } from "../../../store/actions/modalActions";
import { authenticateUser } from "../../../store/actions/authActions";

function LoginModal(props) {
  const emailRef = React.useRef(null);
  const dispatch = useDispatch();
  const { authenticationLoading } = useSelector((state) => state.auth);

  const [state, setState] = React.useState({
    email: "",
    password: "",
  });

  // const [valid, setValid] = React.useState({
  //   email: 0,
  //   password: 0,
  // });

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

  // const handleValidateEmail = (e) => {
  //   setValid((prev) => {
  //     return {
  //       ...prev,
  //       email: validateEmail(state.email.trim()) ? 1 : -1,
  //     };
  //   });
  // };

  // const handleValidatePassword = (e) => {
  //   setValid((prev) => {
  //     return {
  //       ...prev,
  //       password: state.password.trim().length > 0 ? 1 : -1,
  //     };
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.email && state.password) {
      dispatch(authenticateUser(state));
    }
  };

  const openSignUpModal = () => dispatch(showSignUpModal());
  const closeLoginModal = () => dispatch(hideCurrentModal());

  return (
    <Modal>
      <ModalClose closeModal={closeLoginModal} />
      <ModalContent>
        <ModalHeader heading="Hello!" subheading="Sign into your account here" />
        <form onSubmit={handleSubmit} className="LoginModal__form">
          <div className="LoginModal__form-line">
            <FormInputGroup
              ref={emailRef}
              label="Email address"
              name="email"
              value={state.email}
              // onBlur={handleValidateEmail}
              // valid={valid.email}
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
            <Button
              type="submit"
              // disabled={valid.email === 1 && valid.password === 1 ? false : true}
              width="full"
              color="indigo"
              isLoading={authenticationLoading}>
              Login
            </Button>
          </div>
        </form>
      </ModalContent>
      <ModalFooter
        displayCopy="Don't have an account?"
        buttonLabel="Sign Up"
        openModal={openSignUpModal}
      />
    </Modal>
  );
}

export default LoginModal;
