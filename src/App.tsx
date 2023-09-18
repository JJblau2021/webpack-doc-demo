// App.tsx
import styles from "./App.module.less";
import "./global.less";

export default function App() {
  console.count("App");
  return (
    <div className={styles.app}>
      <h1 className="font-bold">React App</h1>
    </div>
  );
}
