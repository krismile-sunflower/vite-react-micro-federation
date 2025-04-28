import { useState } from "react";

type Props = {
    title: string;
    onClick: (n: number) => void;
}

export default function HelloWorld({ title, onClick }: Props) {
    const [count, setCount] = useState(0);
    return (
        <div>
            <h1>{title}</h1>
            <button onClick={() => setCount(count + 1)}>Click me</button>
            <br />
            <button onClick={() => onClick(count)}>点击我</button>
            <p>Count: {count}</p>
        </div>
    )
}
