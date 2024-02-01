import clsx from 'clsx';
import styles from './titleButton.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

interface TitleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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

export const TitleButton = ({ children, ...rest }: TitleButtonProps) => {
  return (
    <button {...rest} className={styles.pushable}>
      <span className={styles.shadow}></span>
      <span className={styles.edge}></span>
      <span className={styles.front}>{children}</span>
    </button>
  );
};
