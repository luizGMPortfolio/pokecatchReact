import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, addDoc, updateDoc, Timestamp } from "firebase/firestore";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

export const useCloud = () => {
  const [documents, setDocuments] = useState()
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const createDocuments = async (collections, data) => {
    if (cancelled) {
      return;
    }
    setLoading(true);
    console.log(data)
    const NewData = { ...data, createdAt: Timestamp.now() };

    try {
      const docRef = await addDoc(collection(db, collections), NewData);
      return docRef;

    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }

    setLoading(false);
  };
  const UpdateDocuments = async (docCollection, uid, data) => {
    if (cancelled) {
      return;
    }
    setLoading(true);

    try {
      const docRef = doc(db, docCollection, uid);

      const updatedDocument = await updateDoc(docRef, data);
      return updatedDocument;
    } catch (error) {
      console.log(error);
      setError(error.message);
    }

    setLoading(false);
  };
  const GetDocuments = async (docCollection, uid = null) => {

    setLoading(true);

    const collectionRef = await collection(db, docCollection);
    try {
      let q;

      if (uid) {
        q = await query(
          collectionRef,
          where("uid", "==", uid),
          orderBy("createdAt", "desc")
        );
      } else {
        q = await query(collectionRef, orderBy("createdAt", "desc"));
      }

      await onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setDocuments(data[0])
      });
    } catch (error) {
      console.log(error);
      setError(error.message);
    }

    setLoading(false)
  };


  return {
    createDocuments,
    GetDocuments,
    UpdateDocuments,
    documents,
    loading,
    error
  };
};
