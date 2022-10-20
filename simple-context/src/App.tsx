import { useState, createContext, useContext } from 'react';

function useStoreData() {
  const store = useState({
    first: '',
    last: '',
  });
  return store;
}

type UseStoreDataReturnType = ReturnType<typeof useStoreData>;

const StoreContext = createContext<UseStoreDataReturnType | null>(null);

const TextInput = ({ value }: { value: 'first' | 'last' }) => {
  const [store, setStore] = useContext(StoreContext)!;
  return (
    <div className="field">
      {value}:{' '}
      <input
        value={store[value]}
        onChange={(e) => setStore({ ...store, [value]: e.target.value })}
      />
    </div>
  );
};

const Display = ({ value }: { value: 'first' | 'last' }) => {
  const [store] = useContext(StoreContext)!;
  return (
    <div className="value">
      {value}: {store[value]}
    </div>
  );
};

const FormContainer = () => (
  <div className="container">
    <h5>FormContainer</h5>
    <TextInput value="first" />
    <TextInput value="last" />
  </div>
);

const DisplayContainer = () => (
  <div className="container">
    <h5>DisplayContainer</h5>
    <Display value="first" />
    <Display value="last" />
  </div>
);

const ContentContainer = () => (
  <div className="container">
    <h5>ContentContainer</h5>
    <FormContainer />
    <DisplayContainer />
  </div>
);

function App() {
  return (
    <StoreContext.Provider value={useStoreData()}>
      <div className="container">
        <h5>App</h5>
        <ContentContainer />
      </div>
    </StoreContext.Provider>
  );
}

export default App;
