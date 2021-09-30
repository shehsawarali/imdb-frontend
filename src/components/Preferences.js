import React, { useState } from "react";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import moment from "moment-timezone";
import { Button, CloseButton, Modal, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

import useCheckbox from "hooks/useCheckbox";
import usePresetInput from "hooks/usePresetInput";
import UserService from "services/UserService";

const Preferences = ({ show, setShow, user }) => {
  const timezone = usePresetInput(user.timezone);
  const email_list_preference = useCheckbox(user.email_list_preference);
  const login_alert_preference = useCheckbox(user.login_alert_preference);

  const [isSaving, setIsSaving] = useState(false);

  const formButton = () => {
    if (isSaving)
      return (
        <Button>
          <Spinner size="sm" animation="border" />
        </Button>
      );

    return (
      <Button type={"submit"}>
        Update Preferences
        <Icon icon={"user-cog"} size="1x" className={"ms-2"} />
      </Button>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);

    let data = {
      timezone: timezone.value,
      email_list_preference: email_list_preference.value,
      login_alert_preference: login_alert_preference.value,
    };

    UserService.update(user.id, data)
      .then(() => {
        toast.success("Your preferences have been updated");
        setShow(false);
      })
      .catch(() => {
        toast.error("An error occurred. Please try again.");
      })
      .finally(() => setIsSaving(false));
  };

  return (
    <Modal show={show} scrollable onHide={() => setShow(false)} centered>
      <Modal.Header className={"lightgray"}>
        <Modal.Title>Preferences</Modal.Title>
        <CloseButton variant={"white"} onClick={() => setShow(false)} />
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body className={"lightgray text-start"}>
          <div>
            <p className={"lead font-weight-bold"}>Email Preferences</p>

            <label className={"me-4"}>
              <input
                type="checkbox"
                name={"login_alert_preference"}
                defaultChecked={login_alert_preference.value}
                onChange={login_alert_preference.handleChange}
              />
              Sign-In Alert
            </label>

            <label className={"me-4"}>
              <input
                type="checkbox"
                name="email_list_preference"
                defaultChecked={email_list_preference.value}
                onChange={email_list_preference.handleChange}
              />
              Recommendations
            </label>
          </div>

          <br />

          <div>
            <p className={"lead font-weight-bold"}>Timezone Preference</p>

            <select
              name="timezone"
              className={"w-75 lightgray"}
              value={timezone.value}
              onChange={timezone.handleChange}
            >
              <option value={""} disabled>
                Timezone
              </option>
              {moment.tz.names().map((tz, index) => {
                return (
                  <option key={index} value={tz}>
                    {tz}
                  </option>
                );
              })}
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>{formButton()}</Modal.Footer>
      </form>
    </Modal>
  );
};

export default Preferences;
