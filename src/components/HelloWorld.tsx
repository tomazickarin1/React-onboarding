// functional component

export interface HelloWorldProps {
  text: string;
}

export default function HelloWorld({text}:HelloWorldProps) {
  return(
    <h1>{text}</h1>
  );
}
