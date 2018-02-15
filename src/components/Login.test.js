import React from 'react'
import { mount } from 'enzyme'
import Wrapper from './Wrapper'

it('renders content', () => {
  const onSubmit = jest.fn()

  const wrapper = mount(
    <Wrapper onSubmit={onSubmit} />
  )

  const username = wrapper.find('.username')
  const password = wrapper.find('.password')
  const button = wrapper.find('button')

  username.simulate('change', { target: { name:'username', value: 'Testaaja' } })
  password.simulate('change', { target: { name:'password', value: 'salasana' } })
  button.simulate('submit')

  expect(wrapper.state().username).toBe('Testaaja')
  expect(wrapper.state().password).toBe('salasana')
  expect(onSubmit.mock.calls.length).toBe(1)
})