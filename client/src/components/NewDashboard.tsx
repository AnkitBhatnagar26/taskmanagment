import { useNavigate } from "react-router-dom";
import { Button } from "./ui/Button";
import { useState } from "react";

function NewDashboard() {
  const navigate = useNavigate();

  // const navigateTo = () => {
  //   navigate("/dashboard/taskManager");
  // };

  const cardsData = [
    {
      id: 1,
      title: "Task Management App",
      description:
        "Efficient task management made easy with our intuitive Task Manager app",
      imageUrl: "/assets/images/task-management.jpg",
      action: () => navigate("/dashboard/taskManager")
    },
    // Add more card data as needed
  ];

  return (
    <div className="container-fluid bg-slate-100">
      <h1 className="flex items-center justify-center text-3xl font-bold pt-4">
        Explore Applications
      </h1>
      <div className="flex min-h-screen items-center justify-center">
        {cardsData.map((card) => (
          <div className="group h-96 w-96 [perspective:1000px]" key={card.id}>
            <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              <div className="absolute inset-0">
                <img
                  src="/assets/images/task-management.jpg"
                  alt=""
                  className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40"
                />
              </div>
              <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <div className="flex min-h-full flex-col ite ms-center justify-center">
                  <h1 className="text-3xl font-bold">{card.title}</h1>
                  <p className="text-lg">
                    {card.description}
                  </p>
                  <Button
                    className="mt-2 rounded-md py-1 px-2 text-sm hover:bg-indigo-900"
                    onClick={card.action}
                  >
                    Explore
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewDashboard;
