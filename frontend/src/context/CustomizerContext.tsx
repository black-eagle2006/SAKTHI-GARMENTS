import React, { createContext, useContext, useState, useCallback } from 'react';
import { DecalLayer, DesignTemplate, DesignProject } from '../types';
import { GarmentType } from '../three/GarmentModel';
import apiClient from '../api/client';

export type { GarmentType };

interface HistoryState {
  garmentType: GarmentType;
  tshirtColor: string;
  frontLayers: DecalLayer[];
  backLayers: DecalLayer[];
}

interface CustomizerContextType {
  garmentType: GarmentType;
  setGarmentType: (type: GarmentType) => void;
  tshirtColor: string;
  setTshirtColor: (color: string) => void;
  cameraView: 'front' | 'back' | 'leftSleeve' | 'rightSleeve' | 'free';
  setCameraView: (view: 'front' | 'back' | 'leftSleeve' | 'rightSleeve' | 'free') => void;
  activeSide: 'front' | 'back';
  setActiveSide: (side: 'front' | 'back') => void;
  frontLayers: DecalLayer[];
  backLayers: DecalLayer[];
  activeLayerId: string | null;
  setActiveLayerId: (id: string | null) => void;
  activeLayer: DecalLayer | undefined;
  addTextLayer: (text?: string, customColor?: string) => void;
  addImageLayer: (imageDataUrl: string) => void;
  updateActiveLayer: (updates: Partial<DecalLayer>) => void;
  deleteLayer: (id: string) => void;
  duplicateLayer: (id: string) => void;
  moveLayerOrder: (id: string, direction: 'up' | 'down') => void;
  bringToFront: (id: string) => void;
  sendToBack: (id: string) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  resetDesign: () => void;
  loadTemplate: (template: DesignTemplate) => void;
  saveDesignToBackend: (title: string) => Promise<{ success: boolean; projectId?: number; message?: string }>;
  calculateCustomPrice: () => number;
}

const CustomizerContext = createContext<CustomizerContextType | undefined>(undefined);

