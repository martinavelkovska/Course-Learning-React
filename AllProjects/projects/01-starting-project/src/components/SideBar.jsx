import { useState } from "react";
import NewProject from "./NewProject";
import Button from "./Button";
import SelectedProject from "./SelectedProject";

export default function SideBar({
  onStartAddProject,
  projects,
  onSelectProject,
  selectedProjectId,
}) {
  const [clicked, setClicked] = useState(false);

  function handleOnClick() {
    setClicked(true);
  }
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        YOUR PROJECTS
      </h2>
      <div>
        <Button
          className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
          onClick={onStartAddProject}
        >
          +Add Project
        </Button>
      </div>
      {clicked && <NewProject />}
      <ul className="mt-8">
        {projects.map((project) => {
          let cssClasses =
            "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";

          if (project.id === selectedProjectId) {
            // da mi dodade higlights when poroject is selected
            cssClasses += " bg-stone-800 text-stone-200";
          } else {
            cssClasses += " text-stone-400 "; //default text color
          }
          return (
            <li key={project.id}>
              {/* mora da ima key  */}
              <button
                className={cssClasses}
                onClick={() => onSelectProject(project.id)}
              >
                {project.title}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
