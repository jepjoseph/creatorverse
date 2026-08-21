import { Link, useNavigate } from "react-router-dom";
import "../css/CreatorCard.css";

function CreatorCard({ creator }) {
    const navigate = useNavigate();
  return (
    <div
      className="creator-card"
      onClick={() => navigate(`/creator/${creator.id}`)}
    >
      {creator.imageURL && (
        <img
          src={creator.imageURL}
          alt={creator.name}
          className="creator-card-image"
        />
      )}

      <div className="creator-card-content">
        <h2>{creator.name}</h2>

        <p>{creator.description}</p>

        <a
          href={creator.url}
          target="_blank"
          rel="noopener noreferrer"
          className="creator-link"
        >
          Visit Channel
        </a>

        <Link to={`/creator/${creator.id}`} className="creator-details-button">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default CreatorCard;