export const CustomizerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [garmentType, setGarmentTypeState] = useState<GarmentType>('round-neck');
  const [tshirtColor, setTshirtColorState] = useState<string>('#FFFFFF');
  const [cameraView, setCameraView] = useState<'front' | 'back' | 'leftSleeve' | 'rightSleeve' | 'free'>('front');
  const [activeSide, setActiveSide] = useState<'front' | 'back'>('front');
  // Pristine default: no embedded permanent logo or text
  const [frontLayers, setFrontLayers] = useState<DecalLayer[]>([]);
  const [backLayers, setBackLayers] = useState<DecalLayer[]>([]);
  const [activeLayerId, setActiveLayerId] = useState<string | null>(null);

  // History Stacks
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [future, setFuture] = useState<HistoryState[]>([]);

  const pushStateToHistory = useCallback(() => {
    setHistory((prev) => [
      ...prev.slice(-15), // keep last 15 states
      { garmentType, tshirtColor, frontLayers, backLayers },
    ]);
    setFuture([]);
  }, [garmentType, tshirtColor, frontLayers, backLayers]);

  const setGarmentType = (type: GarmentType) => {
    pushStateToHistory();
    setGarmentTypeState(type);
  };

  const setTshirtColor = (color: string) => {
    pushStateToHistory();
    setTshirtColorState(color);
  };

  const currentLayers = activeSide === 'front' ? frontLayers : backLayers;
  const setCurrentLayers = activeSide === 'front' ? setFrontLayers : setBackLayers;

  const activeLayer = (activeSide === 'front' ? frontLayers : backLayers).find(
    (l) => l.id === activeLayerId
  );

  const addTextLayer = (text: string = 'YOUR TEXT', customColor?: string) => {
    pushStateToHistory();
    const newId = `text_${Date.now()}`;
    const effectiveColor = customColor
      ? customColor
      : tshirtColor === '#FFFFFF' || tshirtColor.toLowerCase() === '#ffffff'
      ? '#111326'
      : '#FFFFFF';
    const newLayer: DecalLayer = {
      id: newId,
      type: 'text',
      content: text,
      x: 0.5,
      y: 0.5,
      scale: 1,
      rotation: 0,
      color: effectiveColor,
      fontFamily: 'Outfit, sans-serif',
      fontSize: 36,
      side: activeSide,
    };
    setCurrentLayers((prev) => [...prev, newLayer]);
    setActiveLayerId(newId);
  };

  const addImageLayer = (imageDataUrl: string) => {
    pushStateToHistory();
    const newId = `img_${Date.now()}`;
    const newLayer: DecalLayer = {
      id: newId,
      type: 'image',
      content: imageDataUrl,
      x: 0.5,
      y: 0.5,
      scale: 1,
      rotation: 0,
      side: activeSide,
    };
    setCurrentLayers((prev) => [...prev, newLayer]);
    setActiveLayerId(newId);
  };

  const updateActiveLayer = (updates: Partial<DecalLayer>) => {
    if (!activeLayerId) return;
    setCurrentLayers((prev) =>
      prev.map((l) => (l.id === activeLayerId ? { ...l, ...updates } : l))
    );
  };

  const deleteLayer = (id: string) => {
    pushStateToHistory();
    setCurrentLayers((prev) => prev.filter((l) => l.id !== id));
    if (activeLayerId === id) setActiveLayerId(null);
  };

  const duplicateLayer = (id: string) => {
    pushStateToHistory();
    const found = currentLayers.find((l) => l.id === id);
    if (!found) return;
    const duplicated: DecalLayer = {
      ...found,
      id: `${found.type}_${Date.now()}`,
      x: Math.min(0.85, found.x + 0.05),
      y: Math.min(0.85, found.y + 0.05),
    };
    setCurrentLayers((prev) => [...prev, duplicated]);
    setActiveLayerId(duplicated.id);
  };

  const moveLayerOrder = (id: string, direction: 'up' | 'down') => {
    pushStateToHistory();
    setCurrentLayers((prev) => {
      const idx = prev.findIndex((l) => l.id === id);
      if (idx === -1) return prev;
      const targetIdx = direction === 'up' ? idx + 1 : idx - 1;
      if (targetIdx < 0 || targetIdx >= prev.length) return prev;
      const copy = [...prev];
      const temp = copy[idx];
      copy[idx] = copy[targetIdx];
      copy[targetIdx] = temp;
      return copy;
    });
  };

  const bringToFront = (id: string) => {
    pushStateToHistory();
    setCurrentLayers((prev) => {
      const idx = prev.findIndex((l) => l.id === id);
      if (idx === -1 || idx === prev.length - 1) return prev;
      const target = prev[idx];
      return [...prev.filter((l) => l.id !== id), target];
    });
  };

  const sendToBack = (id: string) => {
    pushStateToHistory();
    setCurrentLayers((prev) => {
      const idx = prev.findIndex((l) => l.id === id);
      if (idx === -1 || idx === 0) return prev;
      const target = prev[idx];
      return [target, ...prev.filter((l) => l.id !== id)];
    });
  };

  const undo = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setFuture((f) => [{ garmentType, tshirtColor, frontLayers, backLayers }, ...f]);
    setHistory((h) => h.slice(0, -1));
    if (prev.garmentType) setGarmentTypeState(prev.garmentType);
    setTshirtColorState(prev.tshirtColor);
    setFrontLayers(prev.frontLayers);
    setBackLayers(prev.backLayers);
  };

  const redo = () => {
    if (future.length === 0) return;
    const next = future[0];
    setHistory((h) => [...h, { garmentType, tshirtColor, frontLayers, backLayers }]);
    setFuture((f) => f.slice(1));
    if (next.garmentType) setGarmentTypeState(next.garmentType);
    setTshirtColorState(next.tshirtColor);
    setFrontLayers(next.frontLayers);
    setBackLayers(next.backLayers);
  };

  const resetDesign = () => {
    pushStateToHistory();
    setTshirtColorState('#FFFFFF');
    setFrontLayers([]);
    setBackLayers([]);
    setActiveLayerId(null);
  };

  const loadTemplate = (template: DesignTemplate) => {
    pushStateToHistory();
    setTshirtColorState(template.tshirtColor || '#FFFFFF');
    setFrontLayers(template.frontLayers || []);
    setBackLayers(template.backLayers || []);
    if (template.frontLayers && template.frontLayers.length > 0) {
      setActiveLayerId(template.frontLayers[0].id);
      setActiveSide('front');
      setCameraView('front');
    }
  };

  const calculateCustomPrice = (): number => {
    // Base plain t-shirt price: ₹299
    let price = 299;
    // Front prints: ₹50 per artwork/text layer (first included)
    if (frontLayers.length > 1) {
      price += (frontLayers.length - 1) * 50;
    }
    // Back prints: ₹80 extra if back has layers
    if (backLayers.length > 0) {
      price += 80 + (backLayers.length - 1) * 40;
    }
    return price;
  };

  const saveDesignToBackend = async (title: string) => {
    try {
      const projectData: Partial<DesignProject> = {
        title: title || 'My Custom 3D T-Shirt',
        tshirtColor,
        frontLayers,
        backLayers,
      };

      const res = await apiClient.post('/customizer/designs', projectData);
      return { success: true, projectId: res.data?.id };
    } catch (err: any) {
      // In local offline mode, save locally in browser storage
      const savedProjects = JSON.parse(localStorage.getItem('sakthi_local_designs') || '[]');
      const newLocal = {
        id: Date.now(),
        title: title || 'My Custom 3D T-Shirt',
        tshirtColor,
        frontLayers,
        backLayers,
        createdAt: new Date().toISOString(),
      };
      savedProjects.push(newLocal);
      localStorage.setItem('sakthi_local_designs', JSON.stringify(savedProjects));
      return {
        success: true,
        projectId: newLocal.id,
        message: 'Saved to local workspace archive (synced when online).',
      };
    }
  };

  return (
    <CustomizerContext.Provider
      value={{
        garmentType,
        setGarmentType,
        tshirtColor,
        setTshirtColor,
        cameraView,
        setCameraView,
        activeSide,
        setActiveSide,
        frontLayers,
        backLayers,
        activeLayerId,
        setActiveLayerId,
        activeLayer,
        addTextLayer,
        addImageLayer,
        updateActiveLayer,
        deleteLayer,
        duplicateLayer,
        moveLayerOrder,
        bringToFront,
        sendToBack,
        undo,
        redo,
        canUndo: history.length > 0,
        canRedo: future.length > 0,
        resetDesign,
        loadTemplate,
        saveDesignToBackend,
        calculateCustomPrice,
      }}
    >
      {children}
    </CustomizerContext.Provider>
  );
};

export const useCustomizer = () => {
  const ctx = useContext(CustomizerContext);
  if (!ctx) throw new Error('useCustomizer must be used within CustomizerProvider');
  return ctx;
};
