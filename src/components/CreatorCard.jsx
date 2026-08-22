import { Link } from "react-router-dom";

import "../css/CreatorCard.css";

function CreatorCard({ creator }) {
  return (
    <article className="creator-card">
      <div className="creator-card-image-wrapper">
        {creator.imageURL ? (
          <img
            src={creator.imageURL}
            alt={creator.name}
            className="creator-card-image"
          />
        ) : (
          <div className="creator-card-placeholder">
            <span>{creator.name?.charAt(0).toUpperCase()}</span>
          </div>
        )}
      </div>

      <div className="creator-card-content">
        <h2>{creator.name}</h2>

        <p>{creator.description}</p>

        <div className="creator-card-actions">
          <a
            href={creator.url}
            target="_blank"
            rel="noopener noreferrer"
            className="creator-link"
          >
            Visit Channel ↗
          </a>

          <Link
            to={`/creator/${creator.id}`}
            className="creator-details-button"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}

export default CreatorCard;