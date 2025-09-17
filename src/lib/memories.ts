import { db } from './firebase';
import { collection, addDoc, getDocs, query } from 'firebase/firestore';

export type Memory = {
  id: string;
  image: string; // Now this will be an image URL
  text: string;
};

export type NewMemory = Omit<Memory, 'id'>;

export type Song = {
  id:string;
  title: string;
  artist: string;
  icon: string;
};

export type NewSong = Omit<Song, 'id'>;

export const getMemories = async (): Promise<Memory[]> => {
    try {
        const q = query(collection(db, 'memories'));
        const querySnapshot = await getDocs(q);
        const memories: Memory[] = [];
        querySnapshot.forEach((doc) => {
            memories.push({ id: doc.id, ...doc.data() } as Memory);
        });
        return memories;
    } catch (e) {
        console.error("Error fetching memories: ", e);
        return [];
    }
};

export const addMemory = async (memory: NewMemory) => {
    try {
        const docRef = await addDoc(collection(db, 'memories'), memory);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        return null;
    }
};

export const getSongs = async (): Promise<Song[]> => {
    try {
        const q = query(collection(db, 'songs'));
        const querySnapshot = await getDocs(q);
        const songs: Song[] = [];
        querySnapshot.forEach((doc) => {
            songs.push({ id: doc.id, ...doc.data() } as Song);
        });
        return songs;
    } catch(e) {
        console.error("Error fetching songs: ", e);
        return [];
    }
};

export const addSong = async (song: NewSong) => {
    try {
        const docRef = await addDoc(collection(db, 'songs'), song);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        return null;
    }
};

export const initialMemories: Memory[] = [];
