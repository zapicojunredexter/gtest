import { fromFirebaseObj } from './utils/firebase.object.mapper';
import ErrorMessages from '../error.messages';

class DatabaseInfrastructure {
    firebase;

    collectionName;

    constructor(firebase, collectionName) {
        this.firebase = firebase;
        this.collectionName = collectionName;
    }

    create = async (obj) => {
        this.checkStore();

        const ref = this.getCollection();
        
        const next = {
            ...obj,
            createdAtMs: this.firebase.firestore.FieldValue.serverTimestamp(),
            updatedAtMs: this.firebase.firestore.FieldValue.serverTimestamp(),
            deleted: false,
        };

        const addRef = await ref.add(next);
        const { id } = addRef;

        return {
            id,
            ...next,
        };
    };

    read = async () => {
        this.checkStore();

        const ref = this.getCollection().where('deleted', '==', false);
        const snapshot = await ref.get();

        if (snapshot.empty) {
            return [];
        }
        const firebaseArray = snapshot.docs.map(obj => obj.data());

        return firebaseArray;
    };

    update = async (obj, id) => {
        this.checkStore();

        const ref = this.getCollection().doc(obj.id);

        const next = {
            ...obj,
            HAHA : "HAHA1",
            updatedAtMs: this.firebase.firestore.FieldValue.serverTimestamp()
        };

        await ref.set(next);

        return next;

        //IULI NI ONCE TESTED
        // this.checkStore();

        // const ref = this.getCollection().doc(id);
        // const snapshot = await ref.get();

        // this.verifySnapshot(snapshot);

        // const prev = snapshot.data();

        // this.verifyData(obj);

        // const next = {
        //     ...prev,
        //     ...obj,
        //     updatedAtMs: this.firebase.firestore.FieldValue.serverTimestamp()
        // };

        // await ref.set(next);

        // return next;
    };

    delete = async (id) => {
        this.checkStore();

        const ref = this.getCollection().doc(id);
        const snapshot = await ref.get().catch(error => { throw error });
        
        this.verifySnapshot(snapshot);

        const obj = snapshot.data();
        
        this.verifyData(obj);

        const next = {
            ...obj,
            deleted: true,
            updatedAtMs: this.firebase.firestore.FieldValue.serverTimestamp(),
        };

        await ref.set(next);

        return true;
    };
    
    listen = callback => {
        this.checkStore();

        const ref = this.getCollection();

        if(this.listening){
            this.unListen();
        }
        
        this.listening = ref.onSnapshot(querySnapshot => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });
            callback(data);
        })
    }

    unListen = () => {
        if(this.listening){
            this.listening();
            this.listening = null;
        }
    }

    checkStore = () => {
        if (!this.firebase) {
            throw new Error(ErrorMessages.noPrefix);
        }
    };

    verifySnapshot = (snapshot) => {
        if (!snapshot.exists) {
            throw new Error(ErrorMessages.noReference);
        }
    };

    verifyData = (data) => {
        if (data.deleted) {
            throw new Error(ErrorMessages.alreadyDeleted);
        }
    };

    getStore = () => this.firebase.firestore();

    getCollection = () => this.getStore().collection(this.collectionName);
}

export default DatabaseInfrastructure;
