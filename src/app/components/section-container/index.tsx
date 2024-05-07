const SectionContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full px-fluid-x pb-fluid-bottom pt-fluid-top">
      {children}
    </div>
  );
};

export default SectionContainer;
