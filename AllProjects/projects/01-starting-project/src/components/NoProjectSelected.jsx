import noProject from "../assets/no-projects.png";
import Button from "./Button";
export default function NoProjectSelected({ onStartAddProject }) {
  return (
    <div className="flex flex-col items-center gap-4  my-4 mt-24 text-center w-2/3">
      <img
        src={noProject}
        alt="no-project"
        className="w-16 h-16 object-contain mx-auto"
      />
      <h2 className="text-stone-500 font-bold text-xl md:text-3xl my-4">
        No Project Selected
      </h2>
      <p className="text-stone-400">
        Select a project or get started with a new one
      </p>
      <p className="mt-8">
        <Button onClick={onStartAddProject}>Create new project</Button>
      </p>
    </div>
  );
}
