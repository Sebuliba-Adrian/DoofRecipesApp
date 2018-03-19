import React from 'react';
import sinon from 'sinon';
import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import LoginPage from '../components/authentication/login';
configure({ adapter: new Adapter() });

const props = {
  location: {
    data: {
      message: 'Test message'
    }
  },
  history: {
    replace: jest.fn()
  }
};

global.localStorage = {
  setItem: () => {},
  getItem: () => {}
};

describe('<LoginPage />', () => {
  const preventDefault = jest.fn(); //PreventDefault spy

  it('renders', () => {
    const tree = renderer.create(<LoginPage {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has initial state', () => {
    const wrapper = shallow(<LoginPage {...props} />);
    expect(wrapper.state().username).toEqual('');
  });

  it('submits the form', () => {

    const wrapper = mount(<LoginPage {...props} />);
    console.log(wrapper.instance());

    const userName = wrapper.find('#username');
    userName.simulate('change', {
      target: { name: 'username', value: 'testusername' }
    });
    userName.value = 'testusername';
    expect(userName.value).toEqual('testusername');

    const userPassword = wrapper.find('#password');
    userPassword.simulate('change', {
      target: { name: 'password', value: 'testpassword' }
    });
    userPassword.value = 'testpassword';
    expect(userPassword.value).toEqual('testpassword');

    const form = wrapper.find('form');
    form.find('button').simulate('submit', { preventDefault });
    expect(preventDefault).toBeCalled();
  });
});
