import MainContainer from "../MainContainer/MainContiner";
import LittleButton from "../LittleButton/LittleButton";


/**
 * Login PAGE
 */
const Login = ({onClick}) => {
  return (
    <MainContainer title="SWGU | Sign In" description="Sign In Page of SWGU" bgImage="plain-background" lineArt="double">
      <LittleButton text="Sign In" imageDirection="right" onClick={onClick} />
    </MainContainer>
  );
};

export default Login;