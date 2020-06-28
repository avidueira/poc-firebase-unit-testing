import * as firebase from '@firebase/testing';
import assert from 'assert';

const MY_PROJECT_ID = 'poc-firebase-unit-testing';

const USER_UID = 'abc';
const USER_AUTH = {uid: USER_UID};

const OTHER_USER_UID = 'xyz';

function getUserFirestore(auth?: object): firebase.firestore.Firestore {
  return firebase.initializeTestApp({projectId: MY_PROJECT_ID, auth}).firestore();
}

function getAdminFirestore(): firebase.firestore.Firestore {
  return firebase.initializeAdminApp({projectId: MY_PROJECT_ID}).firestore();
}

describe('POC Firebase Unit Testing', () => {

  it('I\'m working?', () => {
    assert.strictEqual(1 + 1, 2);
  });

  it('Can read document in the readOnly collection', async () => {
    const db = getUserFirestore();
    const documentReference = db.collection('readOnly').doc('same-unique-id');
    await firebase.assertSucceeds(documentReference.get());
  });

  it('Can\'t write document in the readOnly collection', async () => {
    const db = getUserFirestore();
    const documentReference = db.collection('readOnly').doc('same-unique-id');
    await firebase.assertFails(documentReference.set({testProp: 'testValue'}));
  });

  it('User can read his data from users collection', async () => {
    const db = getUserFirestore(USER_AUTH);
    const documentReference = db.collection('users').doc(USER_UID);
    await firebase.assertSucceeds(documentReference.get());
  });

  it('User can\'t read other user data from users collection', async () => {
    const db = getUserFirestore(USER_AUTH);
    const documentReference = db.collection('users').doc(OTHER_USER_UID);
    await firebase.assertFails(documentReference.get());
  });

});
