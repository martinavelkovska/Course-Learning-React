import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SideBar from "./components/SideBar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined, // we do nothing
    projects: [],
    tasks: [],
  });

  function handleAddTask(text) {
    // to add a task in the list of tasks , to show them
    const taskId = Math.random();
    setProjectsState((prevState) => {
      const newTask = {
        //new task that should be added
        //   title:
        //   description:
        //   dueDate
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };
      return {
        ...prevState, // we also don't lose the old state
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  function handleDeleteTask(id) {
    // to delete a task from the list of tasks , to show them
    setProjectsState((prevState) => {
      return {
        ...prevState, // we also don't lose the old state
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  function handleSelectProject(id) {
    //da se prikaze selektiranio proekt
    setProjectsState((prevState) => {
      return {
        ...prevState, // we also don't lose the old state
        selectedProjectId: id, //selecting the project
      };
    });
  }

  function handleDeleteProject() {
    //da se izbrise selektiraniot proekt
    setProjectsState((prevState) => {
      return {
        ...prevState, // we also don't lose the old state
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  }

  function handleStartAddProject() {
    //when clickin on button add new project
    setProjectsState((prevState) => {
      return {
        ...prevState, // we also don't lose the old state
        selectedProjectId: null, //adding a new project
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState, // we also don't lose the old state
        selectedProjectId: undefined, //no project selected
      };
    });
  }
  function handleAddProject(projectData) {
    // to add a project in the list of projects , to show them
    setProjectsState((prevState) => {
      const newProject = {
        //new project that should be added
        //   title:
        //   description:
        //   dueDate
        ...projectData,
        id: Math.random(),
      };
      return {
        ...prevState, // we also don't lose the old state
        selectedProjectId: undefined, // da gi otselektira proektite za da  ni ispadne no project selected
        projects: [...prevState.projects, newProject], //update the project array without losing any project
      };
    });
  }
  const SelectedProjectd = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={SelectedProjectd}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  ); //za selektiranio proekt da se prikaze

  if (projectsState.selectedProjectId === null) {
    //ako se stateto e da se dodava nov proekt prikazi ja stranata za dodavanje na proekt
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    //ako id e undefined prikazi ja stranata za nieden proekt selektiran
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
        // da gi prikaze proektite od stranata
      />
      {/* <NewProject /> */}
      {/* <NoProjectSelected onStartAddProject={handleStartAddProject} /> */}
      {content}
    </main>
  );
}

export default App;
