import DividedArea from "../../common/DividedArea";

 

interface HomeLayoutProps {
  header: React.ReactNode;
  footer: React.ReactNode;
  sections: React.ReactNode[];
}

export default function HomeLayout({ header, footer, sections }: HomeLayoutProps) {
  return (
    <div>
      {header}
      {sections.map((section, index) => (
        <div key={index}>
          {section}
          {index < sections.length - 1 && <DividedArea />}
        </div>
      ))}
      {footer}
    </div>
  );
}
