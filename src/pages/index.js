import React, { useState } from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import profilePic from "../images/profile.jpg";
import { FaMapMarkerAlt, FaInstagram, FaGithub } from 'react-icons/fa'; 

const IndexPage = ({ data }) => {
  const [activeTab, setActiveTab] = useState("opinion");

  const opinionPosts = data.opinion.edges;
  const fictionPosts = data.fiction.edges;

  return (
    <div className="container">
      <Helmet>
        <title>José Pino | Sitio Personal</title>
        <meta name="description" content="Programador que escribe a tiempo parcial. Textos de ficción y opinión. Publicado en Transtextos, El Estímulo y CNN Chile." />
        <meta name="author" content="José Pino" />
        <meta property="og:title" content="José Pino | Sitio Personal" />
        <meta property="og:description" content="Programador que escribe a tiempo parcial. Textos de ficción y opinión. Publicado en Transtextos, El Estímulo y CNN Chile." />
        <meta property="og:image" content="URL DE IMAGEN DE PREVISUALIZACIÓN" />
        <meta property="og:url" content="https://whitebeluga.space" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <div className="sidebar">
        <div className="profile-pic">
          <img src={profilePic} alt="José Pino" />
        </div>
        <div className="name-location">
          <div className="name">José Pino</div>
          <div className="location">
            <FaMapMarkerAlt size={20} color="#333" />
            <span>&nbsp;33° S, Trópico de Capricornio</span>
          </div>
          <div className="social-media">
            <a href="https://www.instagram.com/sibaberpollo" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={20} color="#333" />
            </a>
            <a href="https://github.com/sibaberpollo" target="_blank" rel="noopener noreferrer">
              <FaGithub size={20} color="#333" />
            </a>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="about">
          <h2>Bio:</h2>
          <p>Programador que escribe a tiempo parcial. Creé este espacio para dejar los links de los textos que principalmente me han publicado en internet. Ficción (ojalá más) y Opinión. He sido publicado en medios como Transtextos, El Estímulo y CNN Chile.</p>
        </div>
        <div className="textos">
          <h2>Textos:</h2>
          <div className="tabs">
            <button
              className={activeTab === "opinion" ? "active" : ""}
              onClick={() => setActiveTab("opinion")}
            >
              Opinión
            </button>
            <button
              className={activeTab === "fiction" ? "active" : ""}
              onClick={() => setActiveTab("fiction")}
            >
              Ficción
            </button>
          </div>
          {activeTab === "opinion" && (
            <div>
              {opinionPosts.map(({ node }) => (
                <div key={node.id} className="project">
                  <h3 className="project-title">{node.frontmatter.title}</h3>
                  <div className="contentDesc" dangerouslySetInnerHTML={{ __html: node.html }} />
                </div>
              ))}
            </div>
          )}
          {activeTab === "fiction" && (
            <div>
              {fictionPosts.map(({ node }) => (
                <div key={node.id} className="project">
                  <h3 className="project-title">{node.frontmatter.title}</h3>
                  <div className="contentDesc" dangerouslySetInnerHTML={{ __html: node.html }} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const query = graphql`
  query {
    opinion: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/opinion/" } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
          }
          html
        }
      }
    }
    fiction: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/fiction/" } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
          }
          html
        }
      }
    }
  }
`;

export default IndexPage;
