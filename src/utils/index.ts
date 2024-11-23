import { Player, DropPosition } from '../types';
import { LOCAL_STORAGE_KEY } from '../constants';

export const calculateDropPosition = (
  offset: { x: number; y: number },
  fieldElement: HTMLElement
): DropPosition | null => {
  try {
    const fieldRect = fieldElement.getBoundingClientRect();
    const x = Math.min(Math.max(((offset.x - fieldRect.left) / fieldRect.width) * 100, 5), 95);
    const y = Math.min(Math.max(((offset.y - fieldRect.top) / fieldRect.height) * 100, 5), 95);
    return { x, y };
  } catch (error) {
    console.error('Error calculating drop position:', error);
    return null;
  }
};

export const saveTeamsToLocalStorage = (teams: Record<string, Player[]>) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(teams));
  } catch (error) {
    console.error('Error saving teams to localStorage:', error);
  }
};

export const loadTeamsFromLocalStorage = (): Record<string, Player[]> | null => {
  try {
    const savedTeams = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedTeams ? JSON.parse(savedTeams) : null;
  } catch (error) {
    console.error('Error loading teams from localStorage:', error);
    return null;
  }
};
