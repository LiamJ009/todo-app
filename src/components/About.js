import React from 'react';

const About = () => {
  const remainingTasks = [
    "Integrate Redux for state management",
    "Add drag-and-drop todo reordering",
    "Implement multi-user support with authentication"
  ];

  return (
    <div className="flex-1 p-4 bg-white text-black">
      <div className="max-w-2xl">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Remaining Features to Implement</h2>
        <ul className="list-none space-y-2">
          {remainingTasks.map((task, index) => (
            <li key={index} className="text-gray-700 text-lg">
              - {task}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default About;
