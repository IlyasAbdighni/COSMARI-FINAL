import React, { Component } from 'react';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form'

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        fullName: 'Marco Polo',
        tos: false,
      }
    };
  }

  handleValueChange(values) {
    console.log('handleValueChange', values)
    this.setState({ form: values })
  }

  render() {
    const { fullName, tos, gender } = this.state.form;
    console.log('render', this.state.form);
    return (
        <GiftedForm
            formName='signupForm'

            clearOnClose={false} // delete the values of the form when unmounted

            defaults={{
              /*
              username: 'Farid',
              'gender{M}': true,
              password: 'abcdefg',
              country: 'FR',
              birthday: new Date(((new Date()).getFullYear() - 18)+''),
              */
            }}

            validators={{
              fullName: {
                title: 'Full name',
                validate: [{
                  validator: 'isLength',
                  arguments: [1, 23],
                  message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
                }]
              },
              emailAddress: {
                title: 'Email address',
                validate: [{
                  validator: 'isLength',
                  arguments: [6, 255],
                }, {
                  validator: 'isEmail',
                }]
              },
            }}

            openModal={(route) => { this.props.navigator.push(route) }}
            onValueChange={this.handleValueChange.bind(this)}
          >
        <GiftedForm.TextInputWidget
              name='fullName' // mandatory
              title='Full name'
              placeholder='Marco Polo'
              clearButtonMode='while-editing'
            />
        
        <GiftedForm.SeparatorWidget />

        <GiftedForm.TextInputWidget
              name='emailAddress' // mandatory
              title='Email address'
              placeholder='example@nomads.ly'

              keyboardType='email-address'

              clearButtonMode='while-editing'
            />

        <GiftedForm.HiddenWidget name='tos' value={tos} />
      </GiftedForm>
    );
  }
}

export default Form;
