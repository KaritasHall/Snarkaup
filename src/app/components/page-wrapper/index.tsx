interface PageWrapperProps {
  children: React.ReactNode;
}

export const PageWrapper = ({ children }: PageWrapperProps) => {
  return <div className="h-full w-full bg-white">{children}</div>;
};
