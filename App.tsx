import React, { Fragment } from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';

const App = () => (
  <Fragment>
    <SafeAreaView style={styles.container}>
      <Text>디프만 출첵앱</Text>
    </SafeAreaView>
  </Fragment>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
    backgroundColor: 'orange',
  },
});

export default App;
