import React, { FC } from "react";
import { useHistory } from 'react-router-dom'
import { Box, Flex, Spacer, Button, useColorMode, Text } from "@chakra-ui/react";
import { useCurrentUser } from '../../hooks/useCurrentUser'
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { UserInfo as User, Tools } from '../../constants/types'

type HeaderProps = {};

interface SignInOutButtonProps {
  user: User;
  isLoggedIn: boolean;
  tools: Tools;
}

const Header = (props: HeaderProps) => {
  const { colorMode } = useColorMode();
  const [userInfo, isLogin, tools] = useCurrentUser();
  const history = useHistory();

  const SignInOutButton: FC<SignInOutButtonProps> = ({ user, isLoggedIn, tools }) => {
    // if(isLogin) {
    //    pass history in as a parameter
    //   history.push("/account/" + userInfo.addr)
    // }

    console.log(`user loggedIn[${isLoggedIn}]: `, user);
    const signInOrOut = async (event: any) => {
      event.preventDefault();

      // tools.changeUser();

      if (isLoggedIn) {
        tools.logOut();
      } else {
        tools.logIn();
      }
    };

    return (
      <Button onClick={signInOrOut}>
        {isLoggedIn ? 'Sign Out' : 'Sign In/Up'}
      </Button>
    )
  };


  return (
    <>
      <Flex borderBottom='1px' borderBottomColor={`border.${colorMode}`}>
        <Box p='2' cursor="pointer">
          <Text fontWeight={600} fontSize="2xl" onClick={() => history.push('/')}>Flow Tools</Text>
        </Box>
        <Spacer/>
        <Spacer/>
        <Box p='2'>
          <SignInOutButton user={userInfo} isLoggedIn={isLogin} tools={tools}/>
        </Box>
        <Box p='2'>
          <ColorModeSwitcher/>
        </Box>
      </Flex>
    </>
  );
};

export default Header
