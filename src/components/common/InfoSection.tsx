import { Link } from "react-router-dom";

interface InfoSectionProps {
  title?: string;
  //   description?: string ||  React.ReactNode;
  description?: React.ReactNode;

  items?: string[];
  link?: { href: string; text: string };
}

export default function InfoSection({
  title,
  description,
  items,
  link,
}: InfoSectionProps) {
  const healthLink =
    "https://www.healthline.com/nutrition/how-to-eat-healthy-guide";
  return (
    <section className="mb-8">
      {title && (
        <h2 className="text-2xl font-bold mb-2 text-black  py-3">{title}</h2>
      )}
      {description && (
        <p className="mb-2 text-gray-800 text-md break-keep ">{description}</p>
      )}
      {items && (
        <ul className="list-disc list-inside text-[#2171B5] ">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {link && (
        <Link to={healthLink} target="_blank" rel="noopener noreferrer">
          <span className="underline text-[#2171B5]">{link.text}</span>
        </Link>
      )}
    </section>
  );
}
