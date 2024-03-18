const SectionContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pt-fluid-top pb-fluid-bottom h-full px-fluid-x">
      {children}
    </div>
  );
};

export default SectionContainer;
