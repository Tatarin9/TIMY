import { useEffect, useState } from 'react';

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = (shouldListen = true) => {
    // destructure only the setState function
    const setState = useState(globalState)[1];

    const dispatch = (actionId, payload) => {
        // action by id is a function that updates the state
      const newState = actions[actionId](payload);
      globalState = {...globalState, ...newState};

      for (const listener of listeners) {
          listener(globalState);
      }
    };

    // we push a pointer of this function to listeners,
    // so every component that uses this custom hook will get its own setState function
    // it is done in useEffect hook so that it runs whenever component
    // that uses this hook is mounted, and cleans up when it unmounts
    useEffect( () => {
        if (shouldListen){
            listeners.push(setState);
        }

        return () => {
            if (shouldListen) {
                listeners = listeners.filter(listener => listener !== setState);
            }
        }
    }, [setState, shouldListen]);

    return [globalState, dispatch];
};

export  const initStore = (userActions, initialState) => {
    if (initialState) {
        globalState = {...globalState, ...initialState};
    }
    actions = {...actions, ...userActions};
}
