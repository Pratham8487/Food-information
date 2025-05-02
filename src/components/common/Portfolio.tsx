import Ref1 from "../../assets/ref.jpg";
// import { motion } from "framer-motion";

function Portfolio() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {/* <motion.div
        className="grid grid-cols-3 p-3 shadow-xs max-w-5xl w-full mx-auto border border-gray-200"
        initial={{ opacity: 0, scale: 0.5, rotate: -10, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
        transition={{
          opacity: { duration: 0.5 },
          scale: { duration: 0.5 },
          rotate: { duration: 0.5, delay: 0.75 },
          filter: { duration: 0.5, delay: 0.75 },
        }}
      >
        <div className="gap-1 flex flex-col items-center p-4">
          <img
            src={Ref1}
            className="h-60 w-54 hover:shadow-lg transition shadow-2xs rounded-md "
          />
          <h1 className="text-2xl underline font-semibold">Pratham Shah</h1>
          <p className="text-md font-normal">Frontend Developer</p>
        </div>

        <div className="col-span-2 p-4">
          <p className="tracking-tighter  text-md break-keep text-black ">
            🔹{" "}
            <span className="text-xl font-bold underline text-[#08519C] ">
              About Me
            </span>{" "}
            <br /> I'm a passionate and detail-oriented developer with a strong
            interest in building scalable, user-friendly applications. With
            hands-on experience in technologies like React, TypeScript, Node.js,
            and Tailwind CSS, I enjoy creating clean, efficient solutions that
            solve real-world problems. I'm committed to continuous learning and
            growth — whether through building side projects, contributing to
            open-source, or exploring new frameworks and tools. I believe in
            writing clean, maintainable code and value collaboration,
            performance, and great user experience in every project I take on.
            My goal is to grow as a well-rounded software engineer who
            contributes meaningfully to both the codebase and the team culture.
            <br /> 📌{" "}
            <span className="text-xl font-bold underline text-[#08519C] ">
              Currently exploring:{" "}
            </span>
            <br />
            <ul className="gap-2 list-disc list-inside text-gray-900">
              {[
                "Frontend architecture and component",
                "API integration and backend workflows",
                "Responsive UI/UX best practices",
              ].map((item) => (
                <li key={item} className="text-sm">
                  <span className="hover:text-[#4292C6] hover:cursor-disabled">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <br />
            Let's connect if you'd like to collaborate, share ideas, or discuss
            opportunities in tech!
          </p>
        </div>
      </motion.div> */}
      <div className="absolute top-1/4 left-1/4 grid grid-cols-3 w-[50rem] border border-gray-200 rounded-xl shadow-xs">
        <div className="flex flex-col items-center justify-center gap-1 ">
          <img src={Ref1} className="rounded-sm shadow-xs h-60 w-54 " />
          <h1 className="text-2xl font-bold">Pratham Shah</h1>
          <p className="text-md font-medium">Frontend Developer</p>
        </div>
        <div className="col-span-2 ">
          <p className="p-4 break-keep -tracking-wider text-md">
            {" "}
            🔹 <span className="text-xl font-bold underline text-[#08519C] ">About Me</span>
            <br />
            I'm a passionate and detail-oriented developer with a strong
            interest in building scalable, user-friendly applications. With
            hands-on experience in technologies like React, TypeScript, Node.js,
            and Tailwind CSS, I enjoy creating clean, efficient solutions that
            solve real-world problems. I'm committed to continuous learning and
            growth — whether through building side projects, contributing to
            open-source, or exploring new frameworks and tools. I believe in
            writing clean, maintainable code and value collaboration,
            performance, and great user experience in every project I take on.
            My goal is to grow as a well-rounded software engineer who
            contributes meaningfully to both the codebase and the team culture.
            <br /> 📌{" "}
            <span className="text-xl font-bold underline text-[#08519C] ">
              Currently exploring:{" "}
            </span>
            <br />
            <ul className="gap-2 list-disc list-inside text-gray-900">
              {[
                "Frontend architecture and component",
                "API integration and backend workflows",
                "Responsive UI/UX best practices",
              ].map((item) => (
                <li key={item} className="text-sm">
                  <span className="hover:text-[#4292C6] hover:cursor-disabled">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <br />
            Let's connect if you'd like to collaborate, share ideas, or discuss
            opportunities in tech!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
