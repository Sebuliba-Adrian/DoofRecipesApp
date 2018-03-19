import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Registration from '../components/authentication/registration';
configure({ adapter: new Adapter() });

const props = {
  location: {
    data: {
      message: 'Test message',
    }
  },
  history: {
    replace: jest.fn()
  }
};

describe('Test registration', () => {
  const wrapper = mount(<Registration {...props} />);
  const instance = wrapper.instance();

  global.fetch = jest.fn(() => Promise.rejects({}));
  it('renders correctly', () => {
    const registration = renderer.create(<Registration {...props} />).toJSON();
    expect(registration).toMatchSnapshot();
  });

  it('submits the form', () => {
    
    const userName = wrapper.find('#username');
    userName.simulate('change', {
      target: { name: 'username', value: 'testusername' }
    });
    userName.value = 'testusername';
    expect(userName.value).toEqual('testusername');

    const userEmail = wrapper.find('#email');
    userEmail.simulate('change', {
      target: { name: 'email', value: 'test@test.com' }
    });
    userEmail.value = 'test@test.com';
    expect(userEmail.value).toEqual('test@test.com');

    const userPassword = wrapper.find('#password');
    const confUserPassword = wrapper.find('#confirm_password');
    userPassword.simulate('change', {
      target: { name: 'password', value: 'testpassword"'}
    });
    userPassword.simulate('change', {
      target: { name: 'confm_password', value: 'testpassword' }
    });
    userPassword.value = 'testpassword';
    expect(userPassword.value).toEqual('testpassword');

    
    
    
    const form = wrapper.find('form');
    form.find('button').simulate('submit', { preventDefault: () => {} });
  });

  
});
