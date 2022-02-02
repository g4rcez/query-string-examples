import { CSSProperties, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { QS, useQueryString } from "./use-query-string";

const base = { a: 1, b: 2, date: new Date() };
const qsAsString = QS.stringify(base);

const style: CSSProperties = { marginBottom: "5rem" };

type QsType = typeof base;

function App() {
  const qs = useQueryString<QsType>();

  useEffect(() => {
    console.log("This message print query string object without any conversion", qs);
    const converted = {
      // Remove @ts-ignore and look error messages
      //@ts-ignore
      a: Number.parseInt(qs.a),
      //@ts-ignore
      b: Number.parseInt(qs.b),
      date: new Date(qs.date),
    };
    console.log("This message print query string converted to real types", converted);
  }, [qs]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Examples with Query String</h1>
        <div style={style}>
          <p>As javascript object. The base object</p>
          <code>{JSON.stringify(base, null, 2)}</code>
        </div>
        <div style={style}>
          <p>As string in QS. Click and change the state in URL</p>
          <Link to={`#?${qsAsString}`}>
            <code>{qsAsString}</code>
          </Link>
        </div>
        <div style={style}>
          <p>QS in URL. When URL change, the qs state change too</p>
          {JSON.stringify(qs, null, 2)}
        </div>
      </header>
    </div>
  );
}

export default App;
