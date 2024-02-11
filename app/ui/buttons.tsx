import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import styles from './titleButton.module.css';
import { Dispatch,SetStateAction, useState } from 'react';
import AnimatedInput from './animations/AnimatedInput';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

interface SinglePlayerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
}

interface MultiPlayerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>
}



interface GameButtonProps {
  children: React.ReactNode;
  onClick?: () => void; 
  href?: string; 
  className?: string; 
  disabled?: boolean; 
}

interface JoinGameButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={clsx(
        ' bg-blue h-10 items-center px-4 border-black hover:animate-bloop rounded max-w-lg',
        className
      )}
    >
      {children}
    </button>
  );
};

export const SinglePlayerButton = ({ children, href, ...rest }: SinglePlayerButtonProps) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTimeout(() => {
      router.push(href || ''); 
    }, 500); 
  };

  return (
    <button {...rest} className={styles.pushable} onClick={handleClick}>
      <span className={styles.shadow}></span>
      <span className={styles.edge}></span>
      <span className={styles.front}>{children}</span>
    </button>
  );
};

export const MultiPlayerButton = ({ children, open, setOpen, ...rest }: MultiPlayerButtonProps) => {
  return (
    <button {...rest} className={styles.pushable} onClick={() => setOpen(!open)} >
      <span className={styles.shadow}></span>
      <span className={styles.edge}></span>
      <span className={styles.front}>{children}</span>
    </button>
  );
};


export const GameButton: React.FC<GameButtonProps> = ({ children, onClick, href, className, disabled }) => {
  const router = useRouter();

  const handleClick = () => {
    if (!disabled) {
      if (href) {
        router.push(href);
      } else if (onClick) {
        onClick();
      }
    }
  };

  const buttonClass = `mt-8 w-full ${styles.pushable} ${className} ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`;

  return (
    <button
      className={buttonClass}
      onClick={handleClick}
      disabled={disabled}
    >
      <span className={styles.shadow}></span>
      <span className={styles.edge}></span>
      <span className={styles.front}>{children}</span>
    </button>
  );
};

export const JoinGameButton: React.FC<JoinGameButtonProps> = ({ children }) => {
  const [showInput, setShowInput] = useState(false);
  const router = useRouter();

  const handleJoinGame = (gameCode: string) => {
   router.push(`/Multiplayer/${gameCode.toUpperCase()}`)
  };

  if (showInput) {
    return <AnimatedInput placeholder="Enter Game Code" onSubmit={handleJoinGame} />;
  }

  return (
    <button className={`mt-5 w-full ${styles.pushable}`} onClick={() => setShowInput(true)}>
      <span className={styles.shadow}></span>
      <span className={styles.edge}></span>
      <span className={styles.front}>{children}</span>
    </button>
  );
};

export default JoinGameButton;