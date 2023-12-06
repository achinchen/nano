export default function EmphasizeBlock({ children }: React.PropsWithChildren) {
  return (
    <span className="h-9 flex flex-1 items-center justify-center rounded-3 bg-primary-100">
      {children}
    </span>
  );
}
