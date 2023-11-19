type StepProps = {
  completed?: boolean;
  onClick?: () => void;
};

export default function Step({ completed = false, onClick }: StepProps) {
  return (
    <button
      className="cursor-pointer appearance-none border-none"
      onClick={onClick}
      disabled={!completed}
    >
      <span
        role="presentation"
        className={`block ma-4 h-2 w-2 rounded ${
          completed ? 'bg-zinc-700' : 'bg-zinc-200'
        }`}
      />
    </button>
  );
}
