import { initializeApp, getApps } from 'firebase/app';
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
  onSnapshot,
  getDoc
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);

export interface FirestoreScore {
  id?: string;
  name: string;
  score: number;
  date?: string;
  createdAt?: any;
}

const scoresCollection = collection(db, 'scores');
const roomsCollection = collection(db, 'multiplayer_rooms');

export async function submitScoreToFirestore(playerName: string, score: number) {
  if (!score || score <= 0) return;
  try {
    const docRef = await addDoc(scoresCollection, {
      playerName: playerName || 'Player',
      score: Math.floor(score),
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.warn('Firestore score write fallback:', error);
  }
}

export function subscribeToLeaderboard(callback: (scores: { name: string; score: number }[]) => void, max = 15) {
  try {
    const q = query(scoresCollection, orderBy('score', 'desc'), limit(max));
    return onSnapshot(
      q,
      (snapshot) => {
        const scores = snapshot.docs.map(doc => ({
          name: doc.data().playerName || 'Player',
          score: doc.data().score || 0
        }));
        if (scores.length > 0) {
          callback(scores);
        }
      },
      (error) => {
        console.warn('Firestore subscription fallback:', error);
      }
    );
  } catch (err) {
    console.warn('Firestore subscribe err:', err);
    return () => {};
  }
}

export interface MultiplayerRoomData {
  id: string;
  roomCode: string;
  hostId: string;
  hostName: string;
  hostScore: number;
  hostCombo: number;
  hostLives: number;
  hostReady: boolean;
  guestId?: string;
  guestName?: string;
  guestScore: number;
  guestCombo: number;
  guestLives: number;
  guestReady: boolean;
  status: 'waiting' | 'in_progress' | 'completed' | 'abandoned';
  gameStartTime?: number;
  gameDuration: number;
  seed: number;
  sabotage?: { target: 'host' | 'guest'; type: 'freeze' | 'blackout'; from: string; timestamp: number };
  taunt?: { sender: string; text: string; timestamp: number };
  winner?: string;
}

export function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function createMultiplayerRoom(hostName: string, hostId: string): Promise<MultiplayerRoomData | null> {
  try {
    const roomCode = generateRoomCode();
    const newRoomRef = doc(roomsCollection, roomCode);
    const roomData: MultiplayerRoomData = {
      id: roomCode,
      roomCode,
      hostId,
      hostName: hostName || 'Player 1',
      hostScore: 0,
      hostCombo: 0,
      hostLives: 3,
      hostReady: false,
      guestScore: 0,
      guestCombo: 0,
      guestLives: 3,
      guestReady: false,
      status: 'waiting',
      gameDuration: 60,
      seed: Math.floor(Math.random() * 1000000)
    };

    await setDoc(newRoomRef, {
      ...roomData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return roomData;
  } catch (err) {
    console.error('Error creating multiplayer room:', err);
    return null;
  }
}

export async function joinMultiplayerRoom(
  roomCodeInput: string,
  guestName: string,
  guestId: string
): Promise<{ success: boolean; room?: MultiplayerRoomData; error?: string }> {
  try {
    const cleanCode = roomCodeInput.trim().toUpperCase();
    if (!cleanCode) return { success: false, error: 'Please enter a room code' };

    const roomRef = doc(roomsCollection, cleanCode);
    const roomSnap = await getDoc(roomRef);

    if (!roomSnap.exists()) {
      return { success: false, error: 'Room not found. Check the code and try again!' };
    }

    const data = roomSnap.data() as MultiplayerRoomData;
    if (data.status !== 'waiting' && data.guestId !== guestId) {
      return { success: false, error: 'Match already in progress or completed.' };
    }

    if (data.guestId && data.guestId !== guestId && data.hostId !== guestId) {
      return { success: false, error: 'Room is already full!' };
    }

    await updateDoc(roomRef, {
      guestId,
      guestName: guestName || 'Player 2',
      guestScore: 0,
      guestCombo: 0,
      guestLives: 3,
      guestReady: true,
      updatedAt: serverTimestamp()
    });

    return { success: true, room: { ...data, guestId, guestName: guestName || 'Player 2' } };
  } catch (err: any) {
    console.error('Error joining room:', err);
    return { success: false, error: err?.message || 'Failed to join room' };
  }
}

export async function updateRoomPlayer(
  roomId: string,
  isHost: boolean,
  score: number,
  combo: number,
  lives: number
) {
  try {
    const roomRef = doc(roomsCollection, roomId);
    if (isHost) {
      await updateDoc(roomRef, {
        hostScore: Math.floor(score),
        hostCombo: combo,
        hostLives: lives,
        updatedAt: serverTimestamp()
      });
    } else {
      await updateDoc(roomRef, {
        guestScore: Math.floor(score),
        guestCombo: combo,
        guestLives: lives,
        updatedAt: serverTimestamp()
      });
    }
  } catch (err) {
    // Non-blocking update
  }
}

export async function setRoomReady(roomId: string, isHost: boolean, ready: boolean) {
  try {
    const roomRef = doc(roomsCollection, roomId);
    if (isHost) {
      await updateDoc(roomRef, { hostReady: ready, updatedAt: serverTimestamp() });
    } else {
      await updateDoc(roomRef, { guestReady: ready, updatedAt: serverTimestamp() });
    }
  } catch (err) {
    console.warn('Set ready err:', err);
  }
}

export async function startMultiplayerMatch(roomId: string) {
  try {
    const roomRef = doc(roomsCollection, roomId);
    await updateDoc(roomRef, {
      status: 'in_progress',
      gameStartTime: Date.now() + 3000, // 3-second countdown
      hostScore: 0,
      guestScore: 0,
      hostCombo: 0,
      guestCombo: 0,
      hostLives: 3,
      guestLives: 3,
      updatedAt: serverTimestamp()
    });
  } catch (err) {
    console.error('Start match error:', err);
  }
}

export async function sendRoomSabotage(
  roomId: string,
  isHost: boolean,
  type: 'freeze' | 'blackout',
  fromName: string
) {
  try {
    const roomRef = doc(roomsCollection, roomId);
    await updateDoc(roomRef, {
      sabotage: {
        target: isHost ? 'guest' : 'host',
        type,
        from: fromName,
        timestamp: Date.now()
      },
      updatedAt: serverTimestamp()
    });
  } catch (err) {
    console.warn('Sabotage err:', err);
  }
}

export async function sendRoomTaunt(roomId: string, senderName: string, text: string) {
  try {
    const roomRef = doc(roomsCollection, roomId);
    await updateDoc(roomRef, {
      taunt: {
        sender: senderName,
        text,
        timestamp: Date.now()
      },
      updatedAt: serverTimestamp()
    });
  } catch (err) {
    console.warn('Taunt err:', err);
  }
}

export async function completeMultiplayerMatch(roomId: string, winnerName: string = '') {
  try {
    const roomRef = doc(roomsCollection, roomId);
    await updateDoc(roomRef, {
      status: 'completed',
      ...(winnerName ? { winner: winnerName } : {}),
      updatedAt: serverTimestamp()
    });
  } catch (err) {
    console.warn('Complete match err:', err);
  }
}

export function subscribeToMultiplayerRoom(
  roomId: string,
  callback: (room: MultiplayerRoomData | null) => void
) {
  try {
    const roomRef = doc(roomsCollection, roomId);
    return onSnapshot(
      roomRef,
      (docSnap) => {
        if (docSnap.exists()) {
          callback(docSnap.data() as MultiplayerRoomData);
        } else {
          callback(null);
        }
      },
      (err) => {
        console.warn('Room subscription error:', err);
      }
    );
  } catch (err) {
    console.warn('Subscribe room fail:', err);
    return () => {};
  }
}

export function subscribeToOpenRooms(
  callback: (rooms: MultiplayerRoomData[]) => void,
  max = 12
) {
  try {
    const q = query(
      roomsCollection,
      where('status', '==', 'waiting'),
      limit(max)
    );
    return onSnapshot(
      q,
      (snapshot) => {
        const rooms: MultiplayerRoomData[] = [];
        snapshot.forEach((d) => {
          const r = d.data() as MultiplayerRoomData;
          // Only show rooms where guest hasn't occupied yet or waiting for player
          if (!r.guestId || r.status === 'waiting') {
            rooms.push({ ...r, id: d.id });
          }
        });
        callback(rooms);
      },
      (err) => {
        console.warn('Open rooms subscribe error:', err);
      }
    );
  } catch (err) {
    console.warn('Open rooms subscribe err:', err);
    return () => {};
  }
}

