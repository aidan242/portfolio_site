import React, { useState, useEffect } from "react";
import { Star, GitFork, Clock } from "lucide-react";
import DraggableWindow from "./DraggableWindow";

const Projects = ({ onClose, zIndex, onFocus }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [windowPosition, setWindowPosition] = useState({ x: 150, y: 150 });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // First fetch repositories
        const reposResponse = await fetch(
          "https://api.github.com/users/aidan242/repos?type=owner"
        );
        if (!reposResponse.ok) throw new Error("Failed to fetch repositories");
        const repos = await reposResponse.json();

        // Filter out forks
        const nonForkedRepos = repos.filter((repo) => !repo.fork);

        // Fetch commit data for each repository
        const reposWithCommits = await Promise.all(
          nonForkedRepos.map(async (repo) => {
            try {
              const commitsResponse = await fetch(
                `https://api.github.com/repos/aidan242/${repo.name}/commits?per_page=1`
              );
              if (!commitsResponse.ok)
                return { ...repo, lastCommitDate: repo.updated_at };
              const commits = await commitsResponse.json();
              return {
                ...repo,
                lastCommitDate:
                  commits[0]?.commit?.committer?.date || repo.updated_at,
              };
            } catch (error) {
              console.error(`Error fetching commits for ${repo.name}:`, error);
              return { ...repo, lastCommitDate: repo.updated_at };
            }
          })
        );

        // Sort by last commit date
        const sortedProjects = reposWithCommits.sort(
          (a, b) => new Date(b.lastCommitDate) - new Date(a.lastCommitDate)
        );

        setProjects(sortedProjects);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <DraggableWindow
      title="Projects"
      position={windowPosition}
      onPositionChange={setWindowPosition}
      onClose={onClose}
      zIndex={zIndex}
      onFocus={onFocus}
    >
      <div className="projects-content">
        {loading ? (
          <div className="loading-state">Loading projects...</div>
        ) : error ? (
          <div className="error-state">Error: {error}</div>
        ) : projects.length === 0 ? (
          <div className="loading-state">No projects found</div>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-header">
                  <a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-title"
                  >
                    {project.name}
                  </a>
                  <div className="project-stats">
                    <div className="stat-item">
                      <Star size={16} />
                      {project.stargazers_count}
                    </div>
                    <div className="stat-item">
                      <GitFork size={16} />
                      {project.forks_count}
                    </div>
                  </div>
                </div>

                <div className="project-content">
                  {project.description && (
                    <p className="project-description">{project.description}</p>
                  )}
                </div>

                <div className="project-meta">
                  {project.language && (
                    <div className="project-language">
                      <span
                        className="language-dot"
                        style={{
                          backgroundColor:
                            project.language === "JavaScript"
                              ? "#f1e05a"
                              : project.language === "Python"
                              ? "#3572A5"
                              : project.language === "HTML"
                              ? "#e34c26"
                              : project.language === "CSS"
                              ? "#563d7c"
                              : "#8b8b8b",
                        }}
                      />
                      {project.language}
                    </div>
                  )}
                  <div className="project-updated">
                    <Clock size={14} />
                    {formatDate(project.lastCommitDate)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DraggableWindow>
  );
};

export default Projects;
