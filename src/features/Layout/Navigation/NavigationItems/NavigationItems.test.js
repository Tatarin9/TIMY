import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it('should render 2 navigation items if NOT authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    it('should render 3 navigation items if authenticated', () => {
        // wrapper = shallow(<NavigationItems isAuthenticated/>);
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    it('should show Logout menu if authenticated', () => {
        wrapper.setProps({isAuthenticated: true});
        // expect(wrapper.contains(<NavigationItem link={{pathname: '/auth/logout'}} clicked={props.clicked} exact>Logout</NavigationItem>)).toEqual(true);
        // expect(wrapper.contains(<NavigationItem link='/auth/logout'>Logout</NavigationItem>)).toEqual(true);
        expect(wrapper.contains(
            <NavigationItem link={{pathname: '/auth/logout'}} exact>Logout</NavigationItem>)).toEqual(true);
    });
});
