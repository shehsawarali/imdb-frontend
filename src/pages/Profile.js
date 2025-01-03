import { useContext, useEffect, useState } from "react";

import { Nav, Tab } from "react-bootstrap";
import { Redirect, useParams } from "react-router-dom";

import "assets/css/Profile.css";
import {
  FollowButton,
  LoadingScreen,
  ProfileActivity,
  ProfileChangeDetails,
  ProfileChangePassword,
  ProfileFollowers,
  ProfileFollowing,
  ProfileHeader,
} from "components";
import { UserContext } from "context/UserContext";
import UserService from "services/UserService";

let privateTabs = ["2", "3"];

const Profile = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const tabHistory = JSON.parse(localStorage.getItem("tabHistory"));

  const defaultTab = () => {
    if (Number(tabHistory?.id) !== user?.id && privateTabs.includes(tabHistory?.tab))
      return "1";

    if (tabHistory?.id === id) return tabHistory.tab;

    return "1";
  };

  useEffect(() => {
    UserService.profile(id)
      .then((response) => {
        setProfile(response.profile);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) return <LoadingScreen />;

  if (!profile) return <Redirect to={"/404"} />;

  const changeTab = (tab) => {
    localStorage.setItem("tabHistory", JSON.stringify({ id: id, tab: tab }));
  };

  const Tabs = () => {
    return (
      <Tab.Container defaultActiveKey={defaultTab()}>
        <Nav variant="pills" className="justify-content-center mb-5">
          <Nav.Item>
            <Nav.Link eventKey="1" onClick={() => changeTab("1")}>
              Activity
            </Nav.Link>
          </Nav.Item>
          {user && user.id === Number(id) && (
            <>
              <Nav.Item>
                <Nav.Link eventKey="2" onClick={() => changeTab("2")}>
                  Update Profile
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="3" onClick={() => changeTab("3")}>
                  Change Password
                </Nav.Link>
              </Nav.Item>
            </>
          )}
          <Nav.Item>
            <Nav.Link eventKey="4" onClick={() => changeTab("4")}>
              Following
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="5" onClick={() => changeTab("5")}>
              Followers
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <div className={"px-2"}>
          <Tab.Content>
            <Tab.Pane eventKey="1">
              <ProfileActivity id={id} />
            </Tab.Pane>
            <Tab.Pane eventKey="2">
              <ProfileChangeDetails profile={profile} id={id} />
            </Tab.Pane>
            <Tab.Pane eventKey="3">
              <ProfileChangePassword profile={profile} />
            </Tab.Pane>
            <Tab.Pane eventKey="4">
              <ProfileFollowing id={profile.id} />
            </Tab.Pane>
            <Tab.Pane eventKey="5">
              <ProfileFollowers id={profile.id} />
            </Tab.Pane>
          </Tab.Content>
        </div>
      </Tab.Container>
    );
  };

  return (
    <>
      {profile && (
        <div className={"profile-container"}>
          <ProfileHeader profile={profile} />
          {user && user.id !== Number(id) && (
            <div className={"text-center mb-3"}>
              <div className={"w-50 mx-auto"}>
                <FollowButton id={id} name={profile.first_name} />
              </div>
            </div>
          )}
          <div className={"profile-content"}>{Tabs()}</div>
        </div>
      )}
    </>
  );
};

export default Profile;
