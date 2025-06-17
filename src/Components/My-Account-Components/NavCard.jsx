import { NavLink } from "react-router-dom";

export default function NavCard({ title, icon, description, namelink, link }) {
  return (
    <NavLink to={link} className="flex items-center h-[130px] gap-5 justify-between p-4 bg-white min-w-[400px] max-w-[400px] border border-blue-300 rounded-sm shadow-md hover:shadow-lg transition-shadow duration-300">
      <section className="text-3xl h-full pt-3.5 text-blue-500">
        {icon}
      </section>

      <section className="w-full">
        <h2 className="text-lg font-semibold mb-1">{title}</h2>
        <p className="text-sm text-black mb-3">{description}</p>
        <span className="text-blue-600">
          {namelink}
        </span>
      </section>
    </NavLink>
  );
}