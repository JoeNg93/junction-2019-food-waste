import React, { useState } from 'react';
import QRSection from './components/QRSection/index';
import RefriSection from './components/RefriSection/index';
import { Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import { useHistory } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import style from './constants/styleVariables';
import { TiCamera } from 'react-icons/ti';
import { FaUserCog } from 'react-icons/fa';
import { MdContentPaste, MdRestaurantMenu, MdPerson } from 'react-icons/md';
import { ReactComponent as FridgeIcon } from './assets/fridge_icon.svg';
import { StyleSheet, css } from 'aphrodite';

const NavBar = () => {
  const [selectedTab, setSelectedTab] = useState('blueTab');
  const history = useHistory();

  return (
    <div
      style={{ position: 'fixed', height: '300px', width: '100%', bottom: 0 }}
    >
      <TabBar
        unselectedTintColor="#949494"
        tintColor={style.primaryColor}
        barTintColor="white"
        hidden={window.location.pathname === '/qr_scan'}
      >
        <TabBar.Item
          title="Fridge"
          key="Fridge"
          icon={
            <FridgeIcon
              style={{
                width: 24,
                height: 24,
                color: '#949494'
              }}
            />
          }
          selectedIcon={
            <FridgeIcon
              style={{
                width: 24,
                height: 24,
                color: `${style.primaryColor}`
              }}
            />
          }
          selected={selectedTab === 'blueTab'}
          onPress={() => {
            setSelectedTab('blueTab');
            history.push('/');
          }}
        />
        <TabBar.Item
          icon={
            <MdRestaurantMenu
              style={{
                fontSize: 22
              }}
            />
          }
          selectedIcon={
            <MdRestaurantMenu
              style={{
                fontSize: 22,
                color: `${style.primaryColor}`
              }}
            />
          }
          title="Recipes"
          key="Recipes"
          selected={selectedTab === 'redTab'}
          onPress={() => {
            setSelectedTab('redTab');
            history.push('/recipes');
          }}
        />
        <TabBar.Item title="hidden" key="hidden" selected={false} />
        <TabBar.Item
          icon={
            <MdContentPaste
              style={{
                fontSize: 22
              }}
            />
          }
          selectedIcon={
            <MdContentPaste
              style={{
                fontSize: 22,
                color: `${style.primaryColor}`
              }}
            />
          }
          title="Scan History"
          key="Scan History"
          tintColor={style.primaryColor}
          selected={selectedTab === 'greenTab'}
          onPress={() => {
            setSelectedTab('greenTab');
            history.push('/scan-history');
          }}
        />
        <TabBar.Item
          icon={
            <FaUserCog
              style={{
                fontSize: 22
              }}
            />
          }
          selectedIcon={
            <FaUserCog
              style={{
                fontSize: 22,
                color: `${style.primaryColor}`
              }}
            />
          }
          title="User Settings"
          key="User Settings"
          selected={false}
        />
      </TabBar>

      <div
        className={css(styles.cameraNavWrapper)}
        onClick={() => history.push('/qr_scan')}
      >
        <TiCamera
          style={{
            fontSize: 45,
            color: 'white',
            position: 'relative',
            top: -4
          }}
        />
      </div>
    </div>
  );
};

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <RefriSection />
        </Route>
        <Route path="/qr_scan" exact>
          <QRSection />
        </Route>
      </Switch>
      <NavBar />
    </>
  );
}

const styles = StyleSheet.create({
  cameraNavWrapper: {
    position: 'fixed',
    left: '50%',
    marginLeft: '-40px',
    bottom: -12,
    textAlign: 'center',
    width: 80,
    height: 80,
    borderRadius: '100%',
    background: style.primaryColor,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    zIndex: 9999
  }
});

export default App;
