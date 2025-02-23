import styled from "@emotion/styled";
import { isMobile } from "react-device-detect";
import { useEnvironment } from "../contexts/environment";
import { keyframes } from "@emotion/core";

const Container = styled.div<{ paused: boolean; dev?: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  transition: opacity 0.25s ease;
  background: rgba(0, 0, 0, ${(props) => (props.dev ? 0 : 0.5)});
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  opacity: ${(props) => (props.paused ? 1 : 0)};
  pointer-events: ${(props) => (props.paused ? "all" : "none")};
`;

const ClickContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const hueRotate = keyframes`
  from{
    filter: hue-rotate(0deg);
  }
  to {
    filter: hue-rotate(360deg);
  }
`;

const Window = styled.div`
  width: 90%;
  max-width: 400px;
  height: 91vw;
  max-height: 400px;
  padding: 20px 20px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 3%;
  background-image: url("https://d27rt3a60hh1lx.cloudfront.net/images/muse-bg.jpg");
  background-position: center;
  background-size: cover;
  font-family: sans-serif;
  animation: ${hueRotate} 15s ease infinite;
  box-sizing: border-box;
`;

const Continue = styled.div`
  width: 90%;
  max-width: 400px;
  height: auto;
  cursor: pointer;
  text-align: center;
  font-size: 1.3em;
  font-family: "Quicksand", sans-serif;
  transition: opacity 0.15s linear;
  margin-top: 20px;
  background: white;
  line-height: 1em;
  padding: 12px 0;
  border-radius: 10px;
  :hover {
    opacity: 0.5;
  }
`;

const Version = styled.a`
  position: absolute;
  top: 24px;
  right: 60px;
  font-size: 0.6em;
`;

const Instagram = styled.div`
  position: absolute;
  top: 24px;
  left: 60px;
  width: auto;
  height: auto;
  color: white;
  cursor: pointer;
  transition: opacity 0.15s linear;
  font-size: 0.6em;
  line-height: 1em;
  :hover {
    opacity: 0.5;
  }
`;

const Header = styled.div`
  margin-top: 8%;
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Quicksand", sans-serif;
`;

const Title = styled.div`
  font-size: 2em;
  text-align: center;
  margin-bottom: 0em;
  line-height: 1em;
`;

const Text = styled.div`
  width: 100%;
  height: auto;
  margin: 10px 0;
  font-family: "Roboto", sans-serif, monospace;
  font-size: 0.7em;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > p {
    margin: 0.2em;
  }
`;

const MenuButton = styled.div`
  color: white;
  border: 1px solid white;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0);
  padding: 5px 10px;
  margin: 8px 0;
  transition: background 0.15s linear;
  font-size: 0.5em;
  font-family: "Roboto", sans-serif, monospace;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const Signup = styled.a`
  position: relative;
  bottom: -30px;
  font-family: "Roboto", sans-serif, monospace;
  color: white;
  cursor: pointer;
  font-size: 1em;
  transition: color 0.15s linear;

  &:hover {
    color: rgba(255, 255, 255, 0.75);
  }
`;

type PauseProps = {
  dev: boolean;
  signup?: string;
};

export default function DesktopPause(props: PauseProps) {
  const { dev, signup } = props;
  const { paused, overlay, setPaused, menuItems } = useEnvironment();
  const closeOverlay = () => setPaused(false);

  if (dev) {
    return (
      <Container paused={paused} dev={true}>
        <ClickContainer onClick={closeOverlay} />
      </Container>
    );
  }
  if (overlay) {
    return null;
  }

  return (
    <Container paused={paused}>
      <ClickContainer onClick={closeOverlay} />
      <Window>
        <Version>v1.6.12</Version>
        <Instagram
          onClick={() => window.open("https://www.instagram.com/musehq")}
        >
          @musehq
        </Instagram>
        <Header>
          <Title>muse</Title>
        </Header>
        <Text>
          <p>Move around: {isMobile ? "Joystick" : "W/A/S/D"}</p>
          <p>Look around: {isMobile ? "Drag" : "Mouse"}</p>
          <p>Pause: {isMobile ? "Menu Button" : "Esc"}</p>
        </Text>
        {menuItems.map(
          (menuItem) =>
            menuItem && (
              <MenuButton onClick={menuItem.action}>{menuItem.text}</MenuButton>
            )
        )}
        {signup && (
          <Signup href={`${signup}`} target="_blank">
            Get Your Own 3D Space
          </Signup>
        )}
      </Window>
      <Continue onClick={closeOverlay}>continue</Continue>
    </Container>
  );
}
