import React from 'react';
import Counter from './Counter';
import {mount, shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter : new Adapter()});

test("Counter1", () => {
   const wrapper = mount(<Counter/>);
   const instance = wrapper.instance();
   expect(instance).toBeTruthy();
});

test("Counter2", () => {
    const wrapper = mount(<Counter/>);
    const state = wrapper.state();
    expect(state.count).toBe(5);
 });

 test("Counter3", () => {
    const wrapper = mount(<Counter/>);
    const state = wrapper.state();
    const count = state.count;
    const instance = wrapper.instance();
    instance.inc();
    expect(wrapper.state().count).toBe(count+1);
 });