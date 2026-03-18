// functional component

export interface AppProps {
  text: string;
}

export default function App({text}:AppProps) {
  return (
    <div className='movieapp'>{text}</div>
  );
}
