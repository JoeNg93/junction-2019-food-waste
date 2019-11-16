import React, { useState } from 'react';
import QRSection from './components/QRSection/index';
import RefriSection from './components/RefriSection/index';
import { Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import { useHistory } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import style from './constants/styleVariables';
import { TiCamera } from 'react-icons/ti';
import { StyleSheet, css } from 'aphrodite';

const NavBar = () => {
  const [selectedTab, setSelectedTab] = useState('redTab');
  const history = useHistory();

  return (
    <div
      style={{ position: 'fixed', height: '300px', width: '100%', bottom: 0 }}
    >
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        hidden={window.location.pathname === '/qr_scan'}
      >
        <TabBar.Item
          title="Fridge"
          key="Fridge"
          icon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background:
                  'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
              }}
            />
          }
          selectedIcon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background:
                  'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
              }}
            />
          }
          selected={selectedTab === 'blueTab'}
          badge={1}
          onPress={() => {
            setSelectedTab('blueTab');
            history.push('/');
          }}
        ></TabBar.Item>
        <TabBar.Item
          icon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background:
                  'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
              }}
            />
          }
          selectedIcon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background:
                  'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
              }}
            />
          }
          title="Recipes"
          key="Recipes"
          badge={'new'}
          selected={selectedTab === 'redTab'}
          onPress={() => {
            setSelectedTab('redTab');
            history.push('/recipes');
          }}
        ></TabBar.Item>
        <TabBar.Item
          icon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background:
                  'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat'
              }}
            />
          }
          selectedIcon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background:
                  'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat'
              }}
            />
          }
          title="Scan History"
          key="Scan History"
          dot
          selected={selectedTab === 'greenTab'}
          onPress={() => {
            setSelectedTab('greenTab');
            history.push('/scan-history');
          }}
        ></TabBar.Item>
        <TabBar.Item
          icon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background:
                  'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat'
              }}
            />
          }
          selectedIcon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background:
                  'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat'
              }}
            />
          }
          title="User Settings"
          key="User Settings"
          dot
          selected={false}
        ></TabBar.Item>
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
