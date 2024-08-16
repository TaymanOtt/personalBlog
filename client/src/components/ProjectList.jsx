import React, { useState, useEffect } from 'react';
import Project from './Project';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch('/api/projects')
            .then(response => response.json())
            .then(data => setProjects(data));
    }, []);

    return (
        <div>
            {projects.map(project => (
                <Project key={project.id} project={project} />
            ))}
        </div>
    );
};

export default ProjectList;
