import { AppLoading, Asset, Linking } from 'expo'
import React, { Component } from 'react'
import { StyleSheet, View, Text, Platform } from 'react-native'
import { Bubble, GiftedChat, SystemMessage } from 'react-native-gifted-chat';
// import firebase from 'react-native-firebase';
// import firestore from '@react-native-firebase/firestore';

import AccessoryBar from './src/Components/AccessoryBar'
import CustomActions from './src/Components/Attachments';
import CustomView from './src/Components/Map'
import earlierMessages from './src/earlier';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
})

const user = {
  _id: 1,
  name: 'Sravan',
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: props.messages || [],
      loadEarlier: true,
    }
  }

  _isMounted = false

  componentDidMount() {
    // firebase.auth().signInAnonymously()
    // .then((user) => {
    //   console.log('rupesh=', user.isAnonymous);
    //   const documentSnapshot = await firestore()
    //   .collection('users')
    //   .doc('alovelace')
    //   .get();
    // });
    this._isMounted = true
    // init with only system messages
    this.setState({
      messages: [],
      appIsReady: true,
    })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  onLoadEarlier = (messages) => {
    this.setState(previousState => {
      return {
        isLoadingEarlier: true,
      }
    })

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState(previousState => {
          return {
            messages: GiftedChat.prepend(
              previousState.messages,
              messages || earlierMessages,
              true,
            ),
            loadEarlier: false,
            isLoadingEarlier: false,
          }
        })
      }
    }, 1000) // simulating network
  }

  onSend = (messages = []) => {
    const step = this.state.step + 1
    this.setState(previousState => {
      const sentMessages = [{ ...messages[0], sent: true, received: true }]
      return {
        messages: GiftedChat.append(
          previousState.messages,
          sentMessages,
          true
        ),
        step,
      }
    });
  }

  renderCustomView(props) {
    return <CustomView {...props} />
  }

  onSendFromUser = (messages = []) => {
    const createdAt = new Date()
    const messagesToUpload = messages.map(message => ({
      ...message,
      user,
      createdAt,
      _id: Math.round(Math.random() * 1000000),
    }))
    this.onSend(messagesToUpload)
  }

  renderAccessory = () => <AccessoryBar onSend={this.onSendFromUser} />

  renderCustomActions = props => <CustomActions {...props} onSend={this.onSendFromUser} />;

  renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          },
        }}
      />
    )
  }

  renderSystemMessage = props => {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15,
        }}
        textStyle={{
          fontSize: 14,
        }}
      />
    )
  }

  render() {
    const { messages, loadEarlier } = this.state;
    return (
      <View style={styles.container}>
        <GiftedChat
          messages={messages}
          onSend={this.onSend}
          loadEarlier={loadEarlier}
          onLoadEarlier={this.onLoadEarlier}
          user={user}
          scrollToBottom
          keyboardShouldPersistTaps='always'
          renderAccessory={this.renderAccessory}
          renderActions={this.renderCustomActions}
          renderBubble={this.renderBubble}
          renderSystemMessage={this.renderSystemMessage}
          renderCustomView={this.renderCustomView}
          timeTextStyle={{ left: { color: 'red' }, right: { color: 'yellow' } }}
          showUserAvatar
        />
      </View>
    )
  }
}