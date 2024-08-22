import React from "react";

const Tags = ({ html }) => {
  const extractTags = (html) => {
    const linkPattern = /\[(.*?)\]\((.*?)\)/g;
    const tags = [];
    let match;

    while ((match = linkPattern.exec(html)) !== null) {
      tags.push({ label: match[1], url: match[2] });
    }

    return tags;
  };

  const tags = extractTags(html);

  return (
    <div className="project-tags">
      {tags.map((tag, index) => (
        <span key={index} className="tag">
          <a href={tag.url} target="_blank" rel="noopener noreferrer">
            {tag.label}
          </a>
        </span>
      ))}
    </div>
  );
};

export default Tags;
