import React from 'react';

const About = () => {
  return (
    <div className="flex-1 p-4 bg-white text-black">
      <div className="max-w-2xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">About This Project</h2>
        <p className="text-gray-700 mb-4">
          This <strong>Todo Application</strong> is a self-learning project designed to help me gain hands-on experience with 
          <strong> React</strong> and front-end development. Although I have a <strong>CS degree in Software Engineering</strong>, 
          web development was never covered in my coursework, so I'm using this project to bridge that gap.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mb-2">Features:</h3>
        <ul className="list-disc pl-5 text-gray-700 mb-4">
          <li><strong>Built with React</strong> – Learning component-based architecture, state management, hooks.</li>
          <li><strong>Full CRUD Functionality</strong> – Create, read, update, and delete todos.</li>
          <li><strong>Redux Integration (Upcoming)</strong> – Managing global state efficiently.</li>
          <li><strong>Draggable Todos (Upcoming)</strong> – Implementing drag-and-drop to reorder items.</li>
          <li><strong>Multi-User Support (Upcoming)</strong> – Expanding the app to support multiple users.</li>
        </ul>

        <p className="text-gray-700">
          This project is both a <strong>learning exercise</strong> and a way to explore best practices in modern front-end development. 
          As I implement new features, I aim to improve my understanding of <strong>React, Redux, UI/UX design, and state management</strong>.
        </p>
      </div>
    </div>
  );
};

export default About;
