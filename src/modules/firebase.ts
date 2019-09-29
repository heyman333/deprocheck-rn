import firebase from 'react-native-firebase';

export async function getSessionDateInfos() {
  const ref = firebase
    .firestore()
    .collection('sessionDates')
    .doc('qL0rUpaq5bjXbyKMn2Yn');

  return ref.get().then(snapshot => snapshot.data());
}
