import { useContext, useEffect, useState } from "react";

import { Tab, Nav } from "react-bootstrap";
import { Redirect, useParams } from "react-router-dom";

import "assets/css/Profile.css";
import {
  ProfileChangePassword,
  ProfileChangeDetails,
  ProfileFollowing,
  ProfileFollowers,
  ProfileHeader,
  LoadingScreen,
  FollowButton,
} from "components";
import { UserContext } from "context/UserContext";
import UserService from "services/UserService";

const Profile = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const profileTab = JSON.parse(localStorage.getItem("profileTab"));

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
    localStorage.setItem("profileTab", JSON.stringify({ id: id, tab: tab }));
  };

  const Tabs = () => {
    return (
      <Tab.Container defaultActiveKey={profileTab?.id == id ? profileTab.tab : "1"}>
        <Nav variant="pills" className="justify-content-center mb-5">
          <Nav.Item>
            <Nav.Link eventKey="1" onSelect={() => changeTab("1")}>
              Activity
            </Nav.Link>
          </Nav.Item>
          {user && user.id === Number(id) && (
            <>
              <Nav.Item>
                <Nav.Link eventKey="2" onSelect={() => changeTab("2")}>
                  Update Profile
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="3" onSelect={() => changeTab("3")}>
                  Change Password
                </Nav.Link>
              </Nav.Item>
            </>
          )}
          <Nav.Item>
            <Nav.Link eventKey="4" onSelect={() => changeTab("4")}>
              Following
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="5" onSelect={() => changeTab("5")}>
              Followers
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <div className={"px-2"}>
          <Tab.Content>
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
                <FollowButton id={id} />
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
