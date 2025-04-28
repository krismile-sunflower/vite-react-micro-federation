import { useState } from "react";
import css from "./HelloWorld.module.css";

type Props = {
    title: string;
    onClick: (n: number) => void;
}

export default function HelloWorld({ title, onClick }: Props) {
    const [count, setCount] = useState(0);
    return (
        <div className={css.container}>
            <h1 className={css.title}>{title}</h1>
            <button onClick={() => setCount(count + 1)} className={css.text}>Click me</button>
            <br />
            <button onClick={() => onClick(count)} className={css.text}>点击我</button>
            <p>Count: {count}</p>
        </div>
    )
}
