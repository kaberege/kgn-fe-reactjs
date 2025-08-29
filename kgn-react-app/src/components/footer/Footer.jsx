import { useEffect, useState } from "react";

const Footer = () => {
  const [year, setYear] = useState(0); // State for updating current year

  useEffect(() => {
    const date = new Date();
    const y = date.getFullYear();
    setYear(y);
  }, []);

  return (
    <div className="my-footer ">
      <p>
        {" "}
        Copyright &copy; {year}{" "}
        <a
          href="https://www.linkedin.com/in/kaberege-godard-nestor-53a0b4215"
          target="_blank"
          title="Visit kgn website"
        >
          <span>KGN</span>
        </a>
        . All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
