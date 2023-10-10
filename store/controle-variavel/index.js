import { create } from "zustand";

const defaultValues = {
  shape: "default",
  paddle: "2paddles",
  paddleClick: "tactil",
  trigger: "default",
  vibration: "com_vibracao",
  gripPaint: "militar",
  grip: "grip",
};

export const useControleVariavelStore = create((set) => ({
  state: defaultValues,
  actions: {
    update(key, value) {
      const keys = Object.keys(defaultValues);
      if (!keys.includes(key)) return;

      set((state) => ({
        state: {
          ...state.state,
          [key]: value,
        },
      }));
    },
    reset() {
      set((state) => ({
        state: defaultValues,
      }));
    },
    changeShape: (shape) =>
      set((state) => ({
        state: {
          ...state.state,
          shape: shape,
        },
      })),
    changePaddle: (paddle) =>
      set((state) => ({
        state: {
          ...state.state,
          paddle: paddle,
        },
      })),
    changePaddleClick: (paddleClick) =>
      set((state) => ({
        state: {
          ...state.state,
          paddleClick: paddleClick,
        },
      })),
    changeTrigger: (trigger) =>
      set((state) => ({
        state: {
          ...state.state,
          trigger: trigger,
        },
      })),
    changeVibration: (vibration) =>
      set((state) => ({
        state: {
          ...state.state,
          vibration: vibration,
        },
      })),
    changeGrip: (grip) =>
      set((state) => ({
        state: {
          ...state.state,
          grip: grip,
        },
      })),
  },
}));
