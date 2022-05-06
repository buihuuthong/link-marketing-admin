import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AgentDeposite from "./router/agentDeposite";
import TaskDeposite from "./router/taskDeposite";
import WithDraw from "./router/withDraw";
import Bonus from "./router/bonus";

const Router = () => {
  return (
    <Routes>
        <Route path="/agent-deposite" element={<AgentDeposite />} />
        <Route path="/task-deposite" element={<TaskDeposite />} />
        <Route path="/withdraw" element={<WithDraw />} />
        <Route path="/bonus" element={<Bonus />} />
    </Routes>
  );
}

export default Router;
