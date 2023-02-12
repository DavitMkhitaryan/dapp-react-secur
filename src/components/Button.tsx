import classnames from 'classnames';

interface ButtonProps {
    children: React.ReactNode,
    onClick?: () => void,
    className?: string,
    type?: string
}

const Button = ({ children, onClick, className }: ButtonProps) => {

    const classes = classnames(
        className,
        'bg-gray-300 rounded hover:bg-green-400 active:bg-green-600 flex justify-center items-center'
    );

    return (
        <button className={classes} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;