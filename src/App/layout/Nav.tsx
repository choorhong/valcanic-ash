import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd'
import { BuildOutlined, FileTextOutlined, FormOutlined, SettingOutlined, UserOutlined, TeamOutlined, LogoutOutlined } from '@ant-design/icons'
import { useAuth } from '../hooks/auth-context'
import { Link, useLocation } from 'react-router-dom'

const { Header, Content, Sider } = Layout
const { SubMenu } = Menu

const Nav: React.FC = (props) => {
  const { logout } = useAuth()
  const { pathname } = useLocation()
  const [selectedKey, setSelectedKey] = useState<string>('')

  useEffect(() => {
    const paths = pathname.split('/')
    const key = paths[1] ? paths[1] : 'shipment'
    setSelectedKey(key)
  }, [pathname])

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider
        breakpoint='lg'
        collapsedWidth='0'
        onBreakpoint={broken => {
          console.log(broken)
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type)
        }}
      >
        <div className='logo' />
        <Menu theme='dark' mode='inline' selectedKeys={[selectedKey]}>
          <Menu.Item key='shipment' icon={<BuildOutlined />}>
            <Link to='/shipment'>Shipment</Link>
          </Menu.Item>
          <Menu.Item key='booking' icon={<FileTextOutlined />}>
            <Link to='/booking'>Booking</Link>
          </Menu.Item>
          <Menu.Item key='purchase-order' icon={<FormOutlined />}>
            <Link to='/purchase-order'>Purchase Order</Link>
          </Menu.Item>

          <SubMenu key='setting' title='Setting' icon={<SettingOutlined />}>
            <Menu.Item key='profile' icon={<UserOutlined />}>Profile</Menu.Item>
            <Menu.Item key='users' icon={<TeamOutlined />}>Users</Menu.Item>
          </SubMenu>

          <Menu.Item key='logout' icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ background: '#fff' }}>
        <Header style={{ background: '#f0f2f5' }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div className='site-layout-background' style={{ padding: 24, minHeight: 360 }}>
            {props.children}
          </div>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
      </Layout>
    </Layout>
  )
}

export default Nav
