import React, { ReactNode, useState } from 'react';
import CSelectItem from 'src/components/UI/CSelectMenu/CSelectItem';
import { useAppSelector } from 'src/hooks';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store/store';
import CSelectMenu from 'src/components/UI/CSelectMenu/CSelectMenu';
import UserAvatar from 'src/components/UI/UserAvatar/UserAvatar';
import { ROUTES_AUTH } from 'src/utils/const/routes';

const UserMenu: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const user = useAppSelector((state) => state.auth.userInfos.data);

  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

  const handleDisconnection = () => {
    navigate(ROUTES_AUTH.login.path);
    dispatch({ type: 'store/reset' });
  };

  const handleOpenMenu = (state: boolean) => {
    setIsMenuOpened(state);
  };

  const MenuList = (): ReactNode => (
    <>
      <CSelectItem title={user?.username ?? 'Anonyme'} isHighlighted />
      {user.is_manager && (
        <CSelectItem
          title={'Admin'}
          onClick={() => {
            navigate('/admin');
            setIsMenuOpened(false);
          }}
        />
      )}
      <CSelectItem
        title={'Paramètres'}
        onClick={() => {
          navigate('/parametres');
          setIsMenuOpened(false);
        }}
      />
      <CSelectItem
        title={'Déconnexion'}
        isHighlighted
        onClick={() => handleDisconnection()}
      />
    </>
  );

  return (
    <CSelectMenu
      icon={<UserAvatar src={user.profile_image} />}
      list={MenuList()}
      isOpen={isMenuOpened}
      setIsOpen={handleOpenMenu}
    />
  );
};

export default UserMenu;
