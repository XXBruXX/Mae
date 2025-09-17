export type Memory = {
  id: string;
  image: string;
  text: string;
};

export type Song = {
  id: string;
  title: string;
  artist: string;
  icon: string;
};

export const initialMemories: Memory[] = [];
