import { fromFirebaseObj } from './utils/firebase.object.mapper';
import ErrorMessages from '../error.messages';

class DatabaseInfrastructure {
    document;

    collectionName;

    constructor(document, collectionName) {
        this.document = document;
        this.collectionName = collectionName;
    }
    
    listen = (callback) => {
        this.checkStore();

        const ref = this.document;


        if(this.listening){
            this.unListen();
        }
        
        this.listening = ref.onSnapshot(querySnapshot => {
            callback(querySnapshot.data());
        })
    }

    unListen = () => {
        if(this.listening){
            this.listening();
            this.listening = null;
        }
    }

    checkStore = () => {
        if (!this.document) {
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

}

export default DatabaseInfrastructure;
